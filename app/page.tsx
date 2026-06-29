"use client";

import { useState } from "react";
import { BootSequence } from "@/components/boot/BootSequence";
import { NeuralBackground } from "@/components/three/NeuralBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <NeuralBackground />
      <div className="grain-overlay" />

      {/* Decorative floating blur spheres */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-accent-blue/15 filter blur-[80px] sm:blur-[120px] animate-blob" />
        <div className="absolute bottom-[20%] left-[-15%] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-accent-violet/10 filter blur-[90px] sm:blur-[140px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[30%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full bg-accent-cyan/15 filter blur-[80px] sm:blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
