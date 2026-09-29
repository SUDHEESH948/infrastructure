
import React, { useState } from "react";

const newsItems = [
  {
    id: 1,
    tag: "Project",
    title:
      "Integrated Infrastructure Planning and Development Solutions",
    date: "14 Sep 2026",
    image:
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSshg-9jcs6vACon3aS35RHsrZR-oIsYUwlAe8U29FT8_9Qow39WlzANrdQnDvrSJyZRVbL8eVvjCZrjIY",
    bgHeadline: "Infrastructure Development",
  },

  {
    id: 2,
    tag: "Project",
    title:
      "Modern Engineering Solutions for Commercial and Residential Development",
    date: "15 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    bgHeadline: "Modern Development",
  },

  {
    id: 3,
    tag: "Project",
    title:
      "Professional Planning, Surveying and Engineering Consultancy",
    date: "12 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    bgHeadline: "Engineering Excellence",
  },

  {
    id: 4,
    tag: "Project",
    title:
      "Complete Road, Building and Infrastructure Project Management",
    date: "17 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    bgHeadline: "Project Management",
  },
];

export default function Projects() {
  const [activeItem, setActiveItem] = useState(newsItems[0]);

  return (
    <section
      id="projects"
      className="
        relative
        flex
        min-h-screen
        w-full
        flex-col
        justify-between
        overflow-hidden
        bg-[#F7FAFC]
        px-6
        py-16
        text-[#17221D]
        md:px-12
        md:py-20
      "
    >
      {/* =====================================================
          BACKGROUND WATERMARK
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          right-6
          top-1/2
          z-0
          -translate-y-1/2
          select-none
          overflow-hidden
        "
      >
        <h2
          className="
            whitespace-nowrap
            text-4xl
            font-bold
            uppercase
            tracking-wider
            text-[#0066B4]/[0.055]
            transition-all
            duration-700
            ease-out
            md:text-7xl
            lg:text-8xl
          "
        >
          {activeItem.bgHeadline}
        </h2>
      </div>

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          mb-12
          w-full
          max-w-7xl
        "
      >
        <div
          className="
            mb-5
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-10
              bg-[#0066B4]
            "
          />

          <span
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#0066B4]
            "
          >
            Selected Projects
          </span>
        </div>

        <h2
          className="
            font-serif
            text-5xl
            font-light
            leading-[0.95]
            tracking-tight
            text-[#17221D]
            md:text-7xl
          "
        >
          Building
          <br />

          <span className="text-[#0066B4]">
            with purpose.
          </span>
        </h2>
      </div>

      {/* =====================================================
          PROJECT CARDS
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {newsItems.map((item) => (
          <article
            key={item.id}
            onMouseEnter={() => setActiveItem(item)}
            className="
              group
              relative
              flex
              cursor-pointer
              flex-col
              border-t
              border-[#0066B4]/20
              pb-6
              pt-5
              transition-all
              duration-300
              hover:border-[#0066B4]
            "
          >
            {/* =================================================
                IMAGE
            ================================================= */}

            <div
              className="
                relative
                mb-5
                aspect-[4/3]
                w-full
                overflow-hidden
                rounded-2xl
                bg-[#EAF2F7]
                shadow-[0_10px_35px_rgba(0,102,180,0.06)]
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-all
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* LIGHT BLUE OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#0066B4]/10
                  transition-opacity
                  duration-300
                  group-hover:opacity-0
                "
              />

              {/* PROJECT NUMBER */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/95
                  text-[11px]
                  font-semibold
                  text-[#0066B4]
                  shadow-lg
                  backdrop-blur-md
                "
              >
                {String(item.id).padStart(2, "0")}
              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  flex
                  h-10
                  w-10
                  translate-y-3
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0066B4]
                  text-white
                  opacity-0
                  shadow-xl
                  transition-all
                  duration-300
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <span className="text-lg">
                  ↗
                </span>
              </div>
            </div>

            {/* =================================================
                META TAG
            ================================================= */}

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#0066B4]/60
                transition-colors
                duration-200
                group-hover:text-[#0066B4]
              "
            >
              {item.tag}
            </span>

            {/* =================================================
                TITLE
            ================================================= */}

            <h3
              className="
                mt-2
                line-clamp-3
                text-sm
                font-medium
                leading-snug
                text-[#17221D]
                transition-colors
                duration-200
                group-hover:text-[#0066B4]
                md:text-base
              "
            >
              {item.title}
            </h3>

            {/* =================================================
                DATE
            ================================================= */}

            <span
              className="
                mt-auto
                pt-5
                font-mono
                text-[12px]
                text-slate-400
              "
            >
              {item.date}
            </span>

            {/* BOTTOM LINE */}

            
          </article>
        ))}
      </div>
    </section>
  );
}