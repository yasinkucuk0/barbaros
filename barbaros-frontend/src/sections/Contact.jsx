import { motion } from "motion/react";
import {
  Phone,
  MapPin,
  Clock3,
  ArrowUpRight,
  Scissors,
} from "lucide-react";

function Contact() {
  return (
    <footer className="contact" id="iletisim">
      <div className="contact-grid-bg" />
      <div className="contact-glow" />

      <div className="contact-container">

        {/* HEADER */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="contact-label">
            <span>09</span>
            <div />
            İLETİŞİM
          </div>

          <div className="contact-heading-row">
            <h2>
              KOLTUĞUN
              <br />
              <em>HAZIR.</em>
            </h2>

            <p>
              Tarzını yenilemek için geriye yalnızca
              bir adım kaldı. Bize ulaş, randevunu oluştur
              ve Barbaros deneyimini keşfet.
            </p>
          </div>
        </motion.div>

        {/* İLETİŞİM KARTLARI */}
        <div className="contact-cards">

          {/* TELEFON */}
          <motion.a
            className="contact-card"
            href="tel:+905455572087"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-card-top">
              <span>01</span>
              <Phone size={22} strokeWidth={1.2} />
            </div>

            <div className="contact-card-content">
              <span>TELEFON</span>

              <h3>
                0545 557
                <br />
                20 87
              </h3>

              <p>Randevu ve bilgi için bizi ara.</p>
            </div>

            <div className="contact-card-arrow">
              <ArrowUpRight size={22} strokeWidth={1.2} />
            </div>
          </motion.a>

          {/* ADRES */}
          <motion.a
            className="contact-card"
            href="https://www.google.com/maps/search/?api=1&query=Hatay+Hassa+Aktepe+Mahallesi+Gül+Sokak+No+1"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <div className="contact-card-top">
              <span>02</span>
              <MapPin size={22} strokeWidth={1.2} />
            </div>

            <div className="contact-card-content">
              <span>ADRES</span>

              <h3>
                HASSA
                <br />
                AKTEPE
              </h3>

              <p>
                Aktepe Mahallesi
                <br />
                Gül Sokak No: 1
                <br />
                Hassa / Hatay
              </p>
            </div>

            <div className="contact-card-arrow">
              <ArrowUpRight size={22} strokeWidth={1.2} />
            </div>
          </motion.a>

          {/* ÇALIŞMA SAATLERİ */}
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            <div className="contact-card-top">
              <span>03</span>
              <Clock3 size={22} strokeWidth={1.2} />
            </div>

            <div className="contact-card-content">
              <span>ÇALIŞMA SAATLERİ</span>

              <h3>
                09:00
                <br />
                21:00
              </h3>

              <p>
                Sabah 09:00
                <br />
                Akşam 21:00
              </p>
            </div>
          </motion.div>

          {/* INSTAGRAM */}
          <motion.a
            className="contact-card"
            href="https://www.instagram.com/barbarOs99/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >
            <div className="contact-card-top">
              <span>04</span>

              <span className="contact-instagram-icon">
                IG
              </span>
            </div>

            <div className="contact-card-content">
              <span>INSTAGRAM</span>

              <h3>@barbarOs99</h3>

              <p>
                Yeni kesimler, stiller ve
                Barbaros'tan kareler.
              </p>
            </div>

            <div className="contact-card-arrow">
              <ArrowUpRight size={22} strokeWidth={1.2} />
            </div>
          </motion.a>

        </div>

        {/* BÜYÜK CTA */}
        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="contact-cta-icon">
            <Scissors size={27} strokeWidth={1} />
          </div>

          <span>BARBAROS ERKEK KUAFÖRÜ</span>

          <h3>
            SIRADAKİ
            <br />
            <em>DEĞİŞİM SENİN.</em>
          </h3>

          <a href="#randevu">
            <span>RANDEVUNU OLUŞTUR</span>
            <ArrowUpRight size={20} strokeWidth={1.2} />
          </a>
        </motion.div>

        {/* DEV BARBAROS */}
        <div className="contact-big-brand">
          <motion.h2
            initial={{
              opacity: 0,
              y: 70,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            BARBAROS
          </motion.h2>
        </div>

        {/* FOOTER */}
        <div className="contact-footer">
          <div className="contact-footer-brand">
            <Scissors size={17} strokeWidth={1.2} />

            <span>BARBAROS</span>
          </div>

          <p>
            ERKEK KUAFÖRÜ • HASSA • HATAY
          </p>

          <a
            href="https://www.instagram.com/barbarOs99/"
            target="_blank"
            rel="noreferrer"
          >
            @barbarOs99
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Contact;