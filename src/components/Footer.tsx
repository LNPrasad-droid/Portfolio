import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-ai-green flex items-center justify-center">
              <span className="text-black font-bold text-sm">N</span>
            </div>
            <span className="font-display font-bold tracking-tighter text-lg">
              NARASIMHA<span className="text-ai-green">.AI</span>
            </span>
          </div>
          <p className="text-white/30 text-xs font-mono">
            Building intelligent systems with passion 🚀
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/LNPrasad-droid" target="_blank" rel="noreferrer" className="text-white/40 hover:text-ai-green transition-colors">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/lakshmi-narsimha-prasad" target="_blank" rel="noreferrer" className="text-white/40 hover:text-electric-blue transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:leo913173@gmail.com" className="text-white/40 hover:text-white transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-white/40 text-sm flex items-center justify-center md:justify-end gap-1">
            © {new Date().getFullYear()} Narasimha.
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-widest mt-1">
            Designed for the future
          </p>
        </div>
      </div>
    </footer>
  );
};
