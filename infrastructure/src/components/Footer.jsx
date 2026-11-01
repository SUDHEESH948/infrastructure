import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#0066B4] text-white">
      {/* SUBTLE BACKGROUND ACCENT */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-12">
        {/* COMPACT MAIN ROW */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-bold text-[#0066B4] shadow-md">
                OI
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-wider">
                  ONSET INFRA
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-white/70">
                  Engineers and Interior Designers
                </p>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/80">
              Building &amp; road contractors, interior designers, modular kitchens, statutory permits, Airport NOC, GPS surveying, renovation, and 3D visualization.
            </p>
          </div>

          {/* CONTACT INFO (INLINE) */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            {/* PHONE */}
            <a
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
            </a>

            {/* LOCATION */}
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs sm:flex-row">
          <p className="text-[10px] uppercase tracking-widest text-white/50">
            © {new Date().getFullYear()} ONSET INFRA &bull; Engineers and Interior Designers. All rights reserved.
          </p>

          <Link
            to="/admin"
            className="text-[11px] font-medium text-white/50 transition-colors hover:text-white"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
