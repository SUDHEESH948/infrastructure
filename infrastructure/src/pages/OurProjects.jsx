
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Route,
  Map,
  HardHat,
  X,
} from "lucide-react";

import roadImage from "../assets/hero.png";

const projects = [
  {
    id: "01",
    category: "Infrastructure",
    title: "Road & Highway Development",
    description:
      "Infrastructure planning, road development, access coordination, and construction solutions for transportation projects.",
    location: "Kerala",
    icon: Route,
    image: roadImage,
  },
  {
    id: "02",
    category: "Construction",
    title: "Building Construction",
    description:
      "Professional construction solutions covering planning, civil works, coordination, and project execution.",
    location: "Kannur",
    icon: Building2,
    image: roadImage,
  },
  {
    id: "03",
    category: "Surveying",
    title: "Land & Site Survey",
    description:
      "Accurate surveying and site assessment supporting development, planning, construction, and property requirements.",
    location: "Kerala",
    icon: Map,
    image: roadImage,
  },
  {
    id: "04",
    category: "Project Management",
    title: "Infrastructure Project Management",
    description:
      "End-to-end coordination, planning, monitoring, quality control, and delivery for infrastructure projects.",
    location: "Kannur",
    icon: HardHat,
    image: roadImage,
  },
  {
    id: "05",
    category: "Infrastructure",
    title: "NHAI Access & Development",
    description:
      "Professional assistance for developments requiring highway access coordination, documentation, and approvals.",
    location: "Kerala",
    icon: Route,
    image: roadImage,
  },
  {
    id: "06",
    category: "Consultancy",
    title: "Estimation & Valuation",
    description:
      "Construction estimation and property valuation support for residential, commercial, and development projects.",
    location: "Kerala",
    icon: Building2,
    image: roadImage,
  },
];

const categories = [
  "All",
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
  "Consultancy",
];

const OurProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <main className="min-h-screen bg-white text-[#17221D]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F5F9FC] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0066B4]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                Our Projects
              </span>
            </div>

            <h1 className="max-w-6xl font-serif text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Projects that
              <br />

              <span className="text-[#0066B4]">
                shape places.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              Explore the range of infrastructure, construction,
              surveying, and project management capabilities
              delivered by ONSET INFRA.
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute -right-10 bottom-0 select-none font-serif text-[180px] font-light leading-none text-[#0066B4]/[0.04] md:text-[280px]">
          03
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="flex flex-col gap-8 border-b border-[#0066B4]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#0066B4]">
                Selected Work
              </span>

              <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">
                Our work
              </h2>
            </div>

            {/* FILTERS */}

            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    whitespace-nowrap
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    transition-all
                    duration-300
                    ${
                      activeCategory === category
                        ? "border-[#0066B4] bg-[#0066B4] text-white"
                        : "border-[#0066B4]/15 bg-white text-[#0066B4]/70 hover:border-[#0066B4]/40 hover:text-[#0066B4]"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECT GRID */}

          <motion.div
            layout
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const Icon = project.icon;

                return (
                  <motion.article
                    layout
                    key={project.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="
                      group
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-[#0066B4]/10
                      bg-white
                      shadow-[0_12px_40px_rgba(0,102,180,0.05)]
                      transition-shadow
                      duration-500
                      hover:shadow-[0_25px_65px_rgba(0,102,180,0.14)]
                    "
                  >
                    {/* IMAGE */}

                    <div className="relative h-[260px] overflow-hidden bg-[#EAF2F7]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0066B4]/70 via-transparent to-transparent" />

                      {/* NUMBER */}

                      <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[#0066B4] shadow-lg backdrop-blur-md">
                        {project.id}
                      </div>

                      {/* ICON */}

                      <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#0066B4] shadow-xl backdrop-blur-md">
                        <Icon size={21} strokeWidth={1.7} />
                      </div>

                      {/* LOCATION */}

                      <span className="absolute bottom-6 right-5 text-[10px] uppercase tracking-[0.2em] text-white/80">
                        {project.location}
                      </span>
                    </div>

                    {/* CONTENT */}

                    <div className="p-6">

                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0066B4]/60">
                        {project.category}
                      </span>

                      <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-[#17221D] transition-colors duration-300 group-hover:text-[#0066B4]">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {project.description}
                      </p>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="
                          mt-6
                          flex
                          items-center
                          gap-2
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-[#0066B4]
                        "
                      >
                        View Details
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </button>
                    </div>

                    {/* BOTTOM LINE */}

                    <div className="h-[3px] w-full origin-left scale-x-0 bg-[#0066B4] transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          BLUE CTA
      ===================================================== */}

      <section className="bg-[#0066B4] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">

            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                Your Next Project
              </span>

              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight md:text-6xl">
                Let's turn your
                <br />
                vision into reality.
              </h2>
            </div>

            <div className="lg:flex lg:justify-end">
              <a
                href="/contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-medium
                  text-[#0066B4]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                Start a Project
                <ArrowUpRight size={17} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17221D]/70 px-5 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-3xl
                overflow-auto
                rounded-[30px]
                bg-white
                shadow-2xl
              "
            >

              {/* CLOSE */}

              <button
                onClick={() => setSelectedProject(null)}
                className="
                  absolute
                  right-5
                  top-5
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-[#0066B4]
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  hover:bg-[#0066B4]
                  hover:text-white
                "
                aria-label="Close"
              >
                <X size={19} />
              </button>

              {/* MODAL IMAGE */}

              <div className="h-[280px] overflow-hidden md:h-[360px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* MODAL CONTENT */}

              <div className="p-7 md:p-10">

                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                  {selectedProject.category}
                </span>

                <h2 className="mt-3 font-serif text-3xl font-light md:text-5xl">
                  {selectedProject.title}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                  {selectedProject.description}
                </p>

                <div className="mt-8 flex items-center gap-3 border-t border-[#0066B4]/10 pt-6">
                  <Map size={18} className="text-[#0066B4]" />

                  <span className="text-sm text-slate-500">
                    Project Location:{" "}
                    <strong className="font-medium text-[#17221D]">
                      {selectedProject.location}
                    </strong>
                  </span>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default OurProjects;

