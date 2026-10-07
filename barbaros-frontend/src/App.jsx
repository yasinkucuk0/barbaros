import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { AnimatePresence } from "motion/react";

import Intro from "./components/Intro";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Team from "./sections/Team";
import Gallery from "./sections/Gallery";
import Reviews from "./sections/Reviews";
import Booking from "./sections/Booking";
import Contact from "./sections/Contact";

import AdminAppointments from "./admin/pages/AdminAppointments";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLogin from "./admin/pages/AdminLogin";

import "./App.css";

function MainSite() {
  const [introVisible, setIntroVisible] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="site">
      <AnimatePresence>
        {introVisible && (
          <Intro key="intro" />
        )}
      </AnimatePresence>

      <Hero />
      <About />
      <Services />
      <Team />
      <Gallery />
      <Reviews />
      <Booking />
      <Contact />
    </main>
  );
}

function AdminPage() {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem(
      "barbaros_admin_token"
    );
  });

  const [activePage, setActivePage] =
    useState("dashboard");

  const handleLogin = useCallback(
    (newToken) => {
      sessionStorage.setItem(
        "barbaros_admin_token",
        newToken
      );

      setToken(newToken);
      setActivePage("dashboard");
    },
    []
  );

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(
      "barbaros_admin_token"
    );

    setToken(null);
    setActivePage("dashboard");
  }, []);

  if (!token) {
    return (
      <AdminLogin
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="admin-system">
      <nav className="admin-main-navigation">
        <div className="admin-main-navigation-brand">
          BARBAROS
        </div>

        <div className="admin-main-navigation-links">
          <button
            type="button"
            className={
              activePage === "dashboard"
                ? "active"
                : ""
            }
            onClick={() => {
              setActivePage("dashboard");
            }}
          >
            KONTROL PANELİ
          </button>

          <button
            type="button"
            className={
              activePage === "appointments"
                ? "active"
                : ""
            }
            onClick={() => {
              setActivePage("appointments");
            }}
          >
            RANDEVULAR
          </button>
        </div>

        <button
          type="button"
          className="admin-main-navigation-logout"
          onClick={handleLogout}
        >
          ÇIKIŞ
        </button>
      </nav>

      <div className="admin-page-content">
        {activePage === "dashboard" && (
          <AdminDashboard
            token={token}
          />
        )}

        {activePage === "appointments" && (
          <AdminAppointments
            token={token}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  const path =
    window.location.pathname;

  if (
    path === "/admin" ||
    path === "/admin/"
  ) {
    return <AdminPage />;
  }

  return <MainSite />;
}

export default App;