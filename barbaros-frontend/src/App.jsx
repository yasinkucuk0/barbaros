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

import "./App.css";

function MainSite() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="site">
      <AnimatePresence>
        {introVisible && <Intro key="intro" />}
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

function App() {
  const path = window.location.pathname;

  if (path === "/admin" || path === "/admin/") {
    return <AdminAppointments />;
  }

  return <MainSite />;
}

export default App;