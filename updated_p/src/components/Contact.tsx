import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Let's <span className="text-ai-green">Connect.</span>
          </h2>
          <p className="text-white/50 mb-12 max-w-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-ai-green group-hover:bg-ai-green group-hover:text-black transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:leo913173@gmail.com" className="text-lg font-medium hover:text-ai-green transition-colors">
                  leo913173@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-black transition-all">
                <Linkedin size={20} />
              </div>
              <div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/in/lakshmi-narsimha-prasad-44306827b/" target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-electric-blue transition-colors">
                  lakshmi-narsimha-prasad
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Location</p>
                <p className="text-lg font-medium">Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-8"
        >
          <div className="w-20 h-20 rounded-full bg-ai-green/10 flex items-center justify-center text-ai-green mb-4">
            <Mail size={40} />
          </div>
          <h3 className="text-3xl font-bold">Ready to start a project?</h3>
          <p className="text-white/50 max-w-sm">
            Skip the forms and reach out directly. I'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:leo913173@gmail.com"
            className="w-full py-6 bg-ai-green text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-ai-green/80 transition-all active:scale-[0.98] text-xl"
          >
            Open Email Client
            <Send size={24} />
          </a>
          <p className="text-xs font-mono text-white/20 uppercase tracking-widest">
            Typically responds within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};
