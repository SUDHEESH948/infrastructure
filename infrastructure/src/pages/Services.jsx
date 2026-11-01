import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, serviceCategories } from "../data/servicesData";
import ServiceModal from "../components/ServiceModal";

/* =========================================================
   SERVICES COMPONENT
========================================================= */

const Services = () => {
  const categories = serviceCategories;
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
                Onset Infra &bull; Engineers and Interior Designers
              </span>
            </div>

            {/* TITLE */}
            <h1 className="max-w-5xl font-serif text-3xl font-light leading-[0.98] tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:leading-[1.02]">
              Engineers &
              <br />
              <span className="italic text-[#0066B4]">Interior Designers.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 sm:mt-8 max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 md:text-lg">
              Integrated building and road contracting, bespoke interior design, modular kitchens, statutory permits, Airport NOC, GPS surveying, renovation, and 3D visualization.
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
                    onClick={() => setSelectedService(service)}
                    className="
                      group
                      relative
                      flex
                      flex-col
                      cursor-pointer
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

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 xs:mt-6 xs:pt-4">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0066B4]/60">
                          ONSET INFRA
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedService(service);
                          }}
                          className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            text-[#0066B4]
                            transition-colors
                            hover:text-[#004f8c]
                          "
                        >
                          Explore
                          <ArrowUpRight
                            size={14}
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
      <section className="bg-[#0066B4] px-4 py-12 text-white xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/60">
                Operational Framework
              </span>
              <h2 className="mt-3 font-serif text-2xl font-light leading-tight xs:mt-4 xs:text-3xl sm:text-4xl md:text-6xl">
                Rigorous engineering.
                <br />
                Seamless execution.
              </h2>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-white/80 md:text-base">
              From architectural planning and statutory clearance to turnkey construction, bespoke interior styling, and final commissioning, our integrated approach eliminates bottlenecks and delivers flawless results.
            </p>
          </div>
          <div className="mt-10 sm:mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-white sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Planning & Design",
                text: "Client consultation, spatial layout, 3D visualization, and structural analysis.",
              },
              {
                step: "02",
                title: "Statutory Approvals",
                text: "Drafting compliance documentation for local body and NHAI access permissions.",
              },
              {
                step: "03",
                title: "Execution & Fit-Out",
                text: "Turnkey building/road construction, precision joinery, and modular installations.",
              },
              {
                step: "04",
                title: "Quality Delivery",
                text: "Rigorous QA/QC inspections, flawless finishes, valuation, and final handover.",
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
                Connect with our engineers and interior designers for an expert project assessment and consultation.
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
              Consult an Engineer & Designer
              <ArrowUpRight size={16} className="xs:size-[17px]" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE DETAIL MODAL
      ===================================================== */}
      <ServiceModal
        selectedService={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </main>
  );
};

export default Services;
