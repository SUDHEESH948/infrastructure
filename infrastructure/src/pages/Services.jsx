import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
  X,
} from "lucide-react";

/* =========================================================
   SERVICES DATA (With Dedicated Visuals & Key Deliverables)
========================================================= */

const services = [
  {
    number: "01",
    title: "Engineering Surveyor",
    category: "Surveying",
    icon: Ruler,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    description:
      "Precision geodetic layout, boundary verification, and setting-out surveys for complex civil and structural undertakings.",
    details:
      "Our engineering surveying uses robotic total stations, high-accuracy GPS/GNSS, and digital levels to establish reliable benchmark networks, deformation monitoring, and site controls essential for structural alignment.",
    deliverables: [
      "Setting-out & benchmark grids",
      "As-built dimensional surveys",
      "Deformation & settlement tracking",
    ],
  },
  {
    number: "02",
    title: "NOCAS Aviation Clearance",
    category: "Approvals",
    icon: FileCheck2,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
    description:
      "End-to-end liaison and regulatory filing for Airport Authority of India (AAI) height clearance through the NOCAS portal.",
    details:
      "We handle complete aeronautical elevation computations, site co-ordinates validation in WGS-84 formats, obstruction evaluation studies, and administrative follow-ups to secure clean NOC clearances without delays.",
    deliverables: [
      "WGS-84 site coordinate survey",
      "Aeronautical obstruction analysis",
      "Official AAI NOCAS e-filing & tracking",
    ],
  },
  {
    number: "03",
    title: "Highway & Infrastructure (NHA)",
    category: "Infrastructure",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=900&q=80",
    description:
      "Technical consultancy, expressway alignment audits, structural connectivity clearances, and ROW compliance with highway bodies.",
    details:
      "Comprehensive liaison and civil engineering consulting covering right-of-way (ROW) compliance, road geometry verification, bridge piers positioning, and multi-tier utility crossing agreements.",
    deliverables: [
      "Right-of-Way (ROW) boundary verification",
      "Overhead/underground utility clearances",
      "Expressway corridor alignment reviews",
    ],
  },
  {
    number: "04",
    title: "Road & Civil Contracting",
    category: "Construction",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=900&q=80",
    description:
      "Heavy asphalt paving, concrete highway construction, deep foundations, and end-to-end commercial civil structural works.",
    details:
      "From sub-base stabilization, bituminous macadam paving, storm-water drainage networks to multistory RCC framing, our construction unit executes turnkey contracting compliant with rigorous IRC/IS civil standards.",
    deliverables: [
      "Bituminous & concrete pavement works",
      "Sub-grade soil stabilization",
      "Retaining walls & storm drainage",
    ],
  },
  {
    number: "05",
    title: "Project Management Consultancy",
    category: "Management",
    icon: ClipboardCheck,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    description:
      "Rigorous scheduling, material quality assurance, budget engineering, and on-site oversight from kickoff to handover.",
    details:
      "We implement structured project governance protocols, Gantt milestones, contractor workflow audits, QA/QC testing oversight, and cost variance prevention to guarantee your projects complete on target.",
    deliverables: [
      "Timeline & Gantt tracking",
      "QA/QC material testing audits",
      "Contractor performance oversight",
    ],
  },
  {
    number: "06",
    title: "Local Body & Municipal Permits",
    category: "Approvals",
    icon: FileCheck2,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    description:
      "Navigating municipal corporations, town planning departments, environmental boards, and panchayat development orders.",
    details:
      "We prepare architectural sanction drawings, zoning classification proofs, building rule setback compliance (KMBR/BMR), and execute inter-departmental handoffs for hassle-free building permits.",
    deliverables: [
      "Sanction drawing preparation",
      "Zoning & KMBR setback compliance",
      "Occupancy & completion certificates",
    ],
  },
  {
    number: "07",
    title: "Geodetic & Land Surveying",
    category: "Surveying",
    icon: Map,
    image:
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=900&q=80",
    description:
      "Contour mapping, digital elevation models (DEM), cadastral boundary recovery, and drone-based topographical charting.",
    details:
      "Equipped with advanced LiDAR-capable surveying sensors, DGPS units, and drone mapping setups, we deliver high-resolution topographical models, cut-and-fill volumetrics, and revenue cadastral reconciliations.",
    deliverables: [
      "High-precision contour & DEM maps",
      "Cut-and-fill volume computations",
      "Revenue boundary reconstruction",
    ],
  },
  {
    number: "08",
    title: "NHAI Access & Fuel Station Permits",
    category: "Infrastructure",
    icon: CarFront,
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    description:
      "Access permission clearance for commercial retail outlets, fuel stations, logistics parks, and private entries on NH corridors.",
    details:
      "Specialized consultation adhering to MoRTH and NHAI guidelines for ingress/egress acceleration-deceleration lanes, service road integration, safety barriers, and technical site inspection clearances.",
    deliverables: [
      "MoRTH geometric drawing drafting",
      "Acceleration/Deceleration lane layouts",
      "NHAI site inspection compliance",
    ],
  },
  {
    number: "09",
    title: "Quantity Estimation & Valuation",
    category: "Consultancy",
    icon: Calculator,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    description:
      "Certified Bill of Quantities (BOQ), asset rate analysis, bank mortgage valuations, and lifecycle financial assessments.",
    details:
      "Detailed structural take-offs, CPWD/PWD schedule of rates (DSR) auditing, fair market capital evaluations, and feasibility documentation recognized by leading banks and institutional lenders.",
    deliverables: [
      "Comprehensive Bill of Quantities (BOQ)",
      "Bank valuation & asset solvency reports",
      "Material consumption rate analysis",
    ],
  },
];

