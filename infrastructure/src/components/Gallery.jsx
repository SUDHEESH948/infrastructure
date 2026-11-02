import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Play, Film } from "lucide-react";
import { fetchGalleryFromAPI } from "../services/api";

const isVideoUrl = (url) => /\.(mp4|webm|mov|mkv|ogg|avi)(\?.*)?$/i.test(url || "");

/* =========================================================
   GALLERY ITEMS (Different High-Res Project Images)
========================================================= */

const galleryItems = [
  {
    id: "01",
    category: "Infrastructure",
    title: "Expressway & Asphalt Paving",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "02",
    category: "Construction",
    title: "High-Rise Concrete Framing",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "03",
    category: "Surveying",
    title: "Total Station Geodetic Survey",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "04",
    category: "Infrastructure",
    title: "Highway Interchange Expansion",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "05",
    category: "Construction",
    title: "Reinforced Structural Civil Works",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "06",
    category: "Project Management",
    title: "On-Site Architectural Oversight",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "07",
    category: "Surveying",
    title: "Topographical Land Assessment",
    image:
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "08",
    category: "Infrastructure",
    title: "Bridge Foundation & Pier Construction",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
  },
];

const defaultCategories = [
  "All",
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState(galleryItems);

  // Dynamically compute all categories from default + live items
  const categories = [
    "All",
    ...Array.from(
      new Set([
        ...defaultCategories.filter((c) => c !== "All"),
        ...items.map((item) => item.category).filter(Boolean),
      ])
    ),
  ];

  // Fetch live gallery from backend API and auto-refresh on focus/updates
  useEffect(() => {
    let isMounted = true;
    const loadGallery = async () => {
      const liveItems = await fetchGalleryFromAPI();
      if (isMounted && liveItems && liveItems.length > 0) {
        const formatted = liveItems.map((item, idx) => ({
          id: item.galleryId || item.id || String(idx + 1).padStart(2, "0"),
          category: item.category,
          title: item.title,
          image: item.image,
          mediaType: item.mediaType || (isVideoUrl(item.image) ? "video" : "image"),
        }));
        setItems(formatted);
      }
    };

    loadGallery();

    const onFocus = () => loadGallery();
    window.addEventListener("focus", onFocus);
    const interval = setInterval(loadGallery, 6000);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);

  // Lock background scroll on open
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [selectedImage]);

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-white text-[#17221D]">
      {/* =====================================================
          UNIFIED GALLERY SECTION
      ===================================================== */}
      <section className="relative overflow-hidden px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        {/* BACKGROUND NUMBER */}
        <div className="pointer-events-none absolute -right-10 top-20 select-none font-serif text-[180px] font-light leading-none text-[#0066B4]/[0.04] md:text-[280px]">
          04
        </div>

        <div className="mx-auto max-w-7xl">
          {/* HEADER & INTRO */}
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
                Gallery &bull; Visual Archive
              </span>
            </div>

            <h1 className="max-w-6xl font-serif text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Ideas into
              <br />
              <span className="text-[#0066B4]">reality.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              A visual collection of our infrastructure, construction,
              surveying, and development work.
            </p>
          </motion.div>

          {/* FILTER CONTROLS */}
          <div className="mt-14 flex items-center border-b border-[#0066B4]/10 pb-6">
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
                        : "border-[#0066B4]/15 bg-white text-[#0066B4]/70 hover:border-[#0066B4]/40 hover:text-[#0066B4]"
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
            className="
              mt-10
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                  }}
                  className="
                    group
                    relative
                    h-[360px]
                    w-full
                    cursor-pointer
                    overflow-hidden
                    rounded-[24px]
                    bg-[#EAF2F7]
                    shadow-[0_8px_25px_rgba(0,102,180,0.06)]
                    transition-shadow
                    duration-500
                    hover:shadow-[0_16px_40px_rgba(0,102,180,0.18)]
                  "
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-full w-full overflow-hidden bg-slate-900">
                    {isVideoUrl(item.image) || item.mediaType === "video" ? (
                      <div className="relative h-full w-full">
                        <video
                          src={item.image}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        />
                        <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0066B4] shadow-md backdrop-blur-md">
                          <Play size={13} className="fill-[#0066B4] ml-0.5" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
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
                    )}

                    {/* DUAL GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/85 via-[#0066B4]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95 pointer-events-none" />

                    {/* TOP BADGE / NUMBER */}
                    <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[#0066B4] shadow-md backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* BOTTOM CONTENT OVERLAY */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7fc1f2]">
                        {item.category}
                      </span>

                      <h3 className="mt-1 font-serif text-xl font-light leading-snug tracking-wide text-white drop-shadow-sm sm:text-2xl">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/80 transition-colors group-hover:text-white">
                        <span>{isVideoUrl(item.image) || item.mediaType === "video" ? "Watch Video" : "View Image"}</span>
                        <ArrowUpRight
                          size={15}
                          className="
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                          "
                        />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          LIGHTBOX MODAL
      ===================================================== */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="
                  fixed
                  inset-0
                  z-[999999]
                  flex
                  items-center
                  justify-center
                  bg-black/80
                  p-4
                  backdrop-blur-md
                  md:p-8
                "
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    relative
                    flex
                    max-h-[92vh]
                    w-full
                    max-w-5xl
                    flex-col
                    overflow-hidden
                    rounded-[24px]
                    bg-white
                    shadow-2xl
                  "
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close modal"
                    className="
                      absolute
                      right-4
                      top-4
                      z-20
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-[#0066B4]
                      shadow-lg
                      backdrop-blur-md
                      transition-all
                      duration-200
                      hover:bg-[#0066B4]
                      hover:text-white
                    "
                  >
                    <X size={18} />
                  </button>

                  <div className="flex max-h-[72vh] w-full items-center justify-center overflow-hidden bg-[#0c1a24]">
                    {isVideoUrl(selectedImage.image) || selectedImage.mediaType === "video" ? (
                      <video
                        src={selectedImage.image}
                        controls
                        autoPlay
                        playsInline
                        className="max-h-[72vh] w-full object-contain"
                      />
                    ) : (
                      <img
                        src={selectedImage.image}
                        alt={selectedImage.title}
                        className="max-h-[72vh] w-full object-contain"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 p-5 md:px-7 md:py-5">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0066B4]">
                        {selectedImage.category}
                      </span>
                      <h3 className="mt-0.5 font-serif text-xl font-light text-[#17221D] md:text-2xl">
                        {selectedImage.title}
                      </h3>
                    </div>

                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {String(
                        filteredItems.findIndex(
                          (i) => (i.id || i.galleryId) === (selectedImage.id || selectedImage.galleryId)
                        ) + 1 || 1
                      ).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
};

export default Gallery;