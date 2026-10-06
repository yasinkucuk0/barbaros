import { motion } from "motion/react";
import { Scissors } from "lucide-react";

function Intro() {
  return (
    <motion.div
      className="intro"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
          delay: 0.75,
        },
      }}
    >
      <motion.div
        className="intro-panel intro-panel-left"
        exit={{
          x: "-100%",
          transition: {
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
      />

      <motion.div
        className="intro-panel intro-panel-right"
        exit={{
          x: "100%",
          transition: {
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
      />

      <motion.div
        className="intro-content"
        exit={{
          opacity: 0,
          scale: 0.96,
          transition: {
            duration: 0.35,
          },
        }}
      >
        <motion.div
          className="intro-mark"
          initial={{
            opacity: 0,
            scale: 0.7,
            rotate: -20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Scissors size={24} strokeWidth={1.3} />
        </motion.div>

        <div className="intro-title-mask">
          <motion.h2
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            BARBAROS
          </motion.h2>
        </div>

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.7,
          }}
        >
          ERKEK KUAFÖRÜ
        </motion.p>

        <div className="intro-loader">
          <motion.div
            className="intro-loader-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.25,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Intro;