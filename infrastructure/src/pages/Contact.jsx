
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

      <section className="relative overflow-hidden bg-[#F5F9FC] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0066B4]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                Get In Touch
              </span>
            </div>

            <h1 className="max-w-6xl font-serif text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Let's build
              <br />

              <span className="text-[#0066B4]">
                something
              </span>

              <br />

              meaningful.
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              Have a project in mind? Connect with ONSET INFRA
              to discuss infrastructure, construction,
              surveying, permits, and project requirements.
            </p>
          </motion.div>
        </div>

        {/* DECORATIVE NUMBER */}

        <div className="pointer-events-none absolute -right-10 bottom-0 select-none font-serif text-[180px] font-light leading-none text-[#0066B4]/[0.04] md:text-[280px]">
          04
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            {/* =================================================
                CONTACT DETAILS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                Contact Details
              </span>

              <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-5xl">
                Start a
                <br />
                conversation.
              </h2>

              <div className="mt-10 space-y-5">

                {/* PHONE */}

                <a
                  href="tel:+917559034444"
                  className="
                    group
                    flex
                    items-center
                    gap-5
                    rounded-3xl
                    border
                    border-[#0066B4]/10
                    bg-[#F5F9FC]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#0066B4]/25
                    hover:shadow-[0_15px_40px_rgba(0,102,180,0.10)]
                  "
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                    <Phone size={20} />
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-slate-400">
                      Phone
                    </span>

                    <span className="mt-1 block text-base font-medium text-[#17221D]">
                      +91 75590 34444
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="ml-auto text-[#0066B4]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0066B4]"
                  />
                </a>

                {/* ADDRESS */}

                <div
                  className="
                    flex
                    items-start
                    gap-5
                    rounded-3xl
                    border
                    border-[#0066B4]/10
                    bg-[#F5F9FC]
                    p-5
                  "
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-slate-400">
                      Office
                    </span>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
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
                    gap-5
                    rounded-3xl
                    border
                    border-[#0066B4]/10
                    bg-[#F5F9FC]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#0066B4]/25
                    hover:shadow-[0_15px_40px_rgba(0,102,180,0.10)]
                  "
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0066B4] shadow-sm">
                    <Mail size={20} />
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-slate-400">
                      Email
                    </span>

                    <span className="mt-1 block text-sm font-medium text-[#17221D]">
                      Send us an enquiry
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="ml-auto text-[#0066B4]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0066B4]"
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
                rounded-[32px]
                border
                border-[#0066B4]/10
                bg-[#F5F9FC]
                p-6
                md:p-8
              "
            >
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0066B4]">
                  Project Enquiry
                </span>

                <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">
                  Tell us about your project.
                </h2>
              </div>

              <form className="space-y-5">

                {/* NAME */}

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#0066B4]/10
                      bg-white
                      px-5
                      py-4
                      text-sm
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-[#0066B4]/40
                      focus:ring-4
                      focus:ring-[#0066B4]/5
                    "
                  />
                </div>

                {/* PHONE + EMAIL */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                      Phone
                    </label>

                    <input
                      type="tel"
                      placeholder="Your phone number"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-[#0066B4]/10
                        bg-white
                        px-5
                        py-4
                        text-sm
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-[#0066B4]/40
                        focus:ring-4
                        focus:ring-[#0066B4]/5
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Your email address"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-[#0066B4]/10
                        bg-white
                        px-5
                        py-4
                        text-sm
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-[#0066B4]/40
                        focus:ring-4
                        focus:ring-[#0066B4]/5
                      "
                    />
                  </div>

                </div>

                {/* SERVICE */}

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Service Required
                  </label>

                  <select
                    defaultValue=""
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#0066B4]/10
                      bg-white
                      px-5
                      py-4
                      text-sm
                      text-slate-600
                      outline-none
                      transition-all
                      focus:border-[#0066B4]/40
                      focus:ring-4
                      focus:ring-[#0066B4]/5
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
                    <option>Estimation & Valuation</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Project Details
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Tell us about your project..."
                    className="
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-[#0066B4]/10
                      bg-white
                      px-5
                      py-4
                      text-sm
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-[#0066B4]/40
                      focus:ring-4
                      focus:ring-[#0066B4]/5
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
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-white
                    shadow-lg
                    shadow-[#0066B4]/15
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#00528F]
                  "
                >
                  Send Enquiry

                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
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

      <section className="bg-[#0066B4] px-5 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                ONSET INFRA
              </span>

              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-light leading-tight md:text-6xl">
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
                px-6
                py-3.5
                text-sm
                font-medium
                text-[#0066B4]
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              Call 75590 34444
              <ArrowUpRight size={17} />
            </a>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;

