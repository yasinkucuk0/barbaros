import { motion } from "motion/react";
import { ArrowUpRight, Scissors } from "lucide-react";

const services = [
  {
    number: "01",
    title: "SAÇ KESİMİ",
    subtitle: "Kişiye özel kesim",
    description:
      "Yüz şeklinize, saç yapınıza ve tarzınıza uygun profesyonel kesim.",
    price: "250",
  },
  {
    number: "02",
    title: "ÖĞRENCİ",
    subtitle: "Öğrenci saç kesimi",
    description:
      "Öğrenciler için modern, temiz ve kişiye uygun saç kesimi.",
    price: "200",
  },
  {
    number: "03",
    title: "ÇOCUK",
    subtitle: "Çocuk saç kesimi",
    description:
      "Küçük misafirlerimiz için rahat, özenli ve kontrollü kesim.",
    price: "200",
  },
  {
    number: "04",
    title: "SAKAL",
    subtitle: "Sakal tasarımı",
    description:
      "Yüz hatlarına uygun sakal formu, çizgi düzenleme ve şekillendirme.",
    price: "150",
  },
  {
    number: "05",
    title: "SAÇ + SAKAL",
    subtitle: "Eksiksiz görünüm",
    description:
      "Saç ve sakalın birlikte ele alındığı bütünlüklü bir stil.",
    price: "300",
  },
  {
    number: "06",
    title: "SAÇ & YÜZ BAKIMI",
    subtitle: "Bakım ritüeli",
    description:
      "Tıraş deneyimini tamamlayan saç ve yüz bakım uygulaması.",
    price: "150",
  },
  {
    number: "07",
    title: "BUHAR & CİLT TEMİZLEME",
    subtitle: "Derinlemesine bakım",
    description:
      "Buhar uygulamasıyla desteklenen ferahlatıcı cilt temizleme bakımı.",
    price: "200",
  },
  {
    number: "08",
    title: "KERATİN",
    subtitle: "Profesyonel saç bakımı",
    description:
      "Saçın daha bakımlı ve düzenli görünmesini destekleyen keratin uygulaması.",
    price: "500",
  },
];

function Services() {
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
                key={service.number}
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