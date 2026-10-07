import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Scissors,
  UserRound,
  XCircle,
} from "lucide-react";

import "../Admin.css";

function AdminDashboard({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Randevular alınamadı."
          );
        }

        setAppointments(result.data || []);
      } catch (error) {
        setError(
          error.message ||
            "Dashboard verileri alınamadı."
        );
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [token]);

  const today = useMemo(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      now.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const todayAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.date === today &&
          appointment.status !== "cancelled"
      )
      .sort((a, b) =>
        a.time.localeCompare(b.time)
      );
  }, [appointments, today]);

  const pendingCount = appointments.filter(
    (appointment) =>
      appointment.status === "pending"
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) =>
      appointment.status === "confirmed"
  ).length;

  const completedCount = appointments.filter(
    (appointment) =>
      appointment.status === "completed"
  ).length;

  const cancelledCount = appointments.filter(
    (appointment) =>
      appointment.status === "cancelled"
  ).length;

  const yasinTodayCount =
    todayAppointments.filter(
      (appointment) =>
        appointment.barber === "Yasin Küçük"
    ).length;

  const emirTodayCount =
    todayAppointments.filter(
      (appointment) =>
        appointment.barber === "Emir Küçük"
    ).length;

  const nextAppointment =
    todayAppointments.find(
      (appointment) =>
        appointment.status !== "completed"
    ) || null;

  if (loading) {
    return (
      <section className="admin-dashboard">
        <p className="admin-dashboard-message">
          Dashboard yükleniyor...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-dashboard">
        <p className="admin-dashboard-error">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-heading">
        <div>
          <p className="admin-dashboard-eyebrow">
            BARBAROS • GENEL BAKIŞ
          </p>

          <h1>
            İşletme
            <span> Dashboard</span>
          </h1>

          <p>
            Günün randevularını ve işletmenin
            genel durumunu tek ekrandan takip et.
          </p>
        </div>

        <div className="admin-dashboard-date">
          <CalendarDays size={18} />

          <span>
            {new Date().toLocaleDateString(
              "tr-TR",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
        </div>
      </div>

      <div className="admin-dashboard-cards">
        <article className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>BUGÜNKÜ RANDEVU</span>
            <strong>
              {todayAppointments.length}
            </strong>
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>BEKLEYEN</span>
            <strong>{pendingCount}</strong>
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>ONAYLANAN</span>
            <strong>{confirmedCount}</strong>
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <Scissors size={21} />
          </div>

          <div>
            <span>TAMAMLANAN</span>
            <strong>{completedCount}</strong>
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <XCircle size={21} />
          </div>

          <div>
            <span>İPTAL</span>
            <strong>{cancelledCount}</strong>
          </div>
        </article>
      </div>

      <div className="admin-dashboard-grid">
        <article className="admin-dashboard-panel">
          <div className="admin-dashboard-panel-title">
            <div>
              <span>BUGÜN</span>
              <h2>Randevu Akışı</h2>
            </div>

            <CalendarDays size={20} />
          </div>

          {todayAppointments.length === 0 ? (
            <div className="admin-dashboard-empty">
              Bugün için aktif randevu
              bulunmuyor.
            </div>
          ) : (
            <div className="admin-dashboard-list">
              {todayAppointments.map(
                (appointment) => (
                  <div
                    className="admin-dashboard-appointment"
                    key={appointment.id}
                  >
                    <div className="admin-dashboard-time">
                      {appointment.time}
                    </div>

                    <div className="admin-dashboard-customer">
                      <strong>
                        {appointment.name}
                      </strong>

                      <span>
                        {appointment.service}
                      </span>
                    </div>

                    <div className="admin-dashboard-barber">
                      {appointment.barber}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </article>

        <div className="admin-dashboard-side">
          <article className="admin-dashboard-panel">
            <div className="admin-dashboard-panel-title">
              <div>
                <span>SIRADAKİ</span>
                <h2>Randevu</h2>
              </div>

              <Clock3 size={20} />
            </div>

            {nextAppointment ? (
              <div className="admin-next-appointment">
                <strong>
                  {nextAppointment.time}
                </strong>

                <h3>
                  {nextAppointment.name}
                </h3>

                <p>
                  {nextAppointment.service}
                </p>

                <span>
                  {nextAppointment.barber}
                </span>
              </div>
            ) : (
              <div className="admin-dashboard-empty">
                Sırada aktif randevu yok.
              </div>
            )}
          </article>

          <article className="admin-dashboard-panel">
            <div className="admin-dashboard-panel-title">
              <div>
                <span>EKİP</span>
                <h2>Bugünkü Yoğunluk</h2>
              </div>

              <UserRound size={20} />
            </div>

            <div className="admin-barber-workload">
              <div>
                <span>Yasin Küçük</span>
                <strong>
                  {yasinTodayCount} randevu
                </strong>
              </div>

              <div>
                <span>Emir Küçük</span>
                <strong>
                  {emirTodayCount} randevu
                </strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;