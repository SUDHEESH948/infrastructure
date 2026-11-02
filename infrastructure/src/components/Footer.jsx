import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

// Individual letters for staggered reveal
const wordOnset = ["O", "N", "S", "E", "T"];
const wordInfra = ["I", "N", "F", "R", "A"];

// Animation variants
const logoVariants = {
  hidden: { opacity: 0, scale: 0.65, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const brandContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const phoneVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      delay: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const locationVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      delay: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bottomStripVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 1.05,
    },
  },
};

const Footer = () => {
  const footerRef = useRef(null);
  const spacerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Measure dynamic footer height for the natural document flow spacer
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

  // Trigger branding animation when footer scrolls into view
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
        style={{ height: footerHeight ? `${footerHeight}px` : "auto" }}
        className="w-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 
        FIXED CINEMATIC FOOTER LAYER:
        Stationed at the bottom of the viewport behind main content (z-0).
        Remains hidden until the main content is scrolled upward.
      */}
      <footer
        id="footer"
        ref={footerRef}
        style={{
          pointerEvents: isRevealed ? "auto" : "none",
        }}
        className="fixed bottom-0 left-0 right-0 w-full z-0 overflow-hidden bg-[#0066B4] text-white"
      >
        {/* SUBTLE CIRCULAR DECORATIVE OUTLINE */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-12">
          {/* COMPACT MAIN ROW */}
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3">
                {/* 1. ANIMATED WHITE OI LOGO IN ROUNDED SQUARE */}
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate={isRevealed ? "visible" : "hidden"}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white font-bold text-[#0066B4] shadow-md ring-1 ring-white/30 sm:h-12 sm:w-12"
                >
                  <span className="text-base font-extrabold tracking-tight text-[#0066B4] sm:text-lg">
                    OI
                  </span>
                </motion.div>

                <div>
                  {/* 2. ONSET INFRA STAGGERED LETTER ANIMATION */}
                  <motion.h2
                    variants={brandContainerVariants}
                    initial="hidden"
                    animate={isRevealed ? "visible" : "hidden"}
                    className="flex items-center text-lg font-bold tracking-wider text-white select-none sm:text-xl"
                  >
                    <span className="mr-2 flex">
                      {wordOnset.map((char, i) => (
                        <motion.span
                          key={`onset-${i}`}
                          variants={letterVariants}
                          className="inline-block transform-gpu"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                    <span className="flex">
                      {wordInfra.map((char, i) => (
                        <motion.span
                          key={`infra-${i}`}
                          variants={letterVariants}
                          className="inline-block transform-gpu"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </motion.h2>

                  {/* 3. ENGINEERS AND INTERIOR DESIGNERS SUBTITLE */}
                  <motion.p
                    variants={subtitleVariants}
                    initial="hidden"
                    animate={isRevealed ? "visible" : "hidden"}
                    className="text-[10px] uppercase tracking-widest text-white/70"
                  >
                    Engineers and Interior Designers
                  </motion.p>
                </div>
              </div>

              {/* 4. COMPANY DESCRIPTION */}
              <motion.p
                variants={descriptionVariants}
                initial="hidden"
                animate={isRevealed ? "visible" : "hidden"}
                className="mt-3 max-w-sm text-xs leading-5 text-white/80"
              >
                Building &amp; road contractors, interior designers, modular
                kitchens, statutory permits, Airport NOC, GPS surveying,
                renovation, and 3D visualization.
              </motion.p>
            </div>

            {/* CONTACT INFO (INLINE) */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              {/* PHONE */}
              <motion.a
                variants={phoneVariants}
                initial="hidden"
                animate={isRevealed ? "visible" : "hidden"}
                href="tel:+917559034444"
                className="group flex items-center gap-3 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-[#0066B4]">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-white/50">
                    Phone
                  </span>
                  <span className="text-xs font-medium text-white">
                    +91 75590 34444
                  </span>
                </div>
              </motion.a>

              {/* LOCATION */}
              <motion.div
                variants={locationVariants}
                initial="hidden"
                animate={isRevealed ? "visible" : "hidden"}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-white/50">
                    Location
                  </span>
                  <span className="text-xs text-white/80">
                    Puthiyatheru, Kannur - 670011
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* BOTTOM STRIP */}
          <motion.div
            variants={bottomStripVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
            className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs sm:flex-row"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              &copy; {new Date().getFullYear()} ONSET INFRA &bull; Engineers and
              Interior Designers. All rights reserved.
            </p>

            <Link
              to="/admin"
              className="text-[11px] font-medium text-white/50 transition-colors hover:text-white"
            >
              Admin Portal
            </Link>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
