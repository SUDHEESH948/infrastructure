import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  ArrowUp,
  Mail,
  Check,
  ArrowRight,
} from "lucide-react";
import logo from "../assets/logo/onsite infra.png";

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
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden bg-[#0066B4] text-white shadow-[0_-20px_50px_rgba(0,102,180,0.12)]"
    >
      {/* AMBIENT BACKGROUND ACCENTS */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full border border-white/10 bg-white/[0.02]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
        {/* MAIN ROW: BRAND & FORM CONTROLS */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-6">
            <Link
              to="/"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3.5 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-white/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-white/30">
                <img
                  src={logo}
                  alt="ONSET INFRA"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wider text-white">
                  ONSET INFRA
                </h2>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">
                  Engineers and Interior Designers
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-xs leading-relaxed text-white/80">
              Building &amp; road contractors, interior designers, modular
              kitchens, statutory permits, Airport NOC, GPS surveying,
              renovation, and 3D visualization.
            </p>

            {/* QUICK NAVIGATION LINKS WITH UNDERLINE HIGHLIGHTS */}
            <nav
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5"
              aria-label="Footer Navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={scrollToTop}
                  className="group relative inline-flex items-center py-0.5 text-xs font-medium text-white/80 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* FORM CONTROLS COLUMN (NEWSLETTER / QUICK INQUIRY) */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-inner backdrop-blur-md lg:col-span-6">
            <div className="mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
                Stay Connected
              </span>
              <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
                Receive engineering updates &amp; design insights
              </h3>
              <p className="mt-1 text-xs text-white/75">
                Join our newsletter for featured infrastructure releases and permit guides.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <div
                className={`relative flex flex-col gap-2.5 rounded-xl transition-all duration-300 sm:flex-row sm:items-center ${
                  isFocused ? "ring-2 ring-white/50" : ""
                }`}
              >
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      isFocused ? "text-white" : "text-white/50"
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
                    className="w-full rounded-xl border border-white/25 bg-white/10 py-3 pl-10 pr-4 text-xs text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:border-white focus:bg-white/20 focus:outline-none focus:ring-0"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubscribed}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wider shadow-md transition-all duration-300 ${
                    isSubscribed
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-[#0066B4] hover:bg-[#F0F7FD] hover:shadow-lg"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <Check size={14} className="stroke-[2.5]" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* CONTACT INFO CHIPS ROW */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* PHONE CHIP */}
            <a
              href="tel:+917559034444"
              className="group flex items-center gap-3 transition-transform duration-300 hover:translate-x-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#0066B4] group-hover:shadow-md">
                <Phone
                  size={15}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-white/50">
                  Phone
                </span>
                <span className="text-xs font-medium text-white transition-colors duration-200 group-hover:text-white/90">
                  +91 75590 34444
                </span>
              </div>
            </a>

            {/* LOCATION CHIP */}
            <div className="group flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white/20">
                <MapPin
                  size={15}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-white/50">
                  Location
                </span>
                <span className="text-xs text-white/80">
                  Puthiyatheru, Kannur - 670011
                </span>
              </div>
            </div>
          </div>

          {/* BACK TO TOP BUTTON */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0066B4]"
            title="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs sm:flex-row">
          <p className="text-[10px] uppercase tracking-widest text-white/50">
            © {new Date().getFullYear()} ONSET INFRA &bull; Engineers and Interior Designers. All rights reserved.
          </p>

          <Link
            to="/admin"
            className="group relative inline-flex items-center text-[11px] font-medium text-white/50 transition-colors duration-300 hover:text-white"
          >
            <span>Admin Portal</span>
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
