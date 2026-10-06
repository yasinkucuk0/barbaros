import { useState } from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  UserRound,
  Phone,
  Scissors,
  ArrowUpRight,
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

function Booking() {
  const [form, setForm] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });

  const selectedService = services.find(
    (service) => service.name === form.service
  );

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

      console.log("Backend cevabı:", result);

      alert("Randevunuz başarıyla oluşturuldu.");
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
              Hizmetini ve ustanı seç.
              Sana uygun tarih ve saati belirle.
              Barbaros deneyimi için yerini ayırt.
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

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    updateForm("date", e.target.value)
                  }
                  required
                />
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
                >
                  <option value="">Saat seçiniz</option>

                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
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
                  {form.date || "—"}
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