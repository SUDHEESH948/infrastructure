import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MapPin,
  ArrowUp,
  Mail,
  Check,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import logo from "../assets/logo/onsite infra.png";

// Letters for unified staggered cinematic reveal
const wordOnset = ["O", "N", "S", "E", "T"];
const wordInfra = ["I", "N", "F", "R", "A"];

// Framer Motion Animation Variants
const footerVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const brandContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 35,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.9,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3500);
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Selected Projects", to: "/projects" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <motion.footer
      id="footer"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className="relative overflow-hidden bg-gradient-to-b from-[#005599] via-[#0066B4] to-[#003d73] text-white shadow-[0_-25px_60px_rgba(0,102,180,0.18)]"
    >
      {/* SOPHISTICATED AMBIENT BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-white/[0.04] blur-[80px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-400/[0.06] blur-[80px]" />

      {/* SUBTLE ARCHITECTURAL GRID PATTERN */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
        {/* ========================================================
            CINEMATIC HERO BRAND REVEAL CENTERPIECE
        ======================================================== */}
        <motion.div
          variants={brandContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 border-b border-white/15 pb-10 md:mb-14 md:pb-12"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* ANIMATED LOGO EMBLEM */}
              <motion.div
                variants={logoVariants}
                className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-2xl ring-2 ring-white/40 transition-transform duration-500 hover:scale-105 sm:h-20 sm:w-20 sm:rounded-3xl sm:p-3.5 md:h-24 md:w-24"
              >
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl" />
                <img
                  src={logo}
                  alt="ONSET INFRA Logo"
                  className="relative z-10 h-full w-full object-contain drop-shadow"
                />
              </motion.div>

              {/* STAGGERED CINEMATIC LETTERS */}
              <div className="flex flex-col">
                <h1 className="flex flex-wrap font-sans text-4xl font-black uppercase tracking-tight text-white leading-none sm:text-6xl md:text-7xl lg:text-8xl">
                  {/* WORD 1: ONSET */}
                  <span className="mr-3 flex sm:mr-5">
                    {wordOnset.map((char, i) => (
                      <motion.span
                        key={`onset-${i}`}
                        variants={letterVariants}
                        className="inline-block transform-gpu select-none drop-shadow-md"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>

                  {/* WORD 2: INFRA */}
                  <span className="flex text-cyan-200">
                    {wordInfra.map((char, i) => (
                      <motion.span
                        key={`infra-${i}`}
                        variants={letterVariants}
                        className="inline-block transform-gpu select-none drop-shadow-md"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                {/* SUBTITLE */}
                <motion.div
                  variants={subtitleVariants}
                  className="mt-3 flex items-center gap-3"
                >
                  <span className="h-px w-8 bg-cyan-300" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/85 sm:text-xs">
                    Engineers &bull; Contractors &bull; Interior Designers
                  </p>
                </motion.div>
              </div>
            </div>

            {/* BRAND ETHOS BADGE */}
            <motion.div
              variants={subtitleVariants}
              className="hidden max-w-xs flex-col items-end text-right lg:flex"
            >
              <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200 backdrop-blur-sm">
                Infrastructure Excellence
              </span>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                Building tomorrow&apos;s landmarks with structural precision and
                bespoke architectural craftsmanship.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================
            NAVIGATION, DESCRIPTION & NEWSLETTER FORM
        ======================================================== */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* BRAND DESCRIPTION & NAVIGATION LINKS */}
          <div className="space-y-6 lg:col-span-6">
            <p className="max-w-md text-xs font-light leading-relaxed text-white/85 sm:text-sm">
              Pioneering comprehensive building &amp; road contracting, luxury
              interior design, modular spaces, statutory local permits, Airport
              NOC, precision GPS surveying, and photorealistic 3D visualization.
            </p>

            {/* QUICK NAVIGATION LINKS WITH ANIMATED UNDERLINE HIGHLIGHTS */}
            <nav
              className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-1"
              aria-label="Footer Navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={scrollToTop}
                  className="group relative inline-flex items-center py-1 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-cyan-200 transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* NEWSLETTER / FORM CONTROLS WITH CLEAN MICRO-INTERACTIONS */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-xl md:p-8 lg:col-span-6">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-4 translate-x-4 rounded-full bg-white/5 blur-xl" />

            <div className="mb-5">
              <span className="mb-2.5 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200">
                Stay Connected
              </span>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                Receive engineering updates &amp; design insights
              </h3>
              <p className="mt-1 text-xs text-white/75">
                Join our newsletter for featured infrastructure releases, design
                trends, and permit guides.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative">
              <div
                className={`relative flex flex-col gap-3 rounded-2xl transition-all duration-300 sm:flex-row sm:items-center ${
                  isFocused ? "ring-2 ring-white/60" : ""
                }`}
              >
                <div className="relative flex-1">
                  <Mail
                    size={17}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      isFocused ? "text-white" : "text-white/60"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full rounded-2xl border border-white/30 bg-white/10 py-3.5 pl-11 pr-4 text-xs text-white placeholder-white/50 shadow-inner backdrop-blur-md transition-all duration-300 focus:border-white focus:bg-white/20 focus:outline-none focus:ring-0"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubscribed}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 ${
                    isSubscribed
                      ? "bg-emerald-500 text-white shadow-emerald-500/30"
                      : "bg-white text-[#0066B4] hover:bg-slate-50 hover:shadow-xl"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubscribed ? (
                      <motion.span
                        key="subbed"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check size={15} className="stroke-[3]" />
                        <span>Subscribed!</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sub"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <span>Subscribe</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* ========================================================
            CONTACT INFO CHIPS & BACK TO TOP
        ======================================================== */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* PHONE CHIP */}
            <a
              href="tel:+917559034444"
              className="group flex items-center gap-3.5 transition-all duration-300 hover:translate-x-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#0066B4] group-hover:shadow-lg">
                <Phone
                  size={17}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Direct Line
                </span>
                <span className="text-xs font-semibold text-white transition-colors duration-200 sm:text-sm">
                  +91 75590 34444
                </span>
              </div>
            </a>

            {/* LOCATION CHIP */}
            <div className="group flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition-all duration-300 group-hover:bg-white/20">
                <MapPin
                  size={17}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Headquarters
                </span>
                <span className="text-xs font-medium text-white/90 sm:text-sm">
                  Puthiyatheru, Kannur - 670011
                </span>
              </div>
            </div>
          </div>

          {/* BACK TO TOP BUTTON */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white shadow-md backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0066B4] hover:shadow-xl"
            title="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </motion.button>
        </div>

        {/* ========================================================
            BOTTOM COPYRIGHT STRIP
        ======================================================== */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p className="text-center text-[11px] font-medium uppercase tracking-widest text-white/60 sm:text-left">
            &copy; {new Date().getFullYear()} ONSET INFRA &bull; Engineers and
            Interior Designers. All rights reserved.
          </p>

          <Link
            to="/admin"
            className="group relative inline-flex items-center gap-1.5 py-1 text-[11px] font-semibold text-white/70 transition-colors duration-300 hover:text-white"
          >
            <ShieldCheck size={14} className="text-cyan-200" />
            <span>Admin Portal</span>
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
