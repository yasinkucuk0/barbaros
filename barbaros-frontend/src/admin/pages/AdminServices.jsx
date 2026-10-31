import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw, Scissors } from "lucide-react";

import { DEFAULT_SERVICES } from "../../data/defaultServices";
import "../Admin.css";

const API_URL = "http://localhost:5000/api/services";

const cell = {
  padding: "12px 10px",
  borderBottom: "1px solid rgba(212,175,55,0.12)",
  textAlign: "left",
  verticalAlign: "middle",
};

const input = {
  background: "#111",
  border: "1px solid rgba(212,175,55,0.3)",
  color: "#f2e6c9",
  borderRadius: "8px",
  padding: "8px 10px",
  width: "100%",
  boxSizing: "border-box",
};

const button = {
  background: "transparent",
  border: "1px solid rgba(212,175,55,0.45)",
  color: "#e8c878",
  borderRadius: "8px",
  padding: "8px 14px",
  cursor: "pointer",
  letterSpacing: "1px",
  fontSize: "12px",
};

function AdminServices({ token, onLogout }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [drafts, setDrafts] = useState({});
  const [form, setForm] = useState({ name: "", price: "", durationMinutes: "30" });
  const [busy, setBusy] = useState(false);

  const request = useCallback(
    async (url, options = {}) => {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        onLogout?.();
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "İşlem başarısız oldu.");
      }

      return result;
    },
    [token, onLogout]
  );

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const result = await request(`${API_URL}/admin`);
      setServices(Array.isArray(result.data) ? result.data : []);
      setDrafts({});
      setError("");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (action, successText) => {
    try {
      setBusy(true);
      setError("");
      await action();
      setMessage(successText);
      await load();
    } catch (actionError) {
      setError(actionError.message);
    } finally {
      setBusy(false);
    }
  };

  const addService = (event) => {
    event.preventDefault();
    run(
      () =>
        request(API_URL, {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            price: Number(form.price),
            durationMinutes: Number(form.durationMinutes || 30),
          }),
        }).then(() => setForm({ name: "", price: "", durationMinutes: "30" })),
      "Hizmet eklendi."
    );
  };

  const saveRow = (service) => {
    const draft = drafts[service.id] || {};
    const body = {};

    if (draft.price !== undefined) body.price = Number(draft.price);
    if (draft.durationMinutes !== undefined) {
      body.durationMinutes = Number(draft.durationMinutes);
    }
    if (draft.name !== undefined) body.name = draft.name;

    if (Object.keys(body).length === 0) return;

    run(
      () =>
        request(`${API_URL}/${service.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        }),
      `${service.name} güncellendi.`
    );
  };

  const toggleActive = (service) =>
    run(
      () =>
        request(`${API_URL}/${service.id}`, {
          method: "PATCH",
          body: JSON.stringify({ isActive: !service.isActive }),
        }),
      service.isActive
        ? `${service.name} sitede gizlendi.`
        : `${service.name} sitede gösteriliyor.`
    );

  const importDefaults = () =>
    run(async () => {
      const existing = new Set(
        services.map((item) => item.name.toLocaleUpperCase("tr-TR"))
      );

      for (const item of DEFAULT_SERVICES) {
        if (existing.has(item.name.toLocaleUpperCase("tr-TR"))) continue;

        await request(API_URL, {
          method: "POST",
          body: JSON.stringify({
            name: item.name,
            price: Number(item.price),
            durationMinutes: 30,
          }),
        });
      }
    }, "Sitedeki hizmetler panele aktarıldı. Artık fiyatları buradan yönetebilirsin.");

  const setDraft = (id, field, value) =>
    setDrafts((current) => ({
      ...current,
      [id]: { ...(current[id] || {}), [field]: value },
    }));

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-heading">
        <div>
          <span className="admin-dashboard-eyebrow">YÖNETİM</span>
          <h1>Hizmetler ve Fiyatlar</h1>
        </div>

        <button type="button" style={button} onClick={load} disabled={busy}>
          <RefreshCw size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          YENİLE
        </button>
      </div>

      {error && <div className="admin-dashboard-error">{error}</div>}
      {message && !error && (
        <div className="admin-dashboard-message">{message}</div>
      )}

      <div className="admin-dashboard-panel">
        <div className="admin-dashboard-panel-title">
          <Plus size={16} /> Yeni hizmet
        </div>

        <form
          onSubmit={addService}
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: 10 }}
        >
          <input
            style={input}
            placeholder="Hizmet adı (ör. Saç Kesimi)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            style={input}
            type="number"
            min="0"
            placeholder="Fiyat (₺)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            style={input}
            type="number"
            min="1"
            placeholder="Süre (dk)"
            value={form.durationMinutes}
            onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })}
          />
          <button type="submit" style={button} disabled={busy}>
            EKLE
          </button>
        </form>
      </div>

      <div className="admin-dashboard-panel" style={{ marginTop: 18 }}>
        <div className="admin-dashboard-panel-title">
          <Scissors size={16} /> Kayıtlı hizmetler
        </div>

        {loading ? (
          <div className="admin-dashboard-empty">Yükleniyor...</div>
        ) : services.length === 0 ? (
          <div className="admin-dashboard-empty">
            <p>Henüz kayıtlı hizmet yok. Sitede şu an sabit fiyat listesi gösteriliyor.</p>
            <button type="button" style={button} onClick={importDefaults} disabled={busy}>
              SİTEDEKİ HİZMETLERİ İÇE AKTAR
            </button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#f2e6c9" }}>
            <thead>
              <tr style={{ color: "#b9a47b", fontSize: 12, letterSpacing: 1 }}>
                <th style={cell}>HİZMET</th>
                <th style={cell}>FİYAT (₺)</th>
                <th style={cell}>SÜRE (DK)</th>
                <th style={cell}>DURUM</th>
                <th style={cell} />
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                const draft = drafts[service.id] || {};
                const changed = Object.keys(draft).length > 0;

                return (
                  <tr key={service.id} style={{ opacity: service.isActive ? 1 : 0.55 }}>
                    <td style={cell}>
                      <input
                        style={input}
                        value={draft.name ?? service.name}
                        onChange={(e) => setDraft(service.id, "name", e.target.value)}
                      />
                    </td>
                    <td style={{ ...cell, width: 120 }}>
                      <input
                        style={input}
                        type="number"
                        min="0"
                        value={draft.price ?? service.price}
                        onChange={(e) => setDraft(service.id, "price", e.target.value)}
                      />
                    </td>
                    <td style={{ ...cell, width: 110 }}>
                      <input
                        style={input}
                        type="number"
                        min="1"
                        value={draft.durationMinutes ?? service.durationMinutes}
                        onChange={(e) =>
                          setDraft(service.id, "durationMinutes", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ ...cell, width: 120 }}>
                      {service.isActive ? "Sitede" : "Gizli"}
                    </td>
                    <td style={{ ...cell, width: 220, whiteSpace: "nowrap" }}>
                      <button
                        type="button"
                        style={{ ...button, marginRight: 8, opacity: changed ? 1 : 0.4 }}
                        disabled={!changed || busy}
                        onClick={() => saveRow(service)}
                      >
                        KAYDET
                      </button>
                      <button
                        type="button"
                        style={button}
                        disabled={busy}
                        onClick={() => toggleActive(service)}
                      >
                        {service.isActive ? "GİZLE" : "GÖSTER"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminServices;
