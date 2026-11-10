import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import logo from "../assets/logo/onsite infra.png";

// Individual letters for staggered reveal of ONSET INFRA
const wordOnset = ["O", "N", "S", "E", "T"];
const wordInfra = ["I", "N", "F", "R", "A"];

const middleFadeVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Admin Portal", to: "/admin" },
];

const Footer = () => {
  const footerRef = useRef(null);
  const spacerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Measure dynamic footer height for the natural document spacer
  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (footerRef.current) ro.observe(footerRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // IntersectionObserver to trigger animations when the user scrolls near the footer
  useEffect(() => {
    if (!spacerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(spacerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 
        NATURAL DOCUMENT SPACER:
        Sits in normal document flow below <main>. As user scrolls down,
        this space scrolls into view, allowing the main content to slide
        upward like a curtain and reveal the fixed footer underneath.
      */}
      <div
        ref={spacerRef}
        style={{ height: footerHeight ? `${footerHeight}px` : "80vh" }}
        className="w-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 
        CINEMATIC FOOTER LAYER:
        Modeled after the reference layout with top metadata strip,
        modern editorial headline, contact chips, and bottom ONSET INFRA typography.
      */}
      <footer
        id="footer"
        ref={footerRef}
        style={{
          pointerEvents: isRevealed ? "auto" : "none",
        }}
        className="fixed bottom-0 left-0 right-0 w-full z-0 h-[86vh] min-h-[620px] max-h-[860px] bg-gradient-to-b from-[#005ea8] via-[#0066B4] to-[#003866] text-white flex flex-col justify-between overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16 shadow-[inset_0_-50px_90px_rgba(0,0,0,0.5)]"
      >
        {/* SUBTLE AMBIENT LIGHTING OVERLAYS */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-3xl" />

        {/* BOTTOM FLOOR SHADOW GRADIENT VIGNETTE */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/55 via-black/20 to-transparent z-0" />

        {/* ========================================================
            1. MIDDLE SECTION: EDITORIAL STATEMENT, LOGO & SOCIAL MEDIA
               FOLLOWED BY DEDICATED PHONE & LOCATION ROW (ON THE SAME LINE)
        ======================================================== */}
        <motion.div
          variants={middleFadeVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
          className="relative z-10 my-auto flex flex-col justify-between gap-6 sm:gap-8 py-3"
        >
          {/* TOP ROW: ON DESKTOP 3 COLUMNS, ON MOBILE EDITORIAL ON TOP AND NAVIGATION & LOGO/SOCIAL SIDE-BY-SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8 items-center">
            {/* LEFT COLUMN: EDITORIAL STATEMENT AS A CONTAINER */}
            <div className="col-span-1 md:col-span-5 lg:col-span-5">
              <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-md border border-white/20 p-4 sm:p-5 md:p-6 shadow-2xl ring-1 ring-white/10 flex flex-col justify-center gap-1.5 sm:gap-2.5 transition-all duration-300 hover:border-white/30 hover:from-white/[0.15]">
                <h2 className="font-serif text-lg sm:text-2xl lg:text-4xl font-light leading-[1.08] tracking-tight text-white">
                  Engineers and
                  <br />
                  <span className="font-sans font-normal text-cyan-100">
                    interior designers.
                  </span>
                </h2>
                <p className="text-[10px] sm:text-xs font-light leading-relaxed text-white/80 line-clamp-2 sm:line-clamp-none">
                  Building &amp; road contracting, bespoke interior design, modular
                  kitchens, statutory permits, Airport NOC, precision GPS surveying,
                  and 3D architectural visualization.
                </p>
              </div>
            </div>

            {/* ON MOBILE: 2-COLUMN ROW (NAVIGATION ON LEFT, LOGO & SOCIAL ON RIGHT) */}
            {/* ON DESKTOP (md:): EXPANDS TO 7 COLUMNS (3 FOR NAVIGATION, 4 FOR LOGO & SOCIAL) */}
            <div className="col-span-1 md:col-span-7 lg:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-3 sm:gap-6 items-start sm:items-center">
              {/* NAVIGATION LINKS (LEFT ON MOBILE, CENTER ON DESKTOP) */}
              <div className="col-span-1 md:col-span-3 flex flex-col items-start md:items-center justify-center">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Navigation
                  </span>
                  <nav className="flex flex-col gap-1 sm:gap-1.5" aria-label="Footer Quick Navigation">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={scrollToTop}
                        className="text-[11px] sm:text-xs md:text-sm font-medium text-white/80 transition-all duration-200 hover:text-cyan-200 hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              {/* OFFICIAL COMPANY LOGO & SOCIAL MEDIA ICONS (RIGHT ON MOBILE, RIGHT ON DESKTOP) */}
              <div className="col-span-1 md:col-span-4 flex flex-col items-end justify-center gap-2.5 sm:gap-4">
                {/* OFFICIAL COMPANY LOGO */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={
                    isRevealed
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.9, y: 15 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-white px-3 py-1.5 sm:px-5 sm:py-3 shadow-xl ring-1 ring-white/40 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={logo}
                    alt="ONSET INFRA"
                    className="h-7 sm:h-11 md:h-14 w-auto object-contain"
                  />
                </motion.div>

                {/* SOCIAL MEDIA ICONS */}
                <div className="flex flex-col items-end gap-1 sm:gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Social Media
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/onset.infra?rpxt=cXl2Z2h6dzFtd2p1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0066B4] shadow-md border border-white/15"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/share/1FWoJMrVka/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0066B4] shadow-md border border-white/15"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0066B4] shadow-md border border-white/15"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>

                    {/* Threads */}
                    <a
                      href="https://www.threads.net/@onset.infra"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Threads"
                      title="Follow ONSET INFRA on Threads"
                      className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0066B4] shadow-md border border-white/15"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.095 5.467 0 12.186 0c3.96 0 7.426 1.868 9.61 4.792l-2.43 1.768C17.65 4.38 15.08 3.01 12.186 3.01c-4.857 0-8.804 3.947-8.804 8.804 0 4.857 3.947 8.804 8.804 8.804 3.91 0 6.942-2.316 7.828-5.834h-7.828v-3.003h10.963c.094.636.142 1.294.142 1.97 0 6.43-4.57 10.249-11.105 10.249z"/>
                      </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/917559034444"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0066B4] shadow-md border border-white/15"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: PHONE NUMBER & LOCATION IN THE EXACT SAME HORIZONTAL LINE */}
          <div className="flex flex-row items-center justify-between gap-3 pt-2.5 sm:pt-4 border-t border-white/10">
            {/* PHONE CHIP */}
            <a
              href="tel:+917559034444"
              className="group inline-flex items-center gap-2 sm:gap-3.5 transition-colors hover:text-cyan-100"
            >
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-[#0066B4] shadow-md border border-white/15">
                <Phone size={14} className="sm:w-[17px] sm:h-[17px]" />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/50">
                  Phone
                </span>
                <span className="text-[11px] sm:text-sm font-semibold text-white">
                  +91 75590 34444
                </span>
              </div>
            </a>

            {/* LOCATION CHIP */}
            <div className="group flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white backdrop-blur-sm border border-white/15 shadow-md">
                <MapPin size={14} className="sm:w-[17px] sm:h-[17px]" />
              </div>
              <div className="text-right">
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/50">
                  Location
                </span>
                <span className="text-[10px] sm:text-xs text-white/90 font-medium">
                  Puthiyatheru, Kannur
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            3. BOTTOM ROW: ONSET INFRA LETTER BY LETTER
        ======================================================== */}
        <div className="relative z-10 w-full overflow-hidden pb-1 sm:pb-3 select-none">
          <div className="flex w-full items-baseline justify-start gap-2.5 sm:gap-4 md:gap-5 lg:gap-7 font-sans font-black uppercase tracking-tighter text-white">
            {/* WORD 1: ONSET */}
            <div className="flex">
              {wordOnset.map((char, i) => (
                <motion.span
                  key={`onset-${i}`}
                  initial={{ opacity: 0, y: 50, scale: 0.92 }}
                  animate={
                    isRevealed
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 50, scale: 0.92 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block transform-gpu text-[10vw] sm:text-[11vw] md:text-[12.2vw] lg:text-[13.4vw] xl:text-[13.7vw] leading-[0.82] drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* WORD 2: INFRA */}
            <div className="flex text-cyan-100">
              {wordInfra.map((char, i) => (
                <motion.span
                  key={`infra-${i}`}
                  initial={{ opacity: 0, y: 50, scale: 0.92 }}
                  animate={
                    isRevealed
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 50, scale: 0.92 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + (wordOnset.length + i) * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block transform-gpu text-[10vw] sm:text-[11vw] md:text-[12.2vw] lg:text-[13.4vw] xl:text-[13.7vw] leading-[0.82] drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
