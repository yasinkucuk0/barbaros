import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import haircutImage from "../assets/gallery/haircut.png";
import beardImage from "../assets/gallery/beard.png";
import workshopImage from "../assets/gallery/workshop.png";
import detailImage from "../assets/gallery/detail.png";
import styleImage from "../assets/gallery/style.png";

const galleryItems = [
  {
    number: "01",
    title: "SAÇ KESİMİ",
    subtitle: "Barbaros Signature",
    image: haircutImage,
    className: "gallery-item-large",
  },
  {
    number: "02",
    title: "SAKAL",
    subtitle: "Detay & Form",
    image: beardImage,
    className: "gallery-item-small",
  },
  {
    number: "03",
    title: "ATÖLYE",
    subtitle: "Barbaros Atmosferi",
    image: workshopImage,
    className: "gallery-item-small",
  },
  {
    number: "04",
    title: "DETAY",
    subtitle: "Ustalığın İzleri",
    image: detailImage,
    className: "gallery-item-wide",
  },
  {
    number: "05",
    title: "STİL",
    subtitle: "Modern Dokunuş",
    image: styleImage,
    className: "gallery-item-medium",
  },
];

function Gallery() {
  return (
    <section className="gallery" id="galeri">
      <div className="gallery-grid-bg" />
      <div className="gallery-glow" />

      <div className="gallery-container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="gallery-label">
            <span>05</span>
            <div />
            GALERİ
          </div>

          <div className="gallery-heading-row">
            <h2>
              BİR KESİMDEN
              <br />
              <em>DAHA FAZLASI.</em>
            </h2>

            <div className="gallery-intro">
              <p>
                Her detay, her çizgi ve her dokunuş
                Barbaros'un karakterinden bir parça taşır.
              </p>

              <span>
                CRAFT • DETAIL • CHARACTER
              </span>
            </div>
          </div>
        </motion.div>

        <div className="gallery-layout">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.number}
              className={`gallery-item ${item.className}`}
              initial={{
                opacity: 0,
                y: 70,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-real-image"
                />
              </div>

              <div className="gallery-shade" />

              <span className="gallery-number">
                {item.number}
              </span>

              <div className="gallery-item-content">
                <span>{item.subtitle}</span>
                <h3>{item.title}</h3>
              </div>

              <div className="gallery-arrow">
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.2}
                />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="gallery-bottom"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>MAKAS. TARAK. USTALIK.</p>

          <div />

          <span>HASSA • HATAY</span>
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;