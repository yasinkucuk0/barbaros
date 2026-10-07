import { useState } from "react";
import "../Admin.css";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password) {
      setError("Kullanıcı adı ve şifre gereklidir.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Giriş yapılamadı."
        );
      }

      const token = result.data?.token;

      if (!token) {
        throw new Error(
          "Sunucudan oturum bilgisi alınamadı."
        );
      }

      sessionStorage.setItem(
        "barbaros_admin_token",
        token
      );

      onLogin(token);
    } catch (error) {
      setError(
        error.message ||
          "Giriş sırasında bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-glow" />

      <section className="admin-login-card">
        <div className="admin-login-brand">
          BARBAROS
        </div>

        <p className="admin-login-eyebrow">
          YÖNETİM SİSTEMİ
        </p>

        <h1>
          Admin
          <span> Girişi</span>
        </h1>

        <p className="admin-login-description">
          Randevuları ve işletme yönetimini
          görüntülemek için giriş yapın.
        </p>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <label>
            Kullanıcı Adı
            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Kullanıcı adınız"
              autoComplete="username"
            />
          </label>

          <label>
            Şifre
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "GİRİŞ YAPILIYOR..."
              : "GİRİŞ YAP"}
          </button>
        </form>

        <p className="admin-login-security">
          BARBAROS • GÜVENLİ YÖNETİM ALANI
        </p>
      </section>
    </main>
  );
}

export default AdminLogin;