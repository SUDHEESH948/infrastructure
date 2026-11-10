
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import OurProjects from "./pages/OurProjects";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Admin from "./pages/Admin";

// Automatically scroll to the top of the page and update document title on route/page change
function PageMetaTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    const routeTitles = {
      "/": "Onset Infra",
      "/services": "Services | Onset Infra",
      "/projects": "Projects | Onset Infra",
      "/about": "About Us | Onset Infra",
      "/contact": "Contact Us | Onset Infra",
      "/admin": "Admin | Onset Infra",
    };

    document.title = routeTitles[pathname] || "Onset Infra";
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageMetaTracker />
      {/* Hide public navigation and footer on Admin routes */}
      {!isAdmin && <Navigation />}

      {/* PAGE CONTENT */}
      <main className="relative z-10 flex-grow bg-white shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<OurProjects />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Hide public footer and floating widgets on Admin routes */}
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWidgets />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
