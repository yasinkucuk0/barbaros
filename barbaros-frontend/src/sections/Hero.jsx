import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Navbar from "../components/Navbar";

function Hero() {
  return (
    <section className="hero" id="anasayfa">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />
      <div className="hero-noise" />

      <Navbar />

      <div className="hero-content">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
        >
          <span />
          HASSA • HATAY
          <span />
        </motion.div>

        <div className="hero-title-wrapper">
          <motion.p
            className="hero-small-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
          >
            ERKEK KUAFÖRÜ
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.15,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            BARBAROS
          </motion.h1>
        </div>

        <motion.div
          className="hero-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 1,
          }}
        />

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.05,
          }}
        >
          Geleneksel ustalık. Modern stil.
          <br />
          Kendine yakışanı keşfet.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.25,
          }}
        >
          <a href="#randevu" className="primary-button">
            <span>RANDEVU AL</span>
            <span className="button-arrow">↗</span>
          </a>

          <a
            href="#hakkimizda"
            className="secondary-button"
          >
            BİZİ KEŞFET
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.6,
        }}
      >
        <span>KEŞFET</span>

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={17} />
        </motion.div>
      </motion.div>

      <div className="hero-number">01</div>
    </section>
  );
}

export default Hero;