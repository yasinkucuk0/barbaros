import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Scissors } from "lucide-react";

import { DEFAULT_SERVICES } from "../data/defaultServices";

const SERVICES_API = "http://localhost:5000/api/services";

const normalizeName = (value) =>
  String(value || "")
    .toLocaleUpperCase("tr-TR")
    .replace(/\s+/g, " ")
    .trim();

// Panelde hizmet girildiyse site listesi tamamen veritabanından gelir
// (panelde gizlenen hizmet sitede görünmez). Açıklamalar sabit listeden
// isimle eşleştirilerek korunur. API'ye ulaşılamazsa veya henüz hizmet
// girilmediyse sabit liste gösterilir.
const mergeServices = (apiServices) => {
  if (!Array.isArray(apiServices) || apiServices.length === 0) {
    return DEFAULT_SERVICES;
  }

  const defaults = new Map(
    DEFAULT_SERVICES.map((item) => [normalizeName(item.title), item])
  );

  return apiServices.map((item, index) => {
    const title = normalizeName(item.name);
    const base = defaults.get(title);

    return {
      number: String(index + 1).padStart(2, "0"),
      title,
      subtitle: base?.subtitle || `${item.durationMinutes} dakika`,
      description: base?.description || "",
      price: String(item.price),
    };
  });
};

function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    let active = true;

    fetch(SERVICES_API)
      .then((response) => response.json())
      .then((result) => {
        if (active && result?.success) {
          setServices(mergeServices(result.data));
        }
      })
      .catch(() => {
        // Backend kapaliysa sabit liste kalir.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="services" id="hizmetler">
      <div className="services-grid-bg" />
      <div className="services-glow" />

      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="services-label">
            <span>03</span>
            <div />
            HİZMETLER
          </div>

          <div className="services-heading-row">
            <h2>
              USTALIĞIMIZI
              <br />
              <em>KEŞFET.</em>
            </h2>

            <p>
              Geleneksel berberlik kültürünü modern tekniklerle
              birleştiriyor, her hizmeti kişiye özel bir deneyime
              dönüştürüyoruz.
            </p>
          </div>
        </motion.div>

        <div className="services-content">
          <motion.aside
            className="services-side"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
          >
            <Scissors size={25} strokeWidth={1.2} />

            <p>
              İyi bir tıraş
              <br />
              sadece kesim değildir.
              <br />
              <strong>Doğru tarzı bulmaktır.</strong>
            </p>

            <span>BARBAROS • HASSA</span>
          </motion.aside>

          <div className="services-list">
            {services.map((service, index) => (
              <motion.article
                className="service-item"
                key={`${service.number}-${service.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.06,
                }}
              >
                <span className="service-number">
                  {service.number}
                </span>

                <div className="service-main">
                  <span className="service-subtitle">
                    {service.subtitle}
                  </span>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </div>

                <div className="service-price">
                  <strong>{service.price}</strong>
                  <span>₺</span>
                </div>

                <div className="service-arrow">
                  <ArrowUpRight size={27} strokeWidth={1.2} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="services-marquee">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          BARBAROS • CRAFT • STYLE • PRECISION • BARBAROS •
          CRAFT • STYLE • PRECISION • BARBAROS • CRAFT •
          STYLE • PRECISION • BARBAROS • CRAFT • STYLE •
          PRECISION •
        </motion.div>
      </div>
    </section>
  );
}

export default Services;