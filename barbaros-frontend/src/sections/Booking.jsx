import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  UserRound,
  Phone,
  Scissors,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  { name: "Saç Kesimi", price: 250 },
  { name: "Öğrenci", price: 200 },
  { name: "Çocuk", price: 200 },
  { name: "Sakal", price: 150 },
  { name: "Saç + Sakal", price: 300 },
  { name: "Saç & Yüz Bakımı", price: 150 },
  { name: "Buhar & Cilt Temizleme", price: 200 },
  { name: "Keratin", price: 500 },
];

const barbers = ["Yasin Küçük", "Emir Küçük"];

const times = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const monthNames = [
  "OCAK",
  "ŞUBAT",
  "MART",
  "NİSAN",
  "MAYIS",
  "HAZİRAN",
  "TEMMUZ",
  "AĞUSTOS",
  "EYLÜL",
  "EKİM",
  "KASIM",
  "ARALIK",
];

const dayNames = [
  "PZT",
  "SAL",
  "ÇAR",
  "PER",
  "CUM",
  "CMT",
  "PAZ",
];

const pad = (value) => String(value).padStart(2, "0");

const toDateString = (date) => {
  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;
};

const formatDisplayDate = (dateString) => {
  if (!dateString) {
    return "Tarih seçiniz";
  }

  const [year, month, day] = dateString.split("-");

  return `${day}.${month}.${year}`;
};

