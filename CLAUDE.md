# Barbaros Erkek Kuaförü

Tek dükkanlık berber sitesi ve yönetim sistemi. BERBERİX platformunun (../berberim) ilk dükkanı.

## Teknoloji
- barbaros-frontend/: React + Vite (`npm run dev`, `npm run build`, `npm run lint` → oxlint)
- barbaros-backend/: Node.js + Express 5 + Prisma + SQLite, JWT admin girişi (`node server.js`)
- Testler: `barbaros-backend/appointment-*.test.cjs` (`node --test`)

## Hedefler
Online randevu, hizmet/fiyat yönetimi, galeri, iletişim + harita, admin paneli,
kasa/ödeme takibi, stok ve tedarikçi, kampanya ve müşteri sadakati, işletme raporları.

## Kurallar
- `.env` asla okunmaz ve gösterilmez.
- Veritabanı değişikliği → `prisma/schema.prisma` + `npx prisma db push`.
- `umay_*` dosyaları Umay AI'nın test/yedek dosyalarıdır; silme.
- Türkçe konuş, sade anlat; işleri toplu yap, gereksiz onay sorma.
- Arayüzü playwright MCP ile tarayıcıda test et.
