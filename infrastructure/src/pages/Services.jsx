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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF5FA] to-[#FAFCFE] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* LABEL */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0066B4]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0066B4]">
                Capabilities & Practice
              </span>
            </div>

            {/* TITLE */}
            <h1 className="max-w-5xl font-serif text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Engineering solutions,
              <br />
              <span className="italic text-[#0066B4]">grounded in precision.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              End-to-end civil engineering, geodetic surveys, governmental
              clearance pathways, and contracting capabilities tailored for complex
              built environments.
            </p>
          </motion.div>
        </div>

        {/* BACKGROUND DECORATIVE WATERMARK */}
        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[180px] font-light leading-none text-[#0066B4]/[0.035] md:text-[320px]">
          01
        </div>
      </section>

      {/* =====================================================
          SERVICE GRID & FILTER
      ===================================================== */}
      <section className="px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* FILTER BAR */}
          <div className="flex flex-col gap-6 border-b border-[#0066B4]/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0066B4]">
                Directory
              </span>
              <h2 className="mt-1 font-serif text-3xl font-light md:text-4xl">
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
                    px-5
                    py-2.5
                    text-xs
                    font-medium
                    transition-all
                    duration-300
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
            className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
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
                      rounded-[26px]
                      border
                      border-[#0066B4]/10
                      bg-white
                      shadow-[0_10px_35px_rgba(0,102,180,0.04)]
                      transition-all
                      duration-500
                      hover:border-[#0066B4]/30
                      hover:shadow-[0_20px_50px_rgba(0,102,180,0.12)]
                    "
                  >
                    {/* CARD IMAGE CONTAINER */}
                    <div className="relative h-[220px] w-full overflow-hidden bg-slate-100">
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
                      <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 font-mono text-xs font-semibold text-[#0066B4] shadow-md backdrop-blur-md">
                        {service.number}
                      </div>

                      {/* FLOATING ICON */}
                      <div className="
                        absolute
                        bottom-4
                        left-5
                        flex
                        h-11
                        w-11
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
                      ">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>

                      {/* CATEGORY TAG */}
                      <span className="absolute bottom-5 right-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                        {service.category}
                      </span>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="
                          font-serif
                          text-2xl
                          font-normal
                          leading-snug
                          text-[#17221D]
                          transition-colors
                          duration-300
                          group-hover:text-[#0066B4]
                        ">
                          {service.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-5">
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
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
      <section className="bg-[#0066B4] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Operational Framework
              </span>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
                Rigorous oversight.
                <br />
                Seamless execution.
              </h2>
            </div>

            <p className="text-sm leading-7 text-white/80 md:text-base">
              From topographical validation to multi-tier governmental
              clearance and final commissioning, our turnkey approach eliminates
              bottlenecks and mitigates risk across every milestone.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-white sm:grid-cols-2 lg:grid-cols-4">
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
        p-6 md:p-8
        border-white/30
        ${index !== 3 ? "border-b lg:border-b-0" : ""}
        ${index % 2 === 0 ? "sm:border-r" : "sm:border-r-0"}
        ${index !== 3 ? "lg:border-r" : "lg:border-r-0"}
      `}
    >
      <span className="font-mono text-xs font-semibold text-white/60">
        {item.step}
      </span>
      <h3 className="mt-6 font-serif text-2xl font-light text-white">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/80">
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
      <section className="bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 rounded-[32px] bg-[#F5F9FC] p-8 md:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0066B4]">
                Initiate Consultation
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light md:text-5xl">
                Ready to review your development requirements?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
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
                px-8
                py-4
                text-sm
                font-medium
                text-white
                shadow-lg
                shadow-[#0066B4]/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#00528F]
              "
            >
              Consult an Engineer
              <ArrowUpRight size={17} />
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
              p-4
              backdrop-blur-md
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
                rounded-[28px]
                bg-white
                shadow-2xl
              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="
                  absolute
                  right-5
                  top-5
                  z-20
                  flex
                  h-10
                  w-10
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
                "
              >
                <X size={18} />
              </button>

              {/* MODAL HERO IMAGE */}
              <div className="relative h-60 w-full shrink-0 overflow-hidden bg-slate-900">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2235]/90 via-[#0066B4]/30 to-transparent" />
                <div className="absolute bottom-5 left-6 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7fc1f2]">
                    {selectedService.category} &bull; Spec {selectedService.number}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light md:text-3xl">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* MODAL BODY */}
              <div className="overflow-y-auto p-6 md:p-8">
                <p className="text-sm leading-7 text-slate-600 md:text-base">
                  {selectedService.details}
                </p>

                {/* DELIVERABLES LIST */}
                <div className="mt-6 rounded-2xl bg-[#F5F9FC] p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066B4]">
                    Key Deliverables & Documentation
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {selectedService.deliverables?.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-xs font-medium text-slate-700 md:text-sm"
                      >
                        <CheckCircle2 size={16} className="shrink-0 text-[#0066B4]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-8 flex justify-end">
                  <a
                    href="/contact"
                    onClick={() => setSelectedService(null)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#0066B4]
                      px-6
                      py-3.5
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      transition-all
                      hover:bg-[#00528F]
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