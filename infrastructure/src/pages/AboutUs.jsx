
import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Ruler,
  HardHat,
  Map,
  ArrowUpRight,
} from "lucide-react";

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-white text-[#17221D]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden px-4 pb-14 pt-24 xs:px-6 xs:pb-16 xs:pt-28 sm:px-10 sm:pb-20 sm:pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* LABEL */}

            <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-7 sm:w-10 bg-[#0066B4]" />

              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                About Onset Infra
              </span>
            </div>

            {/* TITLE */}

            <h1 className="max-w-6xl font-serif text-3xl font-light leading-[0.98] tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:leading-[0.95]">
              Building the
              <br />

              <span className="text-[#0066B4]">
                infrastructure
              </span>

              <br />

              of tomorrow.
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 sm:mt-10 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 md:text-lg">
              ONSET INFRA is an engineering and infrastructure
              consultancy focused on delivering practical,
              reliable, and professionally managed solutions
              for construction and development projects.
            </p>
          </motion.div>
        </div>

        {/* DECORATIVE NUMBER */}

        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[120px] font-light leading-none text-[#0066B4]/[0.04] xs:text-[160px] sm:-right-10 sm:text-[220px] md:text-[280px]">
          01
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="bg-[#F5F9FC] px-4 py-12 xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">

            {/* LEFT */}

            <div>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                Who We Are
              </span>

              <h2 className="mt-3 sm:mt-5 font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Engineering
                <br />
                with purpose.
              </h2>
            </div>

            {/* RIGHT */}

            <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm leading-6 sm:leading-8 text-slate-500 md:text-base">
              <p>
                ONSET INFRA brings together engineering,
                surveying, construction, project management,
                permit assistance, and infrastructure
                consultancy under one professional platform.
              </p>

              <p>
                Our approach is centered around accurate
                planning, technical coordination, responsible
                execution, and clear communication throughout
                every stage of a project.
              </p>

              <p>
                From land surveying and development planning
                to road and building works, we work to provide
                solutions that support the technical and
                practical requirements of modern development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR EXPERTISE
      ===================================================== */}

      <section className="px-4 py-12 xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-8 max-w-2xl sm:mb-12">
            <div className="mb-3 sm:mb-5 flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-7 sm:w-10 bg-[#0066B4]" />

              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                What We Do
              </span>
            </div>

            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-light leading-tight">
              One platform.
              <br />
              <span className="text-[#0066B4]">
                Multiple capabilities.
              </span>
            </h2>
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 01 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <Ruler size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                01
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Surveying
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Accurate land and site surveying to support
                planning, construction, and development.
              </p>
            </motion.article>

            {/* CARD 02 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <Building2 size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                02
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Construction
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Road, building, and civil construction
                solutions focused on practical execution.
              </p>
            </motion.article>

            {/* CARD 03 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <HardHat size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                03
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Project Management
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Planning, coordination, quality monitoring,
                and delivery across project stages.
              </p>
            </motion.article>

            {/* CARD 04 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <Map size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                04
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Permits & Approvals
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Assistance with documentation, approvals,
                permits, and authority coordination.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPROACH
      ===================================================== */}

      <section className="bg-[#0066B4] px-4 py-12 text-white xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:items-end">

            {/* LEFT */}

            <div>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/60">
                Our Approach
              </span>

              <h2 className="mt-3 sm:mt-5 max-w-2xl font-serif text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-light leading-tight">
                Precision at every
                <br />
                stage of the journey.
              </h2>
            </div>

            {/* RIGHT */}

            <div>
              <p className="max-w-xl text-xs sm:text-sm leading-6 sm:leading-8 text-white/75 md:text-base">
                We believe successful infrastructure projects
                depend on strong planning, technical accuracy,
                coordinated execution, and consistent attention
                to detail.
              </p>

              <div className="mt-6 sm:mt-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm backdrop-blur-sm">
                  Explore our services
                  <ArrowUpRight size={15} className="sm:size-4" />
                </div>
              </div>
            </div>
          </div>

          {/* PROCESS */}

          <div className="mt-10 sm:mt-16 grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["01", "Understand", "Understand the site, requirements, and project objectives."],
              ["02", "Plan", "Develop practical technical and project strategies."],
              ["03", "Execute", "Coordinate execution with attention to quality and detail."],
              ["04", "Deliver", "Complete the project with clear communication and accountability."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-b border-white/15 px-0 py-5 sm:border-r sm:px-6 sm:py-7 lg:border-b-0"
              >
                <span className="text-xs text-white/40">
                  {number}
                </span>

                <h3 className="mt-3 sm:mt-5 font-serif text-xl xs:text-2xl">
                  {title}
                </h3>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-white/60">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          OFFICE
      ===================================================== */}

      <section className="px-4 py-12 xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">

            <div>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                Visit Us
              </span>

              <h2 className="mt-3 sm:mt-5 font-serif text-3xl xs:text-4xl font-light md:text-6xl">
                ONSET
                <br />
                <span className="text-[#0066B4]">
                  INFRA
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-slate-500 md:text-base">
                Regency Complex
                <br />
                Puthiyatheru P O
                <br />
                Kannur - 670011
              </p>

              <a
                href="tel:+917559034444"
                className="
                  mt-5
                  sm:mt-6
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  bg-[#0066B4]
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#00528F]
                  xs:px-6
                  xs:py-3
                  xs:text-sm
                "
              >
                75590 34444
                <ArrowUpRight size={15} className="xs:size-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUs;

