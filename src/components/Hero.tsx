import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText, Send } from 'lucide-react';

const roles = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Deep Learning Enthusiast"
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full glass mb-6 border-ai-green/20"
        >
          <span className="text-ai-green text-xs font-mono tracking-widest uppercase">
            Available for Opportunities
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-[1.1] tracking-tighter">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-ai-green">Intelligence.</span>
          <br />
          Solving Real-World Problems.
        </h1>

        <div className="h-12 mb-8">
          <span className="text-xl md:text-3xl font-mono text-white/60">
            {displayText}
            <span className="animate-pulse text-ai-green">|</span>
          </span>
        </div>

        <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
          Aspiring AI/ML Engineer with strong expertise in deep learning, NLP, and predictive analytics, 
          building intelligent systems that solve real-world challenges.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 group transition-all hover:bg-ai-green"
          >
            View Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-full flex items-center justify-center gap-2 hover:border-white/40 transition-all"
          >
            Contact Me
            <Send size={18} />
          </motion.a>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full max-w-6xl">
        <div className="absolute top-0 left-0 w-72 h-72 bg-electric-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-ai-green/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};
