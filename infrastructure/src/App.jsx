
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import OurProjects from "./pages/OurProjects";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white">

        {/* =================================================
            PERSISTENT NAVIGATION
        ================================================= */}
        <Navigation />

        {/* =================================================
            PAGE CONTENT
        ================================================= */}
        <main className="flex-grow">

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* SERVICES */}
            <Route
              path="/services"
              element={<Services />}
            />

            {/* PROJECTS */}
            <Route
              path="/projects"
              element={<OurProjects />}
            />

            {/* ABOUT */}
            <Route
              path="/about"
              element={<AboutUs />}
            />

            {/* CONTACT */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={<Admin />}
            />

            {/* FALLBACK */}
            <Route
              path="*"
              element={<Home />}
            />

          </Routes>

        </main>

        {/* =================================================
            PERSISTENT FOOTER
        ================================================= */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
