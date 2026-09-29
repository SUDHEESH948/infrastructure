
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo/onsite infra.png";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  /* =====================================================
     SCROLL LISTENER
  ===================================================== */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ===================================================== */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* =====================================================
     CLOSE MENU
  ===================================================== */
  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =====================================================
     HOME
  ===================================================== */
  const handleHome = () => {
    closeMenu();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =====================================================
     NAV LINK CLASS
  ===================================================== */
  const navClass = (path) => `
    rounded-full
    px-5
    py-2
    text-sm
    font-medium
    transition-all
    duration-300
    ${
      location.pathname === path
        ? "bg-[#0066B4] text-white shadow-sm"
        : "text-[#0066B4]/80 hover:bg-[#0066B4]/10 hover:text-[#0066B4]"
    }
  `;

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-[100] w-full">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-4 md:px-8 md:pt-5">

        {/* =================================================
            NAVBAR
        ================================================= */}
        <nav
          className={`
            pointer-events-auto
            flex
            items-center
            justify-between
            rounded-full
            border
            border-white/60
            px-4
            py-2
            transition-all
            duration-300
            sm:px-5
            sm:py-2.5
            md:px-7
            md:py-2.5
            ${
              isScrolled
                ? "bg-white/95 shadow-[0_10px_30px_rgba(0,102,180,0.14)] backdrop-blur-xl"
                : "bg-white/85 shadow-[0_6px_25px_rgba(0,0,0,0.08)] backdrop-blur-lg"
            }
          `}
        >

          {/* LOGO */}
          <Link
            to="/"
            onClick={handleHome}
            className="group flex shrink-0 items-center"
          >
            <img
              src={logo}
              alt="Onset Infra"
              className="
                h-8
                w-auto
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
                sm:h-9
                md:h-11
                lg:h-12
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <div className="hidden items-center gap-1 md:flex">

            <Link
              to="/"
              onClick={handleHome}
              className={navClass("/")}
            >
              Home
            </Link>

            <Link
              to="/services"
              onClick={closeMenu}
              className={navClass("/services")}
            >
              Services
            </Link>

            <Link
              to="/projects"
              onClick={closeMenu}
              className={navClass("/projects")}
            >
              Projects
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className={navClass("/about")}
            >
              About
            </Link>
          </div>

          {/* =================================================
              DESKTOP CTA
          ================================================= */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="
              hidden
              items-center
              gap-1.5
              rounded-full
              bg-[#0066B4]
              px-5
              py-2.5
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-white
              shadow-sm
              shadow-[#0066B4]/25
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:bg-[#00528F]
              md:flex
            "
          >
            Start a Project
            <ArrowUpRight size={15} />
          </Link>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#0066B4]/20
              bg-[#0066B4]/10
              text-[#0066B4]
              transition-all
              duration-300
              hover:bg-[#0066B4]
              hover:text-white
              md:hidden
            "
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* =================================================
            MOBILE MENU
        ================================================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="
                pointer-events-auto
                mt-2
                overflow-hidden
                rounded-3xl
                border
                border-white/70
                bg-white/95
                p-5
                text-[#0066B4]
                shadow-[0_15px_45px_rgba(0,102,180,0.15)]
                backdrop-blur-2xl
                md:hidden
              "
            >
              <div className="flex flex-col">

                {/* HOME */}
                <Link
                  to="/"
                  onClick={handleHome}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#0066B4]/10
                    py-3.5
                    text-base
                    font-medium
                    transition-all
                    hover:pl-2
                  "
                >
                  <span>Home</span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#0066B4]/50"
                  />
                </Link>

                {/* SERVICES */}
                <Link
                  to="/services"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#0066B4]/10
                    py-3.5
                    text-base
                    font-medium
                    transition-all
                    hover:pl-2
                  "
                >
                  <span>Services</span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#0066B4]/50"
                  />
                </Link>

                {/* PROJECTS */}
                <Link
                  to="/projects"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#0066B4]/10
                    py-3.5
                    text-base
                    font-medium
                    transition-all
                    hover:pl-2
                  "
                >
                  <span>Projects</span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#0066B4]/50"
                  />
                </Link>

                {/* ABOUT */}
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#0066B4]/10
                    py-3.5
                    text-base
                    font-medium
                    transition-all
                    hover:pl-2
                  "
                >
                  <span>About</span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#0066B4]/50"
                  />
                </Link>

                {/* CONTACT */}
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#0066B4]
                    py-3
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                    shadow-md
                    shadow-[#0066B4]/25
                    transition-all
                    duration-300
                    hover:bg-[#00528F]
                  "
                >
                  Contact Us
                  <ArrowUpRight size={16} />
                </Link>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navigation;

