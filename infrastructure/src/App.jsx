
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import OurProjects from "./pages/OurProjects";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Admin from "./pages/Admin";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col bg-white">
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

      {/* Hide public footer on Admin routes */}
      {!isAdmin && <Footer />}
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
