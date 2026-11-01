import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ServiceModal({ selectedService, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (!selectedService) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Save initial overflow values
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
    };
  }, [selectedService, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  const paragraphs = selectedService?.details
    ? selectedService.details.split("\n\n").filter(Boolean)
    : [];

  return createPortal(
    <AnimatePresence>
      {selectedService && (
        <motion.div
          key="service-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[999999]
            flex
            items-center
            justify-center
            bg-black/75
            p-3
            sm:p-6
            backdrop-blur-md
            overflow-y-auto
            overscroll-contain
          "
        >
          <motion.div
            key="service-modal-card"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              my-auto
              flex
              max-h-[90vh]
              w-full
              max-w-2xl
              flex-col
              overflow-hidden
              rounded-[24px]
              bg-white
              shadow-2xl
              overscroll-contain
            "
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="
                absolute
                right-4
                top-4
                z-30
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white/95
                text-[#0066B4]
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-200
                hover:scale-105
                hover:bg-[#0066B4]
                hover:text-white
                active:scale-95
              "
            >
              <X size={18} strokeWidth={2.2} />
            </button>

            {/* MODAL HERO IMAGE */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-900 xs:h-56 sm:h-64">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/90 via-[#0066B4]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-16 text-white xs:bottom-5 xs:left-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7fc1f2] xs:text-[11px]">
                  {selectedService.category || "Service"} &bull; Spec {selectedService.number}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-light leading-tight xs:text-3xl">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* MODAL BODY */}
            <div className="overflow-y-auto overscroll-contain p-5 xs:p-6 sm:p-8">
              {/* PARAGRAPHS */}
              <div className="space-y-3.5 text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 md:text-base">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* DELIVERABLES LIST */}
              {selectedService.deliverables && selectedService.deliverables.length > 0 && (
                <div className="mt-6 rounded-2xl bg-[#F5F9FC] p-4 xs:mt-7 xs:p-5">
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0066B4] xs:text-xs">
                    Key Highlights & Scope
                  </h4>
                  <ul className="mt-3 space-y-2.5 xs:mt-4">
                    {selectedService.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs font-medium text-slate-700 xs:gap-3 md:text-sm"
                      >
                        <CheckCircle2 size={16} className="shrink-0 text-[#0066B4]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 xs:mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    rounded-full
                    border
                    border-slate-200
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-600
                    transition-all
                    hover:border-slate-300
                    hover:bg-slate-50
                    active:scale-95
                    xs:px-6
                    xs:py-3
                  "
                >
                  Close
                </button>

                <Link
                  to="/contact"
                  onClick={onClose}
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
                    shadow-md
                    shadow-[#0066B4]/20
                    transition-all
                    hover:bg-[#00528F]
                    hover:shadow-lg
                    hover:shadow-[#0066B4]/30
                    active:scale-95
                    xs:px-6
                    xs:py-3
                  "
                >
                  Discuss This Service
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
