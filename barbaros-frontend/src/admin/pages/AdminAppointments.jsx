
import { useEffect, useMemo, useState } from "react";

import "../Admin.css";

const API_URL = "http://localhost:5000/api/appointments";

const pad = (value) => String(value).padStart(2, "0");

const getLocalDateString = () => {
  const today = new Date();

  return `${today.getFullYear()}-${pad(
    today.getMonth() + 1
  )}-${pad(today.getDate())}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Bekliyor";
    case "confirmed":
      return "Onaylandı";
    case "completed":
      return "Tamamlandı";
    case "cancelled":
      return "İptal";
    default:
      return status || "-";
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "confirmed":
      return "admin-status-confirmed";
    case "completed":
      return "admin-status-completed";
    case "cancelled":
      return "admin-status-cancelled";
    default:
      return "admin-status-pending";
  }
};

function AdminAppointments({ token, onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [barberFilter, setBarberFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.status === 401) {
          onLogout();
          return;
        }

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Randevular alınamadı."
          );
        }

        if (!Array.isArray(result.data)) {
          throw new Error(
            "Sunucudan geçersiz randevu listesi alındı."
          );
        }

        setAppointments(result.data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error(
            "Randevular yüklenirken hata:",
            fetchError
          );

          setError(
            fetchError.message ||
              "Randevular yüklenirken hata oluştu."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAppointments();

    return () => controller.abort();
  }, [token, onLogout]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter(
        (item) => item.status === "pending"
      ).length,
      confirmed: appointments.filter(
        (item) => item.status === "confirmed"
      ).length,
      completed: appointments.filter(
        (item) => item.status === "completed"
      ).length,
      cancelled: appointments.filter(
        (item) => item.status === "cancelled"
      ).length,
    };
  }, [appointments]);

  // GEÇİCİ HATA AYIKLAMA KONTROLÜ
  console.log("BARBAROS RANDEVU KONTROLÜ", {
    toplam: appointments.length,
    randevular: appointments,
    stats,
  });

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLocaleLowerCase("tr-TR");

    return appointments.filter((appointment) => {
      const name = (appointment.name || "")
        .toLocaleLowerCase("tr-TR");

      const phone = appointment.phone || "";

      const service = (appointment.service || "")
        .toLocaleLowerCase("tr-TR");

      const matchesSearch =
        !normalizedSearch ||
        name.includes(normalizedSearch) ||
        phone.includes(normalizedSearch) ||
        service.includes(normalizedSearch);

      const matchesBarber =
        barberFilter === "all" ||
        appointment.barber === barberFilter;

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status === statusFilter;

      const matchesDate =
        !dateFilter ||
        appointment.date === dateFilter;

      return (
        matchesSearch &&
        matchesBarber &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    appointments,
    searchTerm,
    barberFilter,
    statusFilter,
    dateFilter,
  ]);

  const updateAppointmentStatus = async (
    appointmentId,
    newStatus
  ) => {
    if (updatingId !== null) return;

    try {
      setUpdatingId(appointmentId);

      const response = await fetch(
        `${API_URL}/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        onLogout();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Randevu durumu güncellenemedi."
        );
      }

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          String(appointment.id) === String(appointmentId)
            ? {
                ...appointment,
                ...(result.data &&
                typeof result.data === "object"
                  ? result.data
                  : {}),
                status: newStatus,
              }
            : appointment
        )
      );
    } catch (updateError) {
      console.error(
        "Randevu güncelleme hatası:",
        updateError
      );

      window.alert(
        updateError.message ||
          "Randevu güncellenirken hata oluştu."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const todayDate = getLocalDateString();
  const isTodayActive = dateFilter === todayDate;

  const hasActiveFilters =
    searchTerm !== "" ||
    barberFilter !== "all" ||
    statusFilter !== "all" ||
    dateFilter !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setBarberFilter("all");
    setStatusFilter("all");
    setDateFilter("");
  };

  return (
    <main className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">
              BARBAROS YÖNETİM PANELİ
            </p>

            <h1 className="admin-title">
              Randevular
            </h1>
          </div>

          <div className="admin-header-right">
            <span className="admin-live-dot" />
            <span>SİSTEM AKTİF</span>
          </div>
        </header>

        <section className="admin-stats">
          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Toplam Randevu
            </span>
            <strong className="admin-stat-value">
              {stats.total}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Bekleyen
            </span>
            <strong className="admin-stat-value">
              {stats.pending}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Onaylanan
            </span>
            <strong className="admin-stat-value">
              {stats.confirmed}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Tamamlanan
            </span>
            <strong className="admin-stat-value">
              {stats.completed}
            </strong>
          </article>
        </section>

        <div className="admin-quick-filters">
          <button
            type="button"
            className={`admin-today-button ${
              isTodayActive ? "is-active" : ""
            }`}
            onClick={() => setDateFilter(todayDate)}
          >
            BUGÜN
          </button>

          <span className="admin-today-info">
            {formatDate(todayDate)}
          </span>
        </div>

        <section className="admin-filters">
          <div className="admin-filter-search">
            <label htmlFor="admin-search">
              MÜŞTERİ ARA
            </label>

            <input
              id="admin-search"
              type="text"
              placeholder="İsim, telefon veya hizmet..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="admin-filter-group">
            <label htmlFor="admin-barber">
              USTA
            </label>

            <select
              id="admin-barber"
              value={barberFilter}
              onChange={(event) =>
                setBarberFilter(event.target.value)
              }
            >
              <option value="all">
                Tüm Ustalar
              </option>
              <option value="Yasin Küçük">
                Yasin Küçük
              </option>
              <option value="Emir Küçük">
                Emir Küçük
              </option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label htmlFor="admin-status-filter">
              DURUM
            </label>

            <select
              id="admin-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="all">
                Tüm Durumlar
              </option>
              <option value="pending">
                Bekliyor
              </option>
              <option value="confirmed">
                Onaylandı
              </option>
              <option value="completed">
                Tamamlandı
              </option>
              <option value="cancelled">
                İptal
              </option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label htmlFor="admin-date-filter">
              TARİH
            </label>

            <input
              id="admin-date-filter"
              type="date"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(event.target.value)
              }
            />
          </div>

          <div className="admin-filter-clear-wrapper">
            <button
              type="button"
              className="admin-filter-clear"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              TEMİZLE
            </button>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>
                {isTodayActive
                  ? "Bugünün Randevuları"
                  : "Randevu Listesi"}
              </h2>

              {hasActiveFilters && (
                <p className="admin-filter-result">
                  Filtrelenen sonuçlar gösteriliyor
                </p>
              )}
            </div>

            <span className="admin-count">
              {filteredAppointments.length} KAYIT
            </span>
          </div>

          {loading ? (
            <div className="admin-message">
              <span className="admin-message-label">
                BARBAROS
              </span>
              <p>Randevular yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="admin-message">
              <span className="admin-message-label">
                BAĞLANTI HATASI
              </span>
              <p>{error}</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="admin-message">
              <span className="admin-message-label">
                RANDEVULAR
              </span>
              <p>
                Henüz kayıtlı randevu bulunmuyor.
              </p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="admin-message">
              <span className="admin-message-label">
                SONUÇ BULUNAMADI
              </span>
              <p>
                Seçtiğiniz filtrelere uygun randevu yok.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Müşteri</th>
                    <th>Telefon</th>
                    <th>Hizmet</th>
                    <th>Usta</th>
                    <th>Tarih</th>
                    <th>Saat</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map(
                    (appointment) => {
                      const isUpdating =
                        updatingId === appointment.id;

                      return (
                        <tr key={appointment.id}>
                          <td className="admin-customer">
                            {appointment.name}
                          </td>

                          <td>{appointment.phone}</td>
                          <td>{appointment.service}</td>
                          <td>{appointment.barber}</td>

                          <td>
                            {formatDate(appointment.date)}
                          </td>

                          <td className="admin-time">
                            {appointment.time}
                          </td>

                          <td>
                            <span
                              className={`admin-status ${getStatusClass(
                                appointment.status
                              )}`}
                            >
                              {getStatusText(
                                appointment.status
                              )}
                            </span>
                          </td>

                          <td>
                            <div className="admin-actions">
                              {appointment.status !==
                                "confirmed" &&
                                appointment.status !==
                                  "completed" &&
                                appointment.status !==
                                  "cancelled" && (
                                  <button
                                    type="button"
                                    className="admin-action-button admin-action-confirm"
                                    disabled={
                                      updatingId !== null
                                    }
                                    onClick={() =>
                                      updateAppointmentStatus(
                                        appointment.id,
                                        "confirmed"
                                      )
                                    }
                                  >
                                    ONAYLA
                                  </button>
                                )}

                              {appointment.status !==
                                "completed" &&
                                appointment.status !==
                                  "cancelled" && (
                                  <button
                                    type="button"
                                    className="admin-action-button admin-action-complete"
                                    disabled={
                                      updatingId !== null
                                    }
                                    onClick={() =>
                                      updateAppointmentStatus(
                                        appointment.id,
                                        "completed"
                                      )
                                    }
                                  >
                                    TAMAMLA
                                  </button>
                                )}

                              {appointment.status !==
                                "cancelled" &&
                                appointment.status !==
                                  "completed" && (
                                  <button
                                    type="button"
                                    className="admin-action-button admin-action-cancel"
                                    disabled={
                                      updatingId !== null
                                    }
                                    onClick={() =>
                                      updateAppointmentStatus(
                                        appointment.id,
                                        "cancelled"
                                      )
                                    }
                                  >
                                    İPTAL
                                  </button>
                                )}

                              {isUpdating && (
                                <span className="admin-today-info">
                                  Güncelleniyor...
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminAppointments;