const categories = [
  "All",
  "Surveying",
  "Approvals",
  "Infrastructure",
  "Construction",
  "Management",
  "Consultancy",
];

/* =========================================================
   SERVICES COMPONENT
========================================================= */

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FAFCFE] text-[#17221D]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF5FA] to-[#FAFCFE] px-4 pb-14 pt-24 xs:px-6 xs:pb-16 xs:pt-28 sm:px-10 sm:pb-20 sm:pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* LABEL */}
            <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-7 sm:w-10 bg-[#0066B4]" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                Capabilities & Practice
              </span>
            </div>

            {/* TITLE */}
            <h1 className="max-w-5xl font-serif text-3xl font-light leading-[0.98] tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:leading-[1.02]">
              Engineering solutions,
              <br />
              <span className="italic text-[#0066B4]">grounded in precision.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 sm:mt-8 max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 md:text-lg">
              End-to-end civil engineering, geodetic surveys, governmental
              clearance pathways, and contracting capabilities tailored for complex
              built environments.
            </p>
          </motion.div>
        </div>

        {/* BACKGROUND DECORATIVE WATERMARK */}
        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[120px] font-light leading-none text-[#0066B4]/[0.035] xs:text-[160px] sm:text-[220px] md:text-[320px]">
          01
        </div>
      </section>

      {/* =====================================================
          SERVICE GRID & FILTER
      ===================================================== */}
      <section className="px-4 py-10 xs:px-6 xs:py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* FILTER BAR */}
          <div className="flex flex-col gap-4 sm:gap-6 border-b border-[#0066B4]/10 pb-6 sm:pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#0066B4]">
                Directory
              </span>
              <h2 className="mt-1 font-serif text-2xl xs:text-3xl font-light md:text-4xl">
                Explore Our Specializations
              </h2>
            </div>

            {/* CATEGORY CHIPS */}
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
                    font-medium
                    transition-all
                    duration-300
                    xs:px-4
                    xs:py-2
                    sm:px-5
                    sm:py-2.5
                    ${
                      activeCategory === category
                        ? "border-[#0066B4] bg-[#0066B4] text-white shadow-md shadow-[#0066B4]/20"
                        : "border-[#0066B4]/15 bg-white text-[#0066B4]/80 hover:border-[#0066B4]/40 hover:text-[#0066B4]"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-5 xs:gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    layout
                    key={service.number}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -8 }}
                    className="
                      group
                      relative
                      flex
                      flex-col
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-[#0066B4]/10
                      bg-white
                      shadow-[0_10px_35px_rgba(0,102,180,0.04)]
                      transition-all
                      duration-500
                      hover:border-[#0066B4]/30
                      hover:shadow-[0_20px_50px_rgba(0,102,180,0.12)]
                      xs:rounded-[26px]
                    "
                  >
                    {/* CARD IMAGE CONTAINER */}
                    <div className="relative h-[180px] w-full overflow-hidden bg-slate-100 xs:h-[200px] sm:h-[220px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-108
                        "
                      />

                      {/* GRADIENT OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/80 via-[#0066B4]/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                      {/* NUMBER PILL */}
                      <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 font-mono text-[11px] font-semibold text-[#0066B4] shadow-md backdrop-blur-md xs:left-5 xs:top-5 xs:h-9 xs:w-9 xs:text-xs">
                        {service.number}
                      </div>

                      {/* FLOATING ICON */}
                      <div className="
                        absolute
                        bottom-3.5
                        left-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/90
                        text-[#0066B4]
                        shadow-lg
                        backdrop-blur-md
                        transition-all
                        duration-300
                        group-hover:bg-[#0066B4]
                        group-hover:text-white
                        xs:bottom-4
                        xs:left-5
                        xs:h-11
                        xs:w-11
                      ">
                        <Icon size={18} strokeWidth={1.8} className="xs:size-5" />
                      </div>

                      {/* CATEGORY TAG */}
                      <span className="absolute bottom-4 right-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 xs:bottom-5 xs:right-5 xs:text-[11px]">
                        {service.category}
                      </span>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="flex flex-1 flex-col justify-between p-4 xs:p-5 sm:p-6">
                      <div>
                        <h3 className="
                          font-serif
                          text-xl
                          font-normal
                          leading-snug
                          text-[#17221D]
                          transition-colors
                          duration-300
                          group-hover:text-[#0066B4]
                          xs:text-2xl
                        ">
                          {service.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6 line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-slate-100 pt-4 xs:mt-6 xs:pt-5">
                        <button
                          onClick={() => setSelectedService(service)}
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-[#0066B4]
                            transition-colors
                            hover:text-[#004f8c]
                          "
                        >
                          <span>Detailed Scope</span>
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 xs:size-4"
                          />
                        </button>
                      </div>
                    </div>

                    {/* HOVER ACCENT LINE */}
                    <div className="
                      h-[3px]
                      w-full
                      origin-left
                      scale-x-0
                      bg-[#0066B4]
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    " />
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PROCESS SECTION
      ===================================================== */}
      <section className="bg-[#0066B4] px-4 py-12 text-white xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/60">
                Operational Framework
              </span>
              <h2 className="mt-3 font-serif text-2xl font-light leading-tight xs:mt-4 xs:text-3xl sm:text-4xl md:text-6xl">
                Rigorous oversight.
                <br />
                Seamless execution.
              </h2>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-white/80 md:text-base">
              From topographical validation to multi-tier governmental
              clearance and final commissioning, our turnkey approach eliminates
              bottlenecks and mitigates risk across every milestone.
            </p>
          </div>
          <div className="mt-10 sm:mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-white sm:grid-cols-2 lg:grid-cols-4">
  {[
    {
      step: "01",
      title: "Site Audit",
      text: "Geodetic survey, boundary validation, and obstacle assessment.",
    },
    {
      step: "02",
      title: "Regulatory Path",
      text: "Drafting compliance documentation for local or national approvals.",
    },
    {
      step: "03",
      title: "Engineering",
      text: "Detailed execution plans, rate analysis, and structural schedules.",
    },
    {
      step: "04",
      title: "Delivery",
      text: "QA/QC inspections, contractor supervision, and final handover.",
    },
  ].map((item, index) => (
    <div
      key={item.step}
      className={`
        p-4 xs:p-6 md:p-8
        border-white/30
        ${index !== 3 ? "border-b lg:border-b-0" : ""}
        ${index % 2 === 0 ? "sm:border-r" : "sm:border-r-0"}
        ${index !== 3 ? "lg:border-r" : "lg:border-r-0"}
      `}
    >
      <span className="font-mono text-xs font-semibold text-white/60">
        {item.step}
      </span>
      <h3 className="mt-4 sm:mt-6 font-serif text-xl xs:text-2xl font-light text-white">
        {item.title}
      </h3>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-white/80">
        {item.text}
      </p>
    </div>
  ))}
</div>

          
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-white px-4 py-12 xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:gap-8 rounded-[22px] bg-[#F5F9FC] p-5 xs:p-8 md:p-14 lg:flex-row lg:items-center lg:justify-between xs:rounded-[32px]">
            <div className="max-w-2xl">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#0066B4]">
                Initiate Consultation
              </span>
              <h2 className="mt-2 font-serif text-2xl font-light xs:mt-3 xs:text-3xl md:text-5xl">
                Ready to review your development requirements?
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 xs:mt-4 xs:text-sm md:text-base">
                Connect with our surveying engineers and approval specialists for a
                preliminary project assessment.
              </p>
            </div>

            <a
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#0066B4]
                px-6
                py-3
                text-xs
                font-medium
                text-white
                shadow-lg
                shadow-[#0066B4]/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#00528F]
                xs:px-8
                xs:py-4
                xs:text-sm
              "
            >
              Consult an Engineer
              <ArrowUpRight size={16} className="xs:size-[17px]" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODAL
      ===================================================== */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[#17221D]/75
              p-3
              backdrop-blur-md
              xs:p-4
              md:p-8
            "
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                flex
                max-h-[92vh]
                w-full
                max-w-2xl
                flex-col
                overflow-hidden
                rounded-[20px]
                bg-white
                shadow-2xl
                xs:rounded-[28px]
              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-[#0066B4]
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  hover:bg-[#0066B4]
                  hover:text-white
                  xs:right-5
                  xs:top-5
                  xs:h-10
                  xs:w-10
                "
              >
                <X size={17} className="xs:size-[18px]" />
              </button>

              {/* MODAL HERO IMAGE */}
              <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-900 xs:h-52 sm:h-60">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2235]/90 via-[#0066B4]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white xs:bottom-5 xs:left-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7fc1f2] xs:text-[11px]">
                    {selectedService.category} &bull; Spec {selectedService.number}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-light xs:text-2xl md:text-3xl">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* MODAL BODY */}
              <div className="overflow-y-auto p-4 xs:p-6 md:p-8">
                <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 md:text-base">
                  {selectedService.details}
                </p>

                {/* DELIVERABLES LIST */}
                <div className="mt-5 rounded-2xl bg-[#F5F9FC] p-4 xs:mt-6 xs:p-5">
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0066B4] xs:text-xs">
                    Key Deliverables & Documentation
                  </h4>
                  <ul className="mt-3 space-y-2 xs:mt-4 xs:space-y-2.5">
                    {selectedService.deliverables?.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs font-medium text-slate-700 xs:gap-3 md:text-sm"
                      >
                        <CheckCircle2 size={15} className="shrink-0 text-[#0066B4] xs:size-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-6 flex justify-end xs:mt-8">
                  <a
                    href="/contact"
                    onClick={() => setSelectedService(null)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#0066B4]
                      px-5
                      py-2.5
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      transition-all
                      hover:bg-[#00528F]
                      xs:px-6
                      xs:py-3.5
                    "
                  >
                    Discuss This Service
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Services;