import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Ruler,
  FileCheck2,
  Building2,
  ClipboardCheck,
  Landmark,
  Map,
  CarFront,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

// Images
import roadImage from "../assets/hero.png";
import surveyImage from "../assets/hero.png";
import buildingImage from "../assets/hero.png";
import permitImage from "../assets/hero.png";
import projectImage from "../assets/hero.png";
import landImage from "../assets/hero.png";
import highwayImage from "../assets/hero.png";
import valuationImage from "../assets/hero.png";
import nocasImage from "../assets/hero.png";

/* =========================================================
   SERVICES DATA
========================================================= */

const services = [
  {
    number: "01",
    title: "Surveyor",
    description:
      "Accurate site measurements, land assessment, and professional surveying for development planning.",
    icon: Ruler,
    image: surveyImage,
  },
  {
    number: "02",
    title: "NOCAS",
    description:
      "Professional assistance with NOCAS documentation, approvals, and development requirements.",
    icon: FileCheck2,
    image: nocasImage,
  },
  {
    number: "03",
    title: "NHA",
    description:
      "Consultancy and coordination for highway requirements, permissions, and project approvals.",
    icon: Landmark,
    image: highwayImage,
  },
  {
    number: "04",
    title: "Road & Building Contractor",
    description:
      "Complete construction solutions for roads, buildings, civil works, and infrastructure.",
    icon: Building2,
    image: buildingImage,
  },
  {
    number: "05",
    title: "Project Management",
    description:
      "End-to-end planning, coordination, execution, quality control, and project delivery.",
    icon: ClipboardCheck,
    image: projectImage,
  },
  {
    number: "06",
    title: "Local Body Permits",
    description:
      "Assistance with building permits, approvals, documentation, and authority coordination.",
    icon: FileCheck2,
    image: permitImage,
  },
  {
    number: "07",
    title: "Land Surveying",
    description:
      "Detailed land surveys providing reliable site data for construction and development.",
    icon: Map,
    image: landImage,
  },
  {
    number: "08",
    title: "NHAI Access Permit",
    description:
      "Professional assistance with access permits for developments connected to national highways.",
    icon: CarFront,
    image: roadImage,
  },
  {
    number: "09",
    title: "Estimation & Valuation",
    description:
      "Building cost estimation and property valuation for residential and commercial projects.",
    icon: Calculator,
    image: valuationImage,
  },
];

/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group w-full min-w-0"
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-[#0066B4]/15
          bg-white
          shadow-[0_10px_30px_rgba(0,102,180,0.06)]
          transition-all
          duration-500
          group-hover:border-[#0066B4]/40
          group-hover:shadow-[0_20px_50px_rgba(0,102,180,0.15)]
        "
      >
        {/* IMAGE */}
        <div className="relative h-[200px] overflow-hidden sm:h-[220px]">
          <img
            src={service.image}
            alt={service.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />

          {/* GRADIENT */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#0066B4]/80
              via-[#0066B4]/20
              to-transparent
            "
          />

          {/* NUMBER */}
          <div
            className="
              absolute
              left-4
              top-4
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-xs
              font-semibold
              text-[#0066B4]
              shadow-md
              backdrop-blur-md
            "
          >
            {service.number}
          </div>

          {/* ICON */}
          <div
            className="
              absolute
              bottom-4
              left-4
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-white/95
              text-[#0066B4]
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:bg-[#0066B4]
              group-hover:text-white
            "
          >
            <Icon size={20} strokeWidth={1.8} />
          </div>

          {/* ARROW */}
          <div
            className="
              absolute
              bottom-4
              right-4
              flex
              h-10
              w-10
              translate-y-3
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-[#0066B4]
              opacity-0
              shadow-md
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3
            className="
              font-serif
              text-xl
              font-medium
              leading-snug
              text-[#17221D]
              transition-colors
              duration-300
              group-hover:text-[#0066B4]
            "
          >
            {service.title}
          </h3>

          <p className="mt-2.5 min-h-[48px] text-xs leading-5 text-slate-500 sm:text-sm">
            {service.description}
          </p>

          {/* FOOTER */}
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              border-t
              border-[#0066B4]/10
              pt-3
            "
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0066B4]/60">
              ONSET INFRA
            </span>

            <span className="flex items-center gap-1 text-xs font-semibold text-[#0066B4]">
              Explore
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        {/* HOVER BOTTOM LINE */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-[3px]
            w-full
            origin-left
            scale-x-0
            bg-[#0066B4]
            transition-transform
            duration-500
            group-hover:scale-x-100
          "
        />
      </div>
    </motion.article>
  );
};

/* =========================================================
   ANIMATED ROW COMPONENT
========================================================= */

const AnimatedRow = ({ row, rowIndex, totalRows, scrollYProgress }) => {
  const progressStart = totalRows <= 1 ? 0 : (rowIndex - 0.75) / (totalRows - 1);
  const progressEnd = totalRows <= 1 ? 1 : rowIndex / (totalRows - 1);

  const clampedStart = Math.max(0, progressStart);
  const clampedEnd = Math.min(1, progressEnd);

  const y = useTransform(
    scrollYProgress,
    [clampedStart, clampedEnd],
    [rowIndex === 0 ? "0%" : "120%", "0%"]
  );

  return (
    <motion.div
      style={{ y }}
      className={`
        ${rowIndex === 0 ? "relative" : "absolute inset-x-0 top-0"}
        grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5
      `}
    >
      {row.map((service) => (
        <ServiceCard key={service.number} service={service} />
      ))}
    </motion.div>
  );
};

/* =========================================================
   CREATE ROWS HELPER
========================================================= */

const createRows = (items, columns) => {
  const result = [];
  for (let i = 0; i < items.length; i += columns) {
    result.push(items.slice(i, i + columns));
  }
  return result;
};

/* =========================================================
   MAIN EXPERTISE COMPONENT
========================================================= */

export default function Expertise() {
  const sectionRef = useRef(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rows = useMemo(() => createRows(services, columns), [columns]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sectionHeight = Math.max(100, rows.length * 90);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${sectionHeight}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen w-full flex-col justify-center overflow-hidden px-5 py-12 md:px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 w-full max-w-7xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#0066B4]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0066B4]">
              Our Expertise
            </span>
          </div>

          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-[#17221D] sm:text-5xl md:text-6xl">
            Engineering <span className="text-[#0066B4]">with precision.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
            Integrated engineering, surveying, construction, permits, and
            consultancy solutions for infrastructure and development.
          </p>
        </motion.div>

        {/* CARD STACK */}
        <div className="relative mx-auto w-full max-w-7xl">
          {rows.map((row, rowIndex) => (
            <AnimatedRow
              key={`row-${columns}-${rowIndex}`}
              row={row}
              rowIndex={rowIndex}
              totalRows={rows.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}