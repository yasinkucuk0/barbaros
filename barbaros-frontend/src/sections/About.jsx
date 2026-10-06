import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MapPin, Scissors } from "lucide-react";

import barberWork from "../assets/about/barber-work.png";
import hatay from "../assets/about/hatay.png";
import alanya from "../assets/about/alanya.png";
import istanbul from "../assets/about/istanbul.png";
import barbarosShop from "../assets/about/barbaros-shop.png";

const journey = [
  {
    number: "01",
    title: "BAŞLANGIÇ",
    place: "14 Yaşında",
    location: "Hatay • Hassa • Aktepe",
    text: "Mesleğe ilk adım",
    image: hatay,
  },
  {
    number: "02",
    title: "ANTALYA",
    place: "Alanya",
    location: "Akdeniz",
    text: "Farklı salonlarda deneyim",
    image: alanya,
  },
  {
    number: "03",
    title: "İSTANBUL",
    place: "Çekmeköy • Sarıyer • Kartal • Ümraniye",
    location: "İstanbul",
    text: "Farklı müşteri profilleri ve yılların tecrübesi",
    image: istanbul,
  },
  {
    number: "04",
    title: "BARBAROS",
    place: "Hatay • Hassa • Aktepe",
    location: "01.02.2023",
    text: "Kendi hikâyemizin başlangıcı",
    image: barbarosShop,
  },
];

function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "8%"]
  );

  return (
    <section
      className="about about-cinematic"
      id="hakkimizda"
      ref={sectionRef}
    >
      <div className="about-cinematic-grid" />
      <div className="about-cinematic-glow" />

      <div className="about-background-number">
        15
      </div>

      <div className="about-container">
        {/* ÜST BAŞLIK */}

        <motion.div
          className="about-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="about-section-label">
            <span>02</span>
            <div />
            HAKKIMIZDA
          </div>

          <h2>
            15 YILLIK
            <br />
            <em>USTALIK.</em>
          </h2>
        </motion.div>

        {/* ANA HİKÂYE */}

        <div className="about-cinematic-story">
          {/* SOL */}

          <motion.div
            className="about-cinematic-intro"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Scissors
              size={24}
              strokeWidth={1.3}
            />

            <p>
              Kuaförlük benim için
              yalnızca bir meslek değil;
              <strong>
                {" "}
                14 yaşında başlayan
              </strong>{" "}
              ve yıllar içinde ustalığa
              dönüşen bir yolculuk.
            </p>

            <div className="about-signature">
              BARBAROS
              <span>ERKEK KUAFÖRÜ</span>
            </div>
          </motion.div>

          {/* ORTA FOTOĞRAF */}

          <motion.div
            className="about-main-photo"
            initial={{
              opacity: 0,
              scale: 0.92,
              clipPath:
                "inset(15% 10% 15% 10%)",
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              clipPath:
                "inset(0% 0% 0% 0%)",
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.img
              src={barberWork}
              alt="Barbaros Erkek Kuaförü"
              style={{ y: imageY }}
            />

            <div className="about-photo-overlay" />

            <div className="about-photo-caption">
              <span>15</span>
              YILLIK DENEYİM
            </div>
          </motion.div>

          {/* SAĞ HİKÂYE */}

          <motion.div
            className="about-cinematic-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
          >
            <p>
              Yaklaşık 15 yıldır devam eden
              meslek hayatım boyunca farklı
              şehirlerde, farklı salonlarda ve
              farklı müşteri profilleriyle
              çalışma fırsatı buldum.
            </p>

            <p>
              Antalya{" "}
              <strong>Alanya</strong>'dan
              İstanbul'a uzanan bu süreçte;{" "}
              <strong>
                Çekmeköy, Sarıyer, Kartal ve
                Ümraniye
              </strong>{" "}
              gibi İstanbul'un farklı
              bölgelerinde mesleğimi sürdürerek
              hem tecrübemi hem de mesleğe bakış
              açımı geliştirdim.
            </p>

            <p>
              Her çalıştığım yer bana farklı bir
              şey kattı. Farklı saç yapıları, yüz
              tipleri, stiller ve beklentilerle
              çalışmak; kuaförlüğün yalnızca saç
              kesmekten ibaret olmadığını, kişiye
              yakışan tarzı doğru şekilde ortaya
              çıkarmak olduğunu öğretti.
            </p>

            <p>
              Yıllar boyunca edindiğim deneyimi
              kendi anlayışımla birleştirerek{" "}
              <strong>1 Şubat 2023</strong>{" "}
              tarihinde Hatay'ın Hassa ilçesi{" "}
              <strong>
                Aktepe Mahallesi'nde
              </strong>{" "}
              Barbaros Erkek Kuaförü'nü açtık.
            </p>

            <p>
              Bugün Barbaros'ta amacımız yalnızca
              iyi bir tıraş sunmak değil; işimizi
              severek yapmak, müşterimize özen
              göstermek ve koltuğumuzdan kalkan
              kişinin kendisini daha iyi
              hissetmesini sağlamak.
            </p>
          </motion.div>
        </div>

        {/* SÖZ */}

        <motion.div
          className="about-cinematic-quote"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="quote-line" />

          <span className="quote-symbol">
            “
          </span>

          <p>
            Antalya'dan İstanbul'a,
            İstanbul'dan Hatay'a uzanan
            <br />
            <strong>
              15 yıllık tecrübe
            </strong>{" "}
            artık Barbaros çatısı altında
            devam ediyor.
          </p>

          <div className="quote-line" />
        </motion.div>

        {/* YOLCULUK */}

        <div className="cinematic-journey">
          <motion.div
            className="journey-title"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MapPin
              size={18}
              strokeWidth={1.5}
            />

            <span>YOLCULUK</span>
          </motion.div>

          <div className="journey-visual">
            {/* FOTOĞRAF ŞERİDİ */}

            <div className="journey-images">
              {journey.map((item, index) => (
                <motion.div
                  className="journey-image"
                  key={`image-${item.number}`}
                  initial={{
                    opacity: 0,
                    scale: 1.08,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.12,
                  }}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} ${item.place}`}
                  />

                  <div className="journey-image-shade" />
                </motion.div>
              ))}
            </div>

            {/* ROTA */}

            <div className="journey-route">
              <div className="journey-route-base" />

              <motion.div
                className="journey-route-progress"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: 2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>

            {/* DURAKLAR */}

            <div className="journey-cards">
              {journey.map((item, index) => (
                <motion.article
                  className="journey-card"
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      0.25 + index * 0.15,
                  }}
                >
                  <span className="journey-card-number">
                    {item.number}
                  </span>

                  <div className="journey-card-dot" />

                  <h3>{item.title}</h3>

                  <h4>{item.place}</h4>

                  <h5>{item.location}</h5>

                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;