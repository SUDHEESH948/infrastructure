import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const FloatingWidgets = () => {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auto scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappUrl =
    "https://wa.me/917559034444?text=Hello%20ONSET%20INFRA,%20I%20would%20like%20to%20inquire%20about%20your%20services.";

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-center gap-3">
      {/* SCROLL TO TOP BUTTON (Appears smoothly when scrolled past 300px) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#0066B4] text-white shadow-xl shadow-[#0066B4]/30 ring-1 ring-white/20 transition-all duration-300 hover:bg-[#005291] hover:-translate-y-1 hover:shadow-2xl active:scale-95"
          >
            <ChevronUp size={20} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
              Scroll to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON (Always visible with subtle pulse) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] active:scale-95"
      >
        {/* Ambient pulse ring */}
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping" />

        {/* WhatsApp Icon */}
        <svg
          className="relative z-10 h-7 w-7 sm:h-8 sm:w-8 fill-current drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};

export default FloatingWidgets;
