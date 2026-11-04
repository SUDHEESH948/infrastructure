
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Route,
  Map,
  HardHat,
  X,
} from "lucide-react";

import roadProjectImg from "../assets/projects/road-development.jpg";
import buildingProjectImg from "../assets/projects/building-construction.jpg";
import surveyProjectImg from "../assets/projects/land-site-survey.jpg";
import managementProjectImg from "../assets/projects/project-management.jpg";
import nhaiProjectImg from "../assets/projects/nhai-access.jpg";
import valuationProjectImg from "../assets/projects/estimation-valuation.jpg";
import { fetchProjectsFromAPI, fetchCategoriesByTypeAPI } from "../services/api";

const iconMap = {
  Route,
  Building2,
  Map,
  HardHat,
};

const imageMap = {
  "01": roadProjectImg,
  "02": buildingProjectImg,
  "03": surveyProjectImg,
  "04": managementProjectImg,
  "05": nhaiProjectImg,
  "06": valuationProjectImg,
};

const isVideoUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  return (
    url.match(/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i) !== null ||
    url.startsWith("data:video/")
  );
};

const defaultProjects = [
  {
    id: "01",
    category: "Infrastructure",
    title: "Road & Highway Development",
    description:
      "Infrastructure planning, road development, access coordination, and construction solutions for transportation projects.",
    location: "Kerala",
    icon: Route,
    image: roadProjectImg,
  },
  {
    id: "02",
    category: "Construction",
    title: "Building Construction",
    description:
      "Professional construction solutions covering planning, civil works, coordination, and project execution.",
    location: "Kannur",
    icon: Building2,
    image: buildingProjectImg,
  },
  {
    id: "03",
    category: "Surveying",
    title: "Land & Site Survey",
    description:
      "Accurate surveying and site assessment supporting development, planning, construction, and property requirements.",
    location: "Kerala",
    icon: Map,
    image: surveyProjectImg,
  },
  {
    id: "04",
    category: "Project Management",
    title: "Infrastructure Project Management",
    description:
      "End-to-end coordination, planning, monitoring, quality control, and delivery for infrastructure projects.",
    location: "Kannur",
    icon: HardHat,
    image: managementProjectImg,
  },
  {
    id: "05",
    category: "Infrastructure",
    title: "NHAI Access & Development",
    description:
      "Professional assistance for developments requiring highway access coordination, documentation, and approvals.",
    location: "Kerala",
    icon: Route,
    image: nhaiProjectImg,
  },
  {
    id: "06",
    category: "Consultancy",
    title: "Estimation & Valuation",
    description:
      "Construction estimation and property valuation support for residential, commercial, and development projects.",
    location: "Kerala",
    icon: Building2,
    image: valuationProjectImg,
  },
];

const defaultCategories = [
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
  const [projectList, setProjectList] = useState(defaultProjects);

  // Active & removed categories loaded directly from MongoDB Atlas
  const [removedCategories, setRemovedCategories] = useState([]);
  const [activeCategoriesList, setActiveCategoriesList] = useState(
    defaultCategories.filter((c) => c !== "All")
  );

  // Fetch live projects & MongoDB Atlas categories
  useEffect(() => {
    let isMounted = true;
    const loadProjectsAndCategories = async () => {
      // 1. Fetch live categories from MongoDB Atlas
      try {
        const catData = await fetchCategoriesByTypeAPI("project");
        if (isMounted && catData) {
          if (Array.isArray(catData.categories) && catData.categories.length > 0) {
            setActiveCategoriesList(catData.categories);
          }
          if (Array.isArray(catData.removedCategories)) {
            setRemovedCategories(catData.removedCategories);
          }
        }
      } catch (err) {
        console.warn("Could not load project categories from MongoDB Atlas:", err);
      }

      // 2. Fetch live projects
      try {
        const apiProjects = await fetchProjectsFromAPI();
        if (isMounted && apiProjects && apiProjects.length > 0) {
          const formatted = apiProjects.map((p) => ({
            id: p.projectId || p.id,
            category: p.category,
            title: p.title,
            description: p.description,
            details: p.details,
            location: p.location,
            deliverables: p.deliverables || [],
            icon: iconMap[p.iconName] || Building2,
            image: imageMap[p.projectId || p.id] || p.image || buildingProjectImg,
          }));
          setProjectList(formatted);
        }
      } catch (err) {
        console.warn("Could not load projects from MongoDB Atlas:", err);
      }
    };

    loadProjectsAndCategories();

    const onFocus = () => loadProjectsAndCategories();
    window.addEventListener("focus", onFocus);
    const interval = setInterval(loadProjectsAndCategories, 6000);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);

  // Dynamically compute all categories from MongoDB + live projects, excluding removed
  const categories = [
    "All",
    ...Array.from(
      new Set([
        ...(activeCategoriesList || defaultCategories.filter((c) => c !== "All")),
        ...projectList.map((p) => p.category).filter(Boolean),
      ])
    ).filter((cat) => !removedCategories.includes(cat)),
  ];

  // If currently active category was removed, fallback to "All"
  useEffect(() => {
    if (activeCategory !== "All" && removedCategories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [removedCategories, activeCategory]);

  // Lock background scroll on open
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [selectedProject]);

  const filteredProjects = projectList
    .filter((project) => !removedCategories.includes(project.category))
    .filter((project) =>
      activeCategory === "All"
        ? true
        : project.category?.toLowerCase() === activeCategory?.toLowerCase()
    );

  return (
    <main className="min-h-screen bg-white text-[#17221D]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F5F9FC] px-4 pb-14 pt-24 xs:px-6 xs:pb-16 xs:pt-28 sm:px-10 sm:pb-20 sm:pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-7 sm:w-10 bg-[#0066B4]" />

              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                Our Projects
              </span>
            </div>

            <h1 className="max-w-6xl font-serif text-3xl font-light leading-[0.98] tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:leading-[0.95]">
              Projects that
              <br />

              <span className="text-[#0066B4]">
                shape places.
              </span>
            </h1>

            <p className="mt-4 sm:mt-8 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-500 md:text-base">
              Explore the range of infrastructure, construction,
              surveying, and project management capabilities
              delivered by ONSET INFRA.
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[120px] font-light leading-none text-[#0066B4]/[0.04] xs:text-[160px] sm:-right-10 sm:text-[220px] md:text-[280px]">
          03
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section className="px-4 py-12 xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="flex flex-col gap-6 sm:gap-8 border-b border-[#0066B4]/10 pb-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                Selected Work
              </span>

              <h2 className="mt-2 sm:mt-3 font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light">
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
                    px-3.5
                    py-1.5
                    text-xs
                    transition-all
                    duration-300
                    xs:px-4
                    xs:py-2
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
              {filteredProjects.map((project, index) => {
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
                      rounded-[20px]
                      border
                      border-[#0066B4]/10
                      bg-white
                      shadow-[0_12px_40px_rgba(0,102,180,0.05)]
                      transition-shadow
                      duration-500
                      hover:shadow-[0_25px_65px_rgba(0,102,180,0.14)]
                      xs:rounded-[28px]
                    "
                  >
                    {/* IMAGE / VIDEO */}

                    <div className="relative h-[180px] overflow-hidden bg-[#EAF2F7] xs:h-[220px] sm:h-[260px]">
                      {isVideoUrl(project.image) ? (
                        <video
                          src={project.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />
                      ) : (
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
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0066B4]/70 via-transparent to-transparent pointer-events-none" />

                      {/* NUMBER */}

                      <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[11px] font-semibold text-[#0066B4] shadow-lg backdrop-blur-md xs:left-5 xs:top-5 xs:h-10 xs:w-10 xs:text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* ICON */}

                      <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-[#0066B4] shadow-xl backdrop-blur-md xs:bottom-5 xs:left-5 xs:h-12 xs:w-12">
                        <Icon size={18} strokeWidth={1.7} className="xs:size-[21px]" />
                      </div>

                      {/* LOCATION */}

                      <span className="absolute bottom-5 right-4 text-[9px] uppercase tracking-[0.2em] text-white/80 xs:bottom-6 xs:right-5 xs:text-[10px]">
                        {project.location}
                      </span>
                    </div>

                    {/* CONTENT */}

                    <div className="p-4 xs:p-5 sm:p-6">

                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0066B4]/60">
                        {project.category}
                      </span>

                      <h3 className="mt-2 font-serif text-xl font-medium leading-tight text-[#17221D] transition-colors duration-300 group-hover:text-[#0066B4] xs:mt-3 xs:text-2xl">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                        {project.description}
                      </p>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="
                          mt-4
                          flex
                          items-center
                          gap-2
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-[#0066B4]
                          xs:mt-6
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

      <section className="bg-[#0066B4] px-4 py-12 text-white xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-2 lg:items-end">

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs sm:tracking-[0.3em]">
                Your Next Project
              </span>

              <h2 className="mt-3 font-serif text-2xl font-light leading-tight xs:mt-5 xs:text-3xl sm:text-4xl md:text-6xl">
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
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  text-[#0066B4]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  xs:px-6
                  xs:py-3.5
                  xs:text-sm
                "
              >
                Start a Project
                <ArrowUpRight size={16} className="xs:size-[17px]" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT DETAILS MODAL
      ===================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/75 px-3 py-6 backdrop-blur-md xs:px-5 xs:py-8 overflow-y-auto overscroll-contain"
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
                rounded-[20px]
                bg-white
                shadow-2xl
                xs:rounded-[30px]
              "
            >

              {/* CLOSE */}

              <button
                onClick={() => setSelectedProject(null)}
                className="
                  absolute
                  right-3
                  top-3
                  z-10
                  flex
                  h-8
                  w-8
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
                  xs:right-5
                  xs:top-5
                  xs:h-10
                  xs:w-10
                "
                aria-label="Close"
              >
                <X size={17} className="xs:size-[19px]" />
              </button>

              {/* MODAL IMAGE / VIDEO */}

              <div className="h-[200px] overflow-hidden xs:h-[240px] md:h-[360px] bg-black flex items-center justify-center">
                {isVideoUrl(selectedProject.image) ? (
                  <video
                    src={selectedProject.image}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* MODAL CONTENT */}

              <div className="p-5 xs:p-7 md:p-10">

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0066B4] xs:text-xs xs:tracking-[0.3em]">
                  {selectedProject.category}
                </span>

                <h2 className="mt-2 font-serif text-2xl font-light xs:mt-3 xs:text-3xl md:text-5xl">
                  {selectedProject.title}
                </h2>

                <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-500 xs:mt-5 xs:text-sm xs:leading-7 md:text-base">
                  {selectedProject.description}
                </p>

                <div className="mt-6 flex items-center gap-2.5 border-t border-[#0066B4]/10 pt-4 xs:mt-8 xs:gap-3 xs:pt-6">
                  <Map size={16} className="text-[#0066B4] xs:size-[18px]" />

                  <span className="text-xs text-slate-500 xs:text-sm">
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
      </AnimatePresence>,
      document.body
    )}

    </main>
  );
};

export default OurProjects;

