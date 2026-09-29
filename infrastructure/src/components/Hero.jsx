import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import roadVideo from "../assets/road.mp4";
import homeVideo from "../assets/home.mp4";

const slides = [
  {
    video: roadVideo,
    eyebrow: "INFRASTRUCTURE • ENGINEERING",
    quote: "Building the roads that move tomorrow.",
    description:
      "Precision-driven infrastructure designed to connect communities, cities, and opportunities.",
  },
  {
    video: homeVideo,
    eyebrow: "ARCHITECTURE • CONSTRUCTION",
    quote: "Spaces built for the way we live.",
    description:
      "Thoughtful architecture and disciplined construction brought together to create lasting spaces.",
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const slide = slides[current];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen h-[100dvh] w-full overflow-hidden bg-slate-950"
    >
      {/* 100VH FULL BLEED VIDEO BACKGROUND */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.video
            key={slide.video}
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={nextSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-[100dvh] w-screen min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          >
            <source src={slide.video} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-[#0066B4]/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />

      {/* HERO CONTENT */}
      <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-10 lg:px-16 pt-24 pb-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            {/* EYEBROW */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`eyebrow-${current}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-white/70" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
                  {slide.eyebrow}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* QUOTE / HEADING */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`quote-${current}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {slide.quote}
              </motion.h1>
            </AnimatePresence>

            {/* DESCRIPTION */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`description-${current}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}
                className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0066B4] shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100"
              >
                Explore Projects
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0066B4]"
              >
                Start a Project
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;