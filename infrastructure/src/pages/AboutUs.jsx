
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

      <section className="relative overflow-hidden px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
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

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0066B4]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                About Onset Infra
              </span>
            </div>

            {/* TITLE */}

            <h1 className="max-w-6xl font-serif text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Building the
              <br />

              <span className="text-[#0066B4]">
                infrastructure
              </span>

              <br />

              of tomorrow.
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-10 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
              ONSET INFRA is an engineering and infrastructure
              consultancy focused on delivering practical,
              reliable, and professionally managed solutions
              for construction and development projects.
            </p>
          </motion.div>
        </div>

        {/* DECORATIVE NUMBER */}

        <div className="pointer-events-none absolute -right-10 bottom-0 select-none font-serif text-[180px] font-light leading-none text-[#0066B4]/[0.04] md:text-[280px]">
          01
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="bg-[#F5F9FC] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">

            {/* LEFT */}

            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                Who We Are
              </span>

              <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-5xl">
                Engineering
                <br />
                with purpose.
              </h2>
            </div>

            {/* RIGHT */}

            <div className="space-y-6 text-sm leading-8 text-slate-500 md:text-base">
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

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-12 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0066B4]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                What We Do
              </span>
            </div>

            <h2 className="font-serif text-4xl font-light leading-tight md:text-6xl">
              One platform.
              <br />
              <span className="text-[#0066B4]">
                Multiple capabilities.
              </span>
            </h2>
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 01 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[28px] border border-[#0066B4]/10 bg-[#F5F9FC] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                <Ruler size={22} />
              </div>

              <span className="mt-8 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50">
                01
              </span>

              <h3 className="mt-3 font-serif text-2xl">
                Surveying
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Accurate land and site surveying to support
                planning, construction, and development.
              </p>
            </motion.article>

            {/* CARD 02 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[28px] border border-[#0066B4]/10 bg-[#F5F9FC] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                <Building2 size={22} />
              </div>

              <span className="mt-8 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50">
                02
              </span>

              <h3 className="mt-3 font-serif text-2xl">
                Construction
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Road, building, and civil construction
                solutions focused on practical execution.
              </p>
            </motion.article>

            {/* CARD 03 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[28px] border border-[#0066B4]/10 bg-[#F5F9FC] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                <HardHat size={22} />
              </div>

              <span className="mt-8 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50">
                03
              </span>

              <h3 className="mt-3 font-serif text-2xl">
                Project Management
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Planning, coordination, quality monitoring,
                and delivery across project stages.
              </p>
            </motion.article>

            {/* CARD 04 */}

            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[28px] border border-[#0066B4]/10 bg-[#F5F9FC] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                <Map size={22} />
              </div>

              <span className="mt-8 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50">
                04
              </span>

              <h3 className="mt-3 font-serif text-2xl">
                Permits & Approvals
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
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

      <section className="bg-[#0066B4] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">

            {/* LEFT */}

            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                Our Approach
              </span>

              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-tight md:text-6xl">
                Precision at every
                <br />
                stage of the journey.
              </h2>
            </div>

            {/* RIGHT */}

            <div>
              <p className="max-w-xl text-sm leading-8 text-white/75 md:text-base">
                We believe successful infrastructure projects
                depend on strong planning, technical accuracy,
                coordinated execution, and consistent attention
                to detail.
              </p>

              <div className="mt-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm backdrop-blur-sm">
                  Explore our services

                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* PROCESS */}

          <div className="mt-16 grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["01", "Understand", "Understand the site, requirements, and project objectives."],
              ["02", "Plan", "Develop practical technical and project strategies."],
              ["03", "Execute", "Coordinate execution with attention to quality and detail."],
              ["04", "Deliver", "Complete the project with clear communication and accountability."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-b border-white/15 px-0 py-7 sm:border-r sm:px-6 lg:border-b-0"
              >
                <span className="text-xs text-white/40">
                  {number}
                </span>

                <h3 className="mt-5 font-serif text-2xl">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/60">
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

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                Visit Us
              </span>

              <h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">
                ONSET
                <br />
                <span className="text-[#0066B4]">
                  INFRA
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-sm leading-7 text-slate-500 md:text-base">
                Regency Complex
                <br />
                Puthiyatheru P O
                <br />
                Kannur - 670011
              </p>

              <a
                href="tel:+917559034444"
                className="
                  mt-6
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  bg-[#0066B4]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#00528F]
                "
              >
                75590 34444
                <ArrowUpRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUs;