function Booking() {
  const [form, setForm] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });

  const [bookedTimes, setBookedTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [calendarDate, setCalendarDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const selectedService = services.find(
    (service) => service.name === form.service
  );

  const updateForm = (field, value) => {
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [field]: value,
      };

      if (field === "barber" || field === "date") {
        updatedForm.time = "";
      }

      return updatedForm;
    });
  };

  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const firstDay = new Date(year, month, 1);

    // JavaScript: Pazar = 0
    // Biz: Pazartesi = ilk gün
    const firstDayIndex = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const cells = [];

    for (let i = 0; i < firstDayIndex; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [calendarDate]);

  const previousMonthDisabled =
    calendarDate.getFullYear() === today.getFullYear() &&
    calendarDate.getMonth() === today.getMonth();

  const goToPreviousMonth = () => {
    if (previousMonthDisabled) {
      return;
    }

    setCalendarDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() - 1,
          1
        )
    );
  };

  const goToNextMonth = () => {
    setCalendarDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + 1,
          1
        )
    );
  };

  const selectDate = (date) => {
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (normalizedDate < today) {
      return;
    }

    updateForm("date", toDateString(normalizedDate));
    setCalendarOpen(false);
  };

  useEffect(() => {
    if (!form.barber || !form.date) {
      setBookedTimes([]);
      return;
    }

    const controller = new AbortController();

    const fetchBookedTimes = async () => {
      try {
        setLoadingTimes(true);

        const params = new URLSearchParams({
          barber: form.barber,
          date: form.date,
        });

        const response = await fetch(
          `http://localhost:5000/api/appointments/booked-times?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Dolu saatler alınamadı."
          );
        }

        setBookedTimes(result.data || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Dolu saatler alınırken hata:",
            error
          );

          setBookedTimes([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingTimes(false);
        }
      }
    };

    fetchBookedTimes();

    return () => {
      controller.abort();
    };
  }, [form.barber, form.date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Randevu oluşturulamadı."
        );
      }

      alert("Randevunuz başarıyla oluşturuldu.");

      setBookedTimes((prev) => {
        if (prev.includes(form.time)) {
          return prev;
        }

        return [...prev, form.time];
      });

      setForm((prev) => ({
        ...prev,
        time: "",
        name: "",
        phone: "",
      }));
    } catch (error) {
      console.error("Randevu hatası:", error);

      alert(
        error.message ||
          "Randevu oluşturulurken bir hata meydana geldi."
      );
    }
  };

  return (
    <section className="booking" id="randevu">
      <div className="booking-grid-bg" />
      <div className="booking-glow booking-glow-left" />
      <div className="booking-glow booking-glow-right" />

      <div className="booking-container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="booking-label">
            <span>08</span>
            <div />
            RANDEVU
          </div>

          <div className="booking-heading-row">
            <h2>
              KOLTUĞUNU
              <br />
              <em>AYIRT.</em>
            </h2>

            <p>
              Hizmetini ve ustanı seç. Sana uygun tarih
              ve saati belirle. Barbaros deneyimi için
              yerini ayırt.
            </p>
          </div>
        </motion.div>

        <div className="booking-layout">
          <motion.form
            className="booking-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9 }}
          >
            <div className="booking-form-heading">
              <span>01</span>

              <div>
                <h3>RANDEVU BİLGİLERİ</h3>
                <p>Seçimlerini aşağıdan oluştur.</p>
              </div>
            </div>

            <div className="booking-field">
              <label>
                <Scissors size={15} strokeWidth={1.3} />
                HİZMET
              </label>

              <select
                value={form.service}
                onChange={(e) =>
                  updateForm("service", e.target.value)
                }
                required
              >
                <option value="">Hizmet seçiniz</option>

                {services.map((service) => (
                  <option
                    key={service.name}
                    value={service.name}
                  >
                    {service.name} — {service.price} ₺
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-field">
              <label>
                <UserRound size={15} strokeWidth={1.3} />
                USTA
              </label>

              <select
                value={form.barber}
                onChange={(e) =>
                  updateForm("barber", e.target.value)
                }
                required
              >
                <option value="">Usta seçiniz</option>

                {barbers.map((barber) => (
                  <option key={barber} value={barber}>
                    {barber}
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-double">
              <div className="booking-field">
                <label>
                  <CalendarDays
                    size={15}
                    strokeWidth={1.3}
                  />
                  TARİH
                </label>

                <div
                  className={`barbaros-date-picker ${
                    calendarOpen ? "is-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="barbaros-date-trigger"
                    onClick={() =>
                      setCalendarOpen((prev) => !prev)
                    }
                  >
                    <span
                      className={
                        form.date ? "has-date" : ""
                      }
                    >
                      {formatDisplayDate(form.date)}
                    </span>

                    <CalendarDays
                      size={17}
                      strokeWidth={1.2}
                    />
                  </button>

                  {calendarOpen && (
                    <motion.div
                      className="barbaros-calendar"
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="barbaros-calendar-header">
                        <button
                          type="button"
                          onClick={goToPreviousMonth}
                          disabled={previousMonthDisabled}
                          aria-label="Önceki ay"
                        >
                          <ChevronLeft
                            size={18}
                            strokeWidth={1.3}
                          />
                        </button>

                        <div>
                          <strong>
                            {
                              monthNames[
                                calendarDate.getMonth()
                              ]
                            }
                          </strong>
                          <span>
                            {calendarDate.getFullYear()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={goToNextMonth}
                          aria-label="Sonraki ay"
                        >
                          <ChevronRight
                            size={18}
                            strokeWidth={1.3}
                          />
                        </button>
                      </div>

                      <div className="barbaros-calendar-weekdays">
                        {dayNames.map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>

                      <div className="barbaros-calendar-days">
                        {calendarDays.map((date, index) => {
                          if (!date) {
                            return (
                              <span
                                className="calendar-empty"
                                key={`empty-${index}`}
                              />
                            );
                          }

                          const dateString =
                            toDateString(date);

                          const isPast = date < today;

                          const isToday =
                            dateString ===
                            toDateString(today);

                          const isSelected =
                            dateString === form.date;

                          return (
                            <button
                              type="button"
                              key={dateString}
                              disabled={isPast}
                              className={[
                                isPast ? "is-past" : "",
                                isToday ? "is-today" : "",
                                isSelected
                                  ? "is-selected"
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={() =>
                                selectDate(date)
                              }
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>

                      <div className="barbaros-calendar-footer">
                        <span />
                        GEÇMİŞ TARİHLER KAPALI
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="booking-field">
                <label>
                  <Clock3 size={15} strokeWidth={1.3} />
                  SAAT
                </label>

                <select
                  value={form.time}
                  onChange={(e) =>
                    updateForm("time", e.target.value)
                  }
                  required
                  disabled={
                    !form.barber ||
                    !form.date ||
                    loadingTimes
                  }
                >
                  <option value="">
                    {!form.barber || !form.date
                      ? "Önce usta ve tarih seçiniz"
                      : loadingTimes
                      ? "Saatler kontrol ediliyor..."
                      : "Saat seçiniz"}
                  </option>

                  {times.map((time) => {
                    const isBooked =
                      bookedTimes.includes(time);

                    return (
                      <option
                        key={time}
                        value={time}
                        disabled={isBooked}
                      >
                        {isBooked
                          ? `${time} — DOLU`
                          : time}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="booking-double">
              <div className="booking-field">
                <label>
                  <UserRound
                    size={15}
                    strokeWidth={1.3}
                  />
                  AD SOYAD
                </label>

                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={form.name}
                  onChange={(e) =>
                    updateForm("name", e.target.value)
                  }
                  required
                />
              </div>

              <div className="booking-field">
                <label>
                  <Phone size={15} strokeWidth={1.3} />
                  TELEFON
                </label>

                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={form.phone}
                  onChange={(e) =>
                    updateForm("phone", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="booking-submit"
            >
              <span>RANDEVU OLUŞTUR</span>

              <ArrowUpRight
                size={20}
                strokeWidth={1.3}
              />
            </button>
          </motion.form>

          <motion.aside
            className="booking-summary"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
            }}
          >
            <div className="booking-summary-top">
              <span>02</span>
              <p>RANDEVU ÖZETİ</p>
            </div>

            <div className="booking-summary-brand">
              <Scissors
                size={25}
                strokeWidth={1}
              />

              <span>BARBAROS</span>
              <small>ERKEK KUAFÖRÜ</small>
            </div>

            <div className="booking-summary-list">
              <div>
                <span>HİZMET</span>
                <strong>
                  {form.service || "—"}
                </strong>
              </div>

              <div>
                <span>USTA</span>
                <strong>
                  {form.barber || "—"}
                </strong>
              </div>

              <div>
                <span>TARİH</span>
                <strong>
                  {form.date
                    ? formatDisplayDate(form.date)
                    : "—"}
                </strong>
              </div>

              <div>
                <span>SAAT</span>
                <strong>
                  {form.time || "—"}
                </strong>
              </div>
            </div>

            <div className="booking-price">
              <span>TOPLAM</span>

              <div>
                <strong>
                  {selectedService
                    ? selectedService.price
                    : "—"}
                </strong>

                {selectedService && <span>₺</span>}
              </div>
            </div>

            <p className="booking-note">
              Randevu talebiniz seçtiğiniz bilgilerle
              sistemimize gönderilecektir.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export default Booking;