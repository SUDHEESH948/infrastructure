import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjectsFromAPI } from "../services/api";

import roadProjectImg from "../assets/projects/road-development.jpg";
import buildingProjectImg from "../assets/projects/building-construction.jpg";
import surveyProjectImg from "../assets/projects/land-site-survey.jpg";
import managementProjectImg from "../assets/projects/project-management.jpg";
import nhaiProjectImg from "../assets/projects/nhai-access.jpg";
import valuationProjectImg from "../assets/projects/estimation-valuation.jpg";

const presetImageMap = {
  "01": roadProjectImg,
  "02": buildingProjectImg,
  "03": surveyProjectImg,
  "04": managementProjectImg,
  "05": nhaiProjectImg,
  "06": valuationProjectImg,
  "1": roadProjectImg,
  "2": buildingProjectImg,
  "3": surveyProjectImg,
  "4": managementProjectImg,
  "5": nhaiProjectImg,
  "6": valuationProjectImg,
  "/projects/road-development.jpg": roadProjectImg,
  "/projects/building-construction.jpg": buildingProjectImg,
  "/projects/land-site-survey.jpg": surveyProjectImg,
  "/projects/project-management.jpg": managementProjectImg,
  "/projects/nhai-access.jpg": nhaiProjectImg,
  "/projects/estimation-valuation.jpg": valuationProjectImg,
};

const defaultProjects = [
  {
    id: "01",
    tag: "Infrastructure",
    title: "Road & Highway Development",
    image: roadProjectImg,
    bgHeadline: "Infrastructure Development",
  },
  {
    id: "02",
    tag: "Construction",
    title: "Building Construction",
    image: buildingProjectImg,
    bgHeadline: "Building Construction",
  },
  {
    id: "03",
    tag: "Surveying",
    title: "Land & Site Survey",
    image: surveyProjectImg,
    bgHeadline: "Land & Site Survey",
  },
  {
    id: "04",
    tag: "Project Management",
    title: "Infrastructure Project Management",
    image: managementProjectImg,
    bgHeadline: "Project Management",
  },
];

const resolveProjectImage = (proj, idx) => {
  if (proj?.image && !proj.image.startsWith("/projects/")) {
    return proj.image;
  }
  if (proj?.image && presetImageMap[proj.image]) {
    return presetImageMap[proj.image];
  }
  const id = proj?.projectId || proj?.id;
  if (id && presetImageMap[id]) {
    return presetImageMap[id];
  }
  return defaultProjects[idx % defaultProjects.length]?.image || buildingProjectImg;
};

export default function Projects() {
  const [items, setItems] = useState(defaultProjects);
  const [activeItem, setActiveItem] = useState(defaultProjects[0]);

  // Fetch live projects from backend API and auto-refresh on focus/interval
  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const liveProjects = await fetchProjectsFromAPI();
        if (isMounted && liveProjects && liveProjects.length > 0) {
          const formatted = liveProjects.map((p, idx) => ({
            id: p.projectId ? String(p.projectId).padStart(2, "0") : String(idx + 1).padStart(2, "0"),
            tag: p.category || "Project",
            title: p.title,
            image: p.image,
            bgHeadline: p.category || p.title || "Infrastructure",
            description: p.description,
            rawProject: p,
          }));
          setItems(formatted);
          setActiveItem((prev) => {
            const found = formatted.find((f) => f.id === prev?.id);
            return found || formatted[0];
          });
        }
      } catch (err) {
        console.warn("Could not load live projects:", err);
      }
    };

    loadProjects();

    const onFocus = () => loadProjects();
    window.addEventListener("focus", onFocus);
    const interval = setInterval(loadProjects, 5000);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#F7FAFC] px-6 py-16 text-[#17221D] md:px-12 md:py-20"
    >
      {/* BACKGROUND WATERMARK */}
      <div className="pointer-events-none absolute left-6 right-6 top-1/2 z-0 -translate-y-1/2 select-none overflow-hidden">
        <h2 className="whitespace-nowrap text-4xl font-bold uppercase tracking-wider text-[#0066B4]/[0.055] transition-all duration-700 ease-out md:text-7xl lg:text-8xl">
          {activeItem?.bgHeadline || "Infrastructure"}
        </h2>
      </div>

      {/* SECTION HEADER */}
      <div className="relative z-10 mx-auto mb-12 w-full max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0066B4]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                Selected Projects
              </span>
            </div>

            <h2 className="font-serif text-5xl font-light leading-[0.95] tracking-tight text-[#17221D] md:text-7xl">
              Building
              <br />
              <span className="text-[#0066B4]">with purpose.</span>
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#0066B4]/30 bg-white/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0066B4] shadow-sm backdrop-blur transition hover:border-[#0066B4] hover:bg-[#0066B4] hover:text-white sm:self-end"
          >
            <span>View All Projects</span>
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => {
          const imgSrc = resolveProjectImage(item, idx);
          return (
            <Link
              to="/projects"
              key={item.id || idx}
              onMouseEnter={() => setActiveItem(item)}
              className="group relative flex cursor-pointer flex-col border-t border-[#0066B4]/20 pb-6 pt-5 transition-all duration-300 hover:border-[#0066B4]"
            >
              {/* IMAGE */}
              <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#EAF2F7] shadow-[0_10px_35px_rgba(0,102,180,0.06)]">
                <img
                  src={imgSrc}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = buildingProjectImg;
                  }}
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0066B4]/10 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[11px] font-semibold text-[#0066B4] shadow-lg backdrop-blur-md">
                  {String(item.id || idx + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-[#0066B4] text-white opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-lg">↗</span>
                </div>
              </div>

              {/* META TAG */}
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0066B4]/60 transition-colors duration-200 group-hover:text-[#0066B4]">
                {item.tag}
              </span>

              {/* TITLE */}
              <h3 className="mt-2 line-clamp-3 text-sm font-medium leading-snug text-[#17221D] transition-colors duration-200 group-hover:text-[#0066B4] md:text-base">
                {item.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
