import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Scissors, Menu, X, ArrowUpRight } from "lucide-react";

const menuItems = [
  { name: "Hakkımızda", href: "#hakkimizda" },
  { name: "Hizmetler", href: "#hizmetler" },
  { name: "Ekibimiz", href: "#ekibimiz" },
  { name: "Galeri", href: "#galeri" },
  { name: "Yorumlar", href: "#yorumlar" },
  { name: "Randevu", href: "#randevu" },
  { name: "İletişim", href: "#iletisim" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.2,
        }}
      >
        <a
          href="#anasayfa"
          className="brand"
          onClick={closeMenu}
        >
          <Scissors size={22} strokeWidth={1.5} />
          <span>BARBAROS</span>
        </a>

        <div className="nav-links">
          <a href="#hakkimizda">Hakkımızda</a>
          <a href="#hizmetler">Hizmetler</a>
          <a href="#ekibimiz">Ekibimiz</a>
          <a href="#galeri">Galeri</a>
          <a href="#iletisim">İletişim</a>
        </div>

        <div className="nav-actions">
          <a
            className="nav-booking"
            href="#randevu"
          >
            RANDEVU
          </a>

          <a
            className="nav-instagram"
            href="https://www.instagram.com/barbarOs99/"
            target="_blank"
            rel="noreferrer"
            aria-label="Barbaros Instagram"
          >
            IG
          </a>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={23} strokeWidth={1.3} />
            ) : (
              <Menu size={23} strokeWidth={1.3} />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mobile-menu-inner"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div className="mobile-menu-label">
                <span>MENU</span>
                <div />
                <span>BARBAROS</span>
              </div>

              <nav className="mobile-menu-links">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + index * 0.05,
                    }}
                  >
                    <span className="mobile-link-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{item.name}</span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1}
                    />
                  </motion.a>
                ))}
              </nav>

              <div className="mobile-menu-bottom">
                <div>
                  <span>İLETİŞİM</span>
                  <a href="tel:+905455572087">
                    0545 557 20 87
                  </a>
                </div>

                <div>
                  <span>INSTAGRAM</span>
                  <a
                    href="https://www.instagram.com/barbarOs99/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @barbarOs99
                  </a>
                </div>

                <div>
                  <span>KONUM</span>
                  <p>Hassa • Hatay</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;