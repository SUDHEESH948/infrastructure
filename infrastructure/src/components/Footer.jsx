import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";

// Individual letters for staggered reveal of ONSET INFRA
const wordOnset = ["O", "N", "S", "E", "T"];
const wordInfra = ["I", "N", "F", "R", "A"];

// Framer motion variants
const brandContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.12,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Admin Portal", to: "/admin" },
  ];

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
        modern editorial headline, contact chips, and giant ONSET INFRA typography.
      */}
      <footer
        id="footer"
        ref={footerRef}
        style={{
          pointerEvents: isRevealed ? "auto" : "none",
        }}
        className="fixed bottom-0 left-0 right-0 w-full z-0 h-[82vh] min-h-[580px] max-h-[820px] bg-gradient-to-b from-[#005ea8] via-[#0066B4] to-[#004780] text-white flex flex-col justify-between overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16"
      >
        {/* SUBTLE AMBIENT LIGHTING OVERLAYS */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-3xl" />

        {/* ========================================================
            1. TOP ROW: COPYRIGHT ON LEFT, NAVIGATION ON RIGHT
        ======================================================== */}
        <div className="relative z-10 flex flex-col justify-between gap-3 border-b border-white/15 pb-4 pt-6 text-xs text-white/80 sm:flex-row sm:items-center sm:pb-5 sm:pt-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/70">
              &copy; {new Date().getFullYear()} ONSET INFRA
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
            <span className="hidden text-[11px] uppercase tracking-widest text-white/60 sm:inline-block">
              Engineers &bull; Interior Designers
            </span>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7"
            aria-label="Footer Quick Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={scrollToTop}
                className="group relative inline-flex items-center text-xs font-medium text-white/80 transition-colors duration-200 hover:text-white"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* ========================================================
            2. MIDDLE ROW: EDITORIAL STATEMENT & CONTACT DETAILS
        ======================================================== */}
        <motion.div
          variants={middleFadeVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
          className="relative z-10 my-auto flex flex-col justify-between gap-8 py-4 lg:flex-row lg:items-end"
        >
          {/* EDITORIAL HEADLINE (Modeled after "Effortless modern vehicle repair") */}
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Engineers and
              <br />
              <span className="font-sans font-normal text-cyan-100">
                interior designers.
              </span>
            </h2>
            <p className="mt-3.5 max-w-lg text-xs font-light leading-relaxed text-white/80 sm:text-sm">
              Building &amp; road contracting, bespoke interior design, modular
              kitchens, statutory permits, Airport NOC, precision GPS surveying,
              and 3D architectural visualization.
            </p>
          </div>

          {/* CONTACT & LOCATION CHIPS */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 lg:flex-col lg:items-end lg:gap-4">
            {/* PHONE CHIP */}
            <a
              href="tel:+917559034444"
              className="group flex items-center gap-3 transition-colors hover:text-cyan-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-[#0066B4]">
                <Phone size={15} />
              </div>
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-white/50">
                  Phone
                </span>
                <span className="text-xs font-semibold text-white sm:text-sm">
                  +91 75590 34444
                </span>
              </div>
            </a>

            {/* LOCATION CHIP */}
            <div className="group flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                <MapPin size={15} />
              </div>
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-white/50">
                  Location
                </span>
                <span className="text-xs text-white/80 sm:text-sm">
                  Puthiyatheru, Kannur - 670011
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            3. BOTTOM ROW: GIANT "ONSET INFRA" TYPOGRAPHY (Modeled after Kinetic>)
        ======================================================== */}
        <div className="relative z-10 w-full overflow-hidden pb-1 select-none sm:pb-2">
          <motion.div
            variants={brandContainerVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
            className="flex w-full items-baseline justify-between font-sans font-black uppercase tracking-tighter text-white"
          >
            {/* WORD 1: ONSET */}
            <div className="flex">
              {wordOnset.map((char, i) => (
                <motion.span
                  key={`onset-${i}`}
                  variants={letterVariants}
                  className="inline-block transform-gpu text-[13.5vw] leading-[0.84] drop-shadow-lg"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* SEPARATOR / ARROW EMBLEM */}
            <motion.span
              variants={letterVariants}
              className="inline-block transform-gpu text-[11vw] font-light leading-[0.84] text-cyan-200/80 px-1 sm:px-2"
            >
              /
            </motion.span>

            {/* WORD 2: INFRA */}
            <div className="flex text-cyan-100">
              {wordInfra.map((char, i) => (
                <motion.span
                  key={`infra-${i}`}
                  variants={letterVariants}
                  className="inline-block transform-gpu text-[13.5vw] leading-[0.84] drop-shadow-lg"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
