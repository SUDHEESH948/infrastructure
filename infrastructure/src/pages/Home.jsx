import React from "react";
import Hero from "../components/Hero";
import Expertise from "../components/Expertise";
import Projects from "../components/Projects";
import Gallery from "../components/Gallery";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <main className="relative">
        {/* HERO / HOME */}
        <section id="home" className="relative z-0 h-screen">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <Hero />
          </div>
        </section>

        {/* SERVICES / EXPERTISE */}
        <section
          id="services"
          className="relative z-10 w-full bg-[#F5F9FC] shadow-[0_-20px_50px_rgba(0,102,180,0.08)]"
        >
          <Expertise />
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="relative z-20 w-full bg-[#F7FAFC]"
        >
          <Projects />
        </section>
         <section
          id="projects"
          className="relative z-20 w-full bg-[#F7FAFC]"
        >
          <Gallery />
        </section>
      </main>
    </div>
  );
};

export default Home;