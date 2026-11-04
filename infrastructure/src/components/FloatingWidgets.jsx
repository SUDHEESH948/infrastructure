import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/917559034444?text=Hello%20ONSET%20INFRA,%20I%20would%20like%20to%20inquire%20about%20your%20services.";
const FACEBOOK_URL = "https://facebook.com";
const INSTAGRAM_URL = "https://instagram.com";

// Particle directions for bubble burst (compact radial scatter)
const BURST_PARTICLES = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    id: i,
    dx: Math.cos(angle) * (12 + (i % 2) * 5),
    dy: Math.sin(angle) * (12 + (i % 2) * 5),
    size: i % 2 === 0 ? 4 : 2.5,
    color:
      i % 3 === 0
        ? "#1877F2" // Facebook blue
        : i % 3 === 1
        ? "#E1306C" // Instagram magenta
        : "#FCAF45", // Warm glow
  };
});

const FloatingWidgets = () => {
  // Accessibility check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  // DOM refs for direct 60fps GPU transform updates (zero unnecessary React re-renders)
  const fbRef = useRef(null);
  const igRef = useRef(null);

  // Physics animation state kept in refs for smooth animation frame updates
  // Compact travel distance so the gap between logos is small and they rebound together quickly
  const physicsRef = useRef({
    y1: 6, // Facebook position
    y2: 70, // Instagram position
    v1: 0.8, // Facebook velocity
    v2: -0.8, // Instagram velocity
    squash1: 1, // Facebook vertical scale
    squash2: 1, // Instagram vertical scale
    lastCollision: 0,
    animId: null,
  });

  // Compact track dimensions: keeps logos close together with minimal gap
  const trackHeight = isMobile ? 115 : 128;
  const iconSize = isMobile ? 40 : 46;
  const minY = 0;
  const maxY = trackHeight - iconSize;

  // Responsive & accessibility listener
  useEffect(() => {
    const checkMedia = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMedia();
    window.addEventListener("resize", checkMedia);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const motionHandler = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    return () => {
      window.removeEventListener("resize", checkMedia);
      motionQuery.removeEventListener("change", motionHandler);
    };
  }, []);

  // Spawn collision bubble effect
  const spawnBubble = useCallback((collisionY) => {
    const id = Date.now() + Math.random();
    setBubbles((prev) => [...prev.slice(-2), { id, y: collisionY }]);

    // Auto cleanup bubble after animation finishes (600ms)
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 600);
  }, []);

  // Main 60fps physics & collision loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 1.8);
      lastTime = now;

      const p = physicsRef.current;

      // Relax squash/stretch back towards 1.0 smoothly
      p.squash1 += (1 - p.squash1) * 0.18;
      p.squash2 += (1 - p.squash2) * 0.18;

      if (!isHovered) {
        // Advance positions
        p.y1 += p.v1 * dt;
        p.y2 += p.v2 * dt;

        // Bounce off top and bottom boundaries of the compact track
        if (p.y1 <= minY) {
          p.y1 = minY;
          p.v1 = Math.abs(p.v1);
        } else if (p.y1 >= maxY) {
          p.y1 = maxY;
          p.v1 = -Math.abs(p.v1);
        }

        if (p.y2 <= minY) {
          p.y2 = minY;
          p.v2 = Math.abs(p.v2);
        } else if (p.y2 >= maxY) {
          p.y2 = maxY;
          p.v2 = -Math.abs(p.v2);
        }

        // Collision detection between Facebook and Instagram
        const dist = Math.abs(p.y1 - p.y2);
        const collisionThreshold = iconSize - 2;

        if (dist <= collisionThreshold && now - p.lastCollision > 450) {
          p.lastCollision = now;

          // Elastic collision bounce: immediately redirect them to rebound
          if (p.y1 < p.y2) {
            p.v1 = -Math.abs(p.v1);
            p.v2 = Math.abs(p.v2);
          } else {
            p.v1 = Math.abs(p.v1);
            p.v2 = -Math.abs(p.v2);
          }

          // Elastic collision squash effect
          p.squash1 = 0.85;
          p.squash2 = 0.85;

          // Midpoint for bubble particle
          const midY = (p.y1 + p.y2) / 2 + iconSize / 2;
          spawnBubble(midY);
        }
      }

      // Apply transforms directly via hardware acceleration
      if (fbRef.current) {
        const sx = 2 - p.squash1;
        fbRef.current.style.transform = `translate3d(0, ${p.y1}px, 0) scale(${sx}, ${p.squash1})`;
      }
      if (igRef.current) {
        const sx = 2 - p.squash2;
        igRef.current.style.transform = `translate3d(0, ${p.y2}px, 0) scale(${sx}, ${p.squash2})`;
      }

      p.animId = requestAnimationFrame(updatePhysics);
    };

    physicsRef.current.animId = requestAnimationFrame(updatePhysics);

    return () => {
      if (physicsRef.current.animId) {
        cancelAnimationFrame(physicsRef.current.animId);
      }
    };
  }, [prefersReducedMotion, isHovered, maxY, iconSize, spawnBubble]);

  return (
    <>
      {/* =========================================================
          1. FLOATING SOCIAL TRACK (FACEBOOK & INSTAGRAM WITH COLLISION)
          Positioned vertically on the right edge, hovering close above WhatsApp
      ========================================================= */}
      <div
        className="fixed right-4 sm:right-6 bottom-[68px] sm:bottom-[78px] z-40 flex flex-col items-center pointer-events-none select-none"
        style={{
          height: `${trackHeight}px`,
          width: isMobile ? "44px" : "50px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* COLLISION BUBBLE PARTICLES */}
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-30"
              style={{ top: `${bubble.y}px` }}
            >
              {/* Expanding Glass Bubble */}
              <motion.div
                initial={{ scale: 0.1, opacity: 0.9 }}
                animate={{
                  scale: [0.1, 1.2, 1.35],
                  opacity: [0.9, 0.95, 0],
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative -ml-3.5 -mt-3.5 h-7 w-7 rounded-full border border-white/70 bg-gradient-to-tr from-white/40 via-pink-400/25 to-sky-400/35 backdrop-blur-[2px] shadow-[0_0_12px_rgba(225,48,108,0.45)]"
              >
                {/* Specular Highlight dot */}
                <div className="absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-white/90 shadow-sm" />
              </motion.div>

              {/* Burst Tiny Particles */}
              {BURST_PARTICLES.map((pt) => (
                <motion.span
                  key={pt.id}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{
                    x: pt.dx,
                    y: pt.dy,
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
                  style={{
                    backgroundColor: pt.color,
                    width: `${pt.size}px`,
                    height: `${pt.size}px`,
                  }}
                  className="absolute left-0 top-0 -ml-1 -mt-1 rounded-full shadow-sm"
                />
              ))}

              {/* Micro Ripple Ring */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0.8 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-cyan-300/60"
              />
            </div>
          ))}
        </AnimatePresence>

        {/* -------------------------------------------------------
            FACEBOOK FLOATING BUTTON
        ------------------------------------------------------- */}
        <div
          ref={fbRef}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            top: prefersReducedMotion ? "5px" : 0,
          }}
          className={`absolute left-0 pointer-events-auto will-change-transform ${
            prefersReducedMotion ? "relative" : ""
          }`}
        >
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow ONSET INFRA on Facebook"
            className="group relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#1877F2] to-[#0D65D9] text-white shadow-lg shadow-[#1877F2]/40 transition-transform duration-200 hover:scale-110 active:scale-95 border border-white/20"
          >
            {/* Subtle internal shine */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/30" />

            {/* Official Facebook 'f' SVG */}
            <svg
              className="relative z-10 h-5 w-5 fill-white drop-shadow-sm transition-transform duration-200 group-hover:rotate-6"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>

            {/* Tooltip on Hover */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
              Facebook
            </span>
          </a>
        </div>

        {/* -------------------------------------------------------
            INSTAGRAM FLOATING BUTTON
        ------------------------------------------------------- */}
        <div
          ref={igRef}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            top: prefersReducedMotion ? "55px" : 0,
          }}
          className={`absolute left-0 pointer-events-auto will-change-transform ${
            prefersReducedMotion ? "relative" : ""
          }`}
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow ONSET INFRA on Instagram"
            className="group relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg shadow-[#dc2743]/40 transition-transform duration-200 hover:scale-110 active:scale-95 border border-white/20"
          >
            {/* Subtle internal shine */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/30" />

            {/* Official Instagram Camera SVG */}
            <svg
              className="relative z-10 h-5 w-5 fill-white drop-shadow-sm transition-transform duration-200 group-hover:rotate-6"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>

            {/* Tooltip on Hover */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
              Instagram
            </span>
          </a>
        </div>
      </div>

      {/* =========================================================
          2. FLOATING WHATSAPP BUTTON (ANCHORED AT BOTTOM RIGHT)
      ========================================================= */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ONSET INFRA on WhatsApp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] active:scale-95 border border-white/20"
        >
          {/* Ambient pulse ring */}
          <span className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping" />

          {/* WhatsApp Icon */}
          <svg
            className="relative z-10 h-6 w-6 sm:h-7 sm:w-7 fill-current drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
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
    </>
  );
};

export default FloatingWidgets;
