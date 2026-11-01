
import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Mail,
  ArrowUpRight,
  Send,
} from "lucide-react";

const Contact = () => {
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
                Get In Touch
              </span>
            </div>

            <h1 className="max-w-6xl font-serif text-3xl font-light leading-[0.98] tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:leading-[0.95]">
              Let's build
              <br />

              <span className="text-[#0066B4]">
                something
              </span>

              <br />

              meaningful.
            </h1>

            <p className="mt-4 sm:mt-8 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-500 md:text-base">
              Have a project in mind? Connect with ONSET INFRA
              to discuss infrastructure, construction,
              surveying, permits, and project requirements.
            </p>
          </motion.div>
        </div>

        {/* DECORATIVE NUMBER */}

        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[120px] font-light leading-none text-[#0066B4]/[0.04] xs:text-[160px] sm:-right-10 sm:text-[220px] md:text-[280px]">
          04
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="px-4 py-12 xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            {/* =================================================
                CONTACT DETAILS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                Contact Details
              </span>

              <h2 className="mt-3 sm:mt-5 font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Start a
                <br />
                conversation.
              </h2>

              <div className="mt-6 sm:mt-10 space-y-3 sm:space-y-5">

                {/* PHONE */}

                <a
                  href="tel:+917559034444"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#0066B4]/10
                    bg-[#F5F9FC]
                    p-3.5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#0066B4]/25
                    hover:shadow-[0_15px_40px_rgba(0,102,180,0.10)]
                    xs:gap-5
                    xs:rounded-3xl
                    xs:p-5
                  "
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12 xs:rounded-2xl">
                    <Phone size={18} className="xs:size-5" />
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 xs:text-[10px]">
                      Phone
                    </span>

                    <span className="mt-0.5 block text-sm font-medium text-[#17221D] xs:mt-1 xs:text-base">
                      +91 75590 34444
                    </span>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="ml-auto shrink-0 text-[#0066B4]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0066B4] xs:size-[18px]"
                  />
                </a>

                {/* ADDRESS */}

                <div
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-[#0066B4]/10
                    bg-[#F5F9FC]
                    p-3.5
                    xs:gap-5
                    xs:rounded-3xl
                    xs:p-5
                  "
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12 xs:rounded-2xl">
                    <MapPin size={18} className="xs:size-5" />
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 xs:text-[10px]">
                      Office
                    </span>

                    <p className="mt-1 text-xs leading-5 text-slate-600 xs:mt-2 xs:text-sm xs:leading-6">
                      ONSET INFRA
                      <br />
                      Regency Complex
                      <br />
                      Puthiyatheru P O
                      <br />
                      Kannur - 670011
                    </p>
                  </div>
                </div>

                {/* EMAIL */}

                <a
                  href="mailto:info@onsetinfra.com"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#0066B4]/10
                    bg-[#F5F9FC]
                    p-3.5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#0066B4]/25
                    hover:shadow-[0_15px_40px_rgba(0,102,180,0.10)]
                    xs:gap-5
                    xs:rounded-3xl
                    xs:p-5
                  "
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0066B4] shadow-sm xs:h-12 xs:w-12 xs:rounded-2xl">
                    <Mail size={18} className="xs:size-5" />
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 xs:text-[10px]">
                      Email
                    </span>

                    <span className="mt-0.5 block text-xs font-medium text-[#17221D] xs:mt-1 xs:text-sm">
                      Send us an enquiry
                    </span>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="ml-auto shrink-0 text-[#0066B4]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0066B4] xs:size-[18px]"
                  />
                </a>

              </div>
            </motion.div>

            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="
                rounded-[22px]
                border
                border-[#0066B4]/10
                bg-[#F5F9FC]
                p-4
                xs:rounded-[32px]
                xs:p-6
                md:p-8
              "
            >
              <div className="mb-5 xs:mb-8">
                <span className="text-[10px] xs:text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0066B4]">
                  Project Enquiry
                </span>

                <h2 className="mt-2 font-serif text-2xl font-light xs:mt-3 xs:text-3xl md:text-4xl">
                  Tell us about your project.
                </h2>
              </div>

              <form className="space-y-4 xs:space-y-5">

                {/* NAME */}

                <div>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-slate-500 xs:mb-2 xs:text-xs font-medium">
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#0066B4]/10
                      bg-white
                      px-3.5
                      py-3
                      text-xs
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-[#0066B4]/40
                      focus:ring-4
                      focus:ring-[#0066B4]/5
                      xs:rounded-2xl
                      xs:px-5
                      xs:py-4
                      xs:text-sm
                    "
                  />
                </div>

                {/* PHONE + EMAIL */}

                <div className="grid grid-cols-1 gap-4 xs:gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-slate-500 xs:mb-2 xs:text-xs font-medium">
                      Phone
                    </label>

                    <input
                      type="tel"
                      placeholder="Your phone number"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#0066B4]/10
                        bg-white
                        px-3.5
                        py-3
                        text-xs
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-[#0066B4]/40
                        focus:ring-4
                        focus:ring-[#0066B4]/5
                        xs:rounded-2xl
                        xs:px-5
                        xs:py-4
                        xs:text-sm
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-slate-500 xs:mb-2 xs:text-xs font-medium">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Your email address"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#0066B4]/10
                        bg-white
                        px-3.5
                        py-3
                        text-xs
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-[#0066B4]/40
                        focus:ring-4
                        focus:ring-[#0066B4]/5
                        xs:rounded-2xl
                        xs:px-5
                        xs:py-4
                        xs:text-sm
                      "
                    />
                  </div>

                </div>

                {/* SERVICE */}

                <div>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-slate-500 xs:mb-2 xs:text-xs font-medium">
                    Service Required
                  </label>

                  <select
                    defaultValue=""
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#0066B4]/10
                      bg-white
                      px-3.5
                      py-3
                      text-xs
                      text-slate-600
                      outline-none
                      transition-all
                      focus:border-[#0066B4]/40
                      focus:ring-4
                      focus:ring-[#0066B4]/5
                      xs:rounded-2xl
                      xs:px-5
                      xs:py-4
                      xs:text-sm
                    "
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    <option>Land Surveying</option>
                    <option>Road & Building Construction</option>
                    <option>Project Management</option>
                    <option>Local Body Permits</option>
                    <option>NHA / NHAI Services</option>
                    <option>Airport NOC</option>
                    <option>GPS Surveying</option>
                    <option>Estimation & Valuation</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-slate-500 xs:mb-2 xs:text-xs font-medium">
                    Project Details
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Tell us about your project..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-[#0066B4]/10
                      bg-white
                      px-3.5
                      py-3
                      text-xs
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-[#0066B4]/40
                      focus:ring-4
                      focus:ring-[#0066B4]/5
                      xs:rounded-2xl
                      xs:px-5
                      xs:py-4
                      xs:text-sm
                    "
                  />
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#0066B4]
                    px-5
                    py-3
                    text-xs
                    font-medium
                    text-white
                    shadow-lg
                    shadow-[#0066B4]/15
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#00528F]
                    xs:px-6
                    xs:py-4
                    xs:text-sm
                  "
                >
                  Send Enquiry

                  <Send
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 xs:size-4"
                  />
                </button>

              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-[#0066B4] px-4 py-12 text-white xs:px-6 xs:py-16 sm:px-10 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs sm:tracking-[0.3em]">
                ONSET INFRA
              </span>

              <h2 className="mt-3 font-serif text-2xl font-light leading-tight xs:mt-4 xs:text-3xl sm:text-4xl md:text-6xl">
                Have a project
                <br />
                in mind?
              </h2>
            </div>

            <a
              href="tel:+917559034444"
              className="
                inline-flex
                w-fit
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
              Call 75590 34444
              <ArrowUpRight size={16} className="xs:size-[17px]" />
            </a>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;

