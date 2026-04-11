import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Code, Briefcase, GraduationCap, Mail, User } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'About', icon: User, href: '#about' },
  { name: 'Projects', icon: Code, href: '#projects' },
  { name: 'Skills', icon: Cpu, href: '#skills' },
  { name: 'Education', icon: GraduationCap, href: '#education' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 px-6 py-3 rounded-full glass',
          scrolled ? 'w-[90%] md:w-auto opacity-100' : 'w-[95%] md:w-auto opacity-90'
        )}
      >
        <div className="flex items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-ai-green flex items-center justify-center">
              <span className="text-black font-bold text-lg">N</span>
            </div>
            <span className="hidden sm:block font-display font-bold tracking-tighter text-xl">
              NARASIMHA<span className="text-ai-green">.AI</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-white/70 hover:text-ai-green transition-colors flex items-center gap-2"
              >
                <item.icon size={14} />
                {item.name}
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden glass flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-bold text-white/80 hover:text-ai-green transition-colors flex items-center gap-4"
              >
                <item.icon size={24} />
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
