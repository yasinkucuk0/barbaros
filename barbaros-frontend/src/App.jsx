import { useEffect, useState } from "react";
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
import AdminLogin from "./admin/pages/AdminLogin";

import "./App.css";

function MainSite() {
  const [introVisible, setIntroVisible] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
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

  const handleLogin = (newToken) => {
    sessionStorage.setItem(
      "barbaros_admin_token",
      newToken
    );

    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(
      "barbaros_admin_token"
    );

    setToken(null);
  };

  if (!token) {
    return (
      <AdminLogin
        onLogin={handleLogin}
      />
    );
  }

  return (
    <AdminAppointments
      token={token}
      onLogout={handleLogout}
    />
  );
}

function App() {
  const path = window.location.pathname;

  if (
    path === "/admin" ||
    path === "/admin/"
  ) {
    return <AdminPage />;
  }

  return <MainSite />;
}

export default App;