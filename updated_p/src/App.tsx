import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';
import { SkillsVisualizer } from './components/SkillsVisualizer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-ai-green/30 selection:text-ai-green">
      <CustomCursor />
      <Background />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue to-ai-green z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto"
        >
          <Projects />
          <Skills />
          <SkillsVisualizer />
          <Education />
          
          {/* Soft Skills Section (Visual) */}
          <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="glass p-12 rounded-[3rem] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ai-green/5 to-electric-blue/5 -z-10" />
              <h2 className="text-3xl md:text-5xl font-bold mb-12">
                Beyond the <span className="text-ai-green">Code.</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { name: 'Problem Solving', icon: '🧩' },
                  { name: 'Teamwork', icon: '🤝' },
                  { name: 'Communication', icon: '🗣️' },
                  { name: 'Adaptability', icon: '🔄' }
                ].map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <span className="text-4xl">{skill.icon}</span>
                    <span className="font-display font-medium text-white/80">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-12 text-white/40 font-mono text-sm tracking-widest italic">
                "I build intelligent systems with precision, scalability, and real-world impact."
              </p>
            </div>
          </section>

          <Contact />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
