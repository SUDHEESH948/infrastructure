import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Palette,
  FileCheck2,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

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
                Onset Infra &bull; Engineers and Interior Designers
              </span>
            </div>

            {/* TITLE */}
            <h1 className="max-w-6xl font-serif text-3xl font-light leading-[0.98] tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:leading-[0.95]">
              Building the
              <br />
              <span className="text-[#0066B4]">infrastructure</span>
              <br />
              of tomorrow.
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 sm:mt-10 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 md:text-lg">
              ONSET INFRA is a team of Engineers and Interior Designers delivering comprehensive building &amp; road contracting, bespoke interior design, modular kitchens, statutory permits, Airport NOC, GPS surveying, renovation, and 3D visualization.
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
                Engineering &amp;
                <br />
                Interior Design.
              </h2>
            </div>

            {/* RIGHT */}
            <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm leading-6 sm:leading-8 text-slate-500 md:text-base">
              <p>
                ONSET INFRA brings together structural engineering, interior architecture, road contracting, modular kitchen crafting, statutory permits, and 3D visualization under one unified firm.
              </p>

              <p>
                Our approach is centered around accurate planning, technical coordination, responsible execution, and clear communication throughout every stage of a project.
              </p>

              <p>
                From heavy civil contracting and highway access permits to luxury interiors and photorealistic 3D renders, we provide solutions that support the technical and aesthetic requirements of modern development.
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
                Complete capabilities.
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
                <Building2 size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                01
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Building &amp; Road
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Turnkey civil construction, building contracting, and asphalt road infrastructure.
              </p>
            </motion.article>

            {/* CARD 02 */}
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <Palette size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                02
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Interiors &amp; Kitchens
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Bespoke interior design, custom spaces, luxury finishes, and ergonomic modular kitchens.
              </p>
            </motion.article>

            {/* CARD 03 */}
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <FileCheck2 size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                03
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Permits &amp; Clearances
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Local municipal body approvals, town planning sanctions, and NHAI highway access permits.
              </p>
            </motion.article>

            {/* CARD 04 */}
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[22px] border border-[#0066B4]/10 bg-[#F5F9FC] p-5 xs:rounded-[28px] xs:p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12">
                <Layers size={20} className="xs:size-[22px]" />
              </div>

              <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-[#0066B4]/50 xs:mt-8">
                04
              </span>

              <h3 className="mt-2 font-serif text-xl xs:mt-3 xs:text-2xl">
                Valuation &amp; 3D
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 xs:mt-3 xs:text-sm xs:leading-6">
                Accurate building valuation, BOQ estimation, and photorealistic 3D architectural renders.
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
                We believe successful infrastructure and interior design projects
                depend on strong planning, technical accuracy,
                coordinated execution, and consistent attention
                to detail.
              </p>

              <div className="mt-6 sm:mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm backdrop-blur-sm transition-all hover:bg-white hover:text-[#0066B4]"
                >
                  Explore our services
                  <ArrowUpRight size={15} className="sm:size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
