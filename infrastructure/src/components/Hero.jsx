import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import interiorVideo from "../assets/introe.mp4";

const slides = [
  {
    video: interiorVideo,
    eyebrow: "INTERIOR DESIGN • ARCHITECTURE",
    quote: "Designing spaces that inspire everyday living.",
    description:
      "Thoughtfully crafted interiors that blend modern aesthetics, functionality, and comfort to create beautiful spaces.",
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
      className="relative min-h-[100dvh] h-[100dvh] w-full overflow-hidden bg-slate-950"
    >
      {/* FULL BLEED RESPONSIVE VIDEO BACKGROUND */}
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
            className="absolute left-1/2 top-1/2 min-h-full min-w-full h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          >
            <source src={slide.video} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex h-full min-h-[100dvh] w-full items-center px-4 sm:px-10 lg:px-16 pt-20 pb-12 sm:pt-24 sm:pb-20">
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
                className="mb-3 sm:mb-5 flex items-center gap-2 sm:gap-3"
              >
                <span className="h-px w-5 sm:w-8 bg-white/70 shrink-0" />

                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-white/90">
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
                className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.12] sm:leading-[1.05] tracking-tight text-white"
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
                className="mt-3 sm:mt-6 max-w-xl text-xs sm:text-base md:text-lg leading-relaxed text-white/80 line-clamp-3 sm:line-clamp-none"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#0066B4] shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100"
              >
                Explore Projects
                <ArrowUpRight size={15} className="sm:size-[17px]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0066B4]"
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
