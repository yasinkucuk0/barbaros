// Barbaros — Frontend ↔ Backend entegrasyon (sözleşme) testi. UMAY 7.
// Sunucu veya veritabanı çalıştırmaz: kaynak kodları okuyup karşılaştırır.
//  1) Frontend'in çağırdığı her API adresi + HTTP metodu backend'de tanımlı mı?
//  2) Randevu formunun gönderdiği alanlar backend doğrulamasıyla aynı mı?
//  3) Dolu saat sorgusunun parametreleri controller'ın okuduklarıyla aynı mı?
//  4) Port ve CORS ayarları birbirini tutuyor mu?
//  5) Rotalar yanlışlıkla başka bir rotanın içine yazılmamış mı?
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const BACKEND = path.resolve(__dirname, "..");
const FRONTEND = path.resolve(BACKEND, "..", "barbaros-frontend", "src");
const read = (p) => fs.readFileSync(p, "utf8");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// ---------------- Backend rotaları ----------------
function backendRoutes() {
  const server = read(path.join(BACKEND, "server.js"));
  const requires = {};
  for (const m of server.matchAll(/const\s+(\w+)\s*=\s*require\(\s*["']([^"']+)["']\s*\)/g)) requires[m[1]] = m[2];
  const routes = [];
  for (const m of server.matchAll(/app\.(get|post|patch|put|delete)\(\s*["']([^"']+)["']/g)) {
    routes.push({ method: m[1].toUpperCase(), path: m[2] });
  }
  for (const m of server.matchAll(/app\.use\(\s*["']([^"']+)["']\s*,\s*(\w+)\s*\)/g)) {
    const file = path.join(BACKEND, requires[m[2]] + ".js");
    const text = read(file);
    for (const r of text.matchAll(/router\.(get|post|patch|put|delete)\(\s*["']([^"']+)["']/g)) {
      const sub = r[2] === "/" ? "" : r[2];
      routes.push({ method: r[1].toUpperCase(), path: m[1] + sub });
    }
  }
  return { server, routes };
}

// ---------------- Frontend çağrıları ----------------
function frontendCalls() {
  const calls = [];
  for (const file of walk(FRONTEND)) {
    const text = read(file);
    const consts = {};
    for (const m of text.matchAll(/const\s+([A-Z_]+)\s*=\s*["'`](https?:\/\/[^"'`]+)["'`]/g)) consts[m[1]] = m[2];
    const re = /(?:fetch|request)\(\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`|([A-Z_]+)\b)/g;
    let m;
    while ((m = re.exec(text))) {
      let url = m[1] || m[2] || m[3] || consts[m[4]];
      if (!url) continue; // ör. request(url, ...) -> yardımcı fonksiyonun içi
      url = url.replace(/\$\{([A-Z_]+)\}/g, (_, n) => consts[n] || "").replace(/\$\{[^}]+\}/g, ":param");
      const after = text.slice(m.index, m.index + 400);
      const next = after.slice(1).search(/(?:fetch|request)\(/);
      const scope = next === -1 ? after : after.slice(0, next + 1);
      const method = ((scope.match(/method:\s*["'](\w+)["']/) || [])[1] || "GET").toUpperCase();
      const u = url.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
      if (u.startsWith("/api")) calls.push({ file: path.relative(FRONTEND, file), method, path: u, host: url.match(/^https?:\/\/[^/]+/)?.[0] });
    }
  }
  return calls;
}

const matches = (pattern, actual) => {
  const a = pattern.split("/").filter(Boolean);
  const b = actual.split("/").filter(Boolean);
  return a.length === b.length && a.every((seg, i) => seg.startsWith(":") || b[i].startsWith(":") || seg === b[i]);
};

const hasFrontend = fs.existsSync(FRONTEND);

test("frontend'in çağırdığı her API backend'de tanımlı", { skip: !hasFrontend && "frontend klasörü yok" }, () => {
  const { routes } = backendRoutes();
  const calls = frontendCalls();
  assert.ok(calls.length >= 5, `beklenenden az API çağrısı bulundu: ${calls.length}`);
  const missing = calls.filter((c) => !routes.some((r) => r.method === c.method && matches(r.path, c.path)));
  assert.deepEqual(missing, [], "Backend'de karşılığı olmayan çağrılar: " + JSON.stringify(missing));
});

test("frontend doğru backend portuna gidiyor", { skip: !hasFrontend && "frontend klasörü yok" }, () => {
  const { server } = backendRoutes();
  const port = (server.match(/PORT\s*=\s*(?:process\.env\.PORT\s*\|\|\s*)?(\d+)/) || [])[1];
  const hosts = new Set(frontendCalls().map((c) => c.host));
  assert.deepEqual([...hosts], [`http://localhost:${port}`]);
});

test("CORS izni Vite geliştirme adresiyle aynı", { skip: !hasFrontend && "frontend klasörü yok" }, () => {
  const { server } = backendRoutes();
  const vite = read(path.join(FRONTEND, "..", fs.existsSync(path.join(FRONTEND, "..", "vite.config.js")) ? "vite.config.js" : "vite.config.ts"));
  const vitePort = (vite.match(/port:\s*(\d+)/) || [])[1] || "5173"; // Vite varsayılanı
  assert.match(server, new RegExp(`origin:\\s*["']http://localhost:${vitePort}["']`));
});

test("randevu formunun alanları backend doğrulamasıyla aynı", { skip: !hasFrontend && "frontend klasörü yok" }, () => {
  const booking = read(path.join(FRONTEND, "sections", "Booking.jsx"));
  const formBlock = booking.match(/const\s+\[form,\s*setForm\]\s*=\s*useState\(\{([\s\S]*?)\}\)/)[1];
  const formFields = [...formBlock.matchAll(/(\w+)\s*:/g)].map((m) => m[1]).sort();
  const service = read(path.join(BACKEND, "src", "services", "appointment.service.js"));
  const validate = service.match(/const\s+validateAppointment[\s\S]*?const\s*\{([\s\S]*?)\}\s*=\s*appointmentData/)[1];
  const backendFields = [...validate.matchAll(/(\w+)/g)].map((m) => m[1]).sort();
  assert.deepEqual(formFields, backendFields);
  assert.match(booking, /body:\s*JSON\.stringify\(form\)/, "form nesnesi olduğu gibi gönderilmeli");
});

test("dolu saat sorgusu parametreleri controller ile aynı", { skip: !hasFrontend && "frontend klasörü yok" }, () => {
  const booking = read(path.join(FRONTEND, "sections", "Booking.jsx"));
  const params = booking.match(/new URLSearchParams\(\{([\s\S]*?)\}\)/)[1];
  const sent = [...params.matchAll(/(\w+)\s*:/g)].map((m) => m[1]).sort();
  const controller = read(path.join(BACKEND, "src", "controllers", "appointment.controller.js"));
  const readFields = controller.match(/const\s*\{([^}]*)\}\s*=\s*req\.query/)[1].split(",").map((s) => s.trim()).sort();
  assert.deepEqual(sent, readFields);
});

test("rotalar başka bir rotanın içine yazılmamış (server.js)", () => {
  const { server } = backendRoutes();
  const root = server.indexOf('app.get("/"');
  if (root === -1) return;
  const end = server.indexOf("});", root);
  const body = server.slice(root, end);
  assert.ok(!/app\.(get|post|use|patch|put|delete)\(/.test(body.slice(5)), "app.get('/') içinde başka bir rota tanımlanmış");
});
