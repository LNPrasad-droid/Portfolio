import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const skills = [
  { name: 'Py', color: 'bg-blue-500/20 text-blue-400' },
  { name: 'AI', color: 'bg-green-500/20 text-green-400' },
  { name: 'React', color: 'bg-cyan-500/20 text-cyan-400' },
  { name: 'ML', color: 'bg-purple-500/20 text-purple-400' },
  { name: 'DL', color: 'bg-red-500/20 text-red-400' },
  { name: 'NLP', color: 'bg-yellow-500/20 text-yellow-400' },
  { name: 'SQL', color: 'bg-indigo-500/20 text-indigo-400' },
  { name: 'CV', color: 'bg-pink-500/20 text-pink-400' },
];

export const SkillsVisualizer: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            The <span className="text-ai-green">Core.</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-lg leading-relaxed">
            My technical foundation is built on a diverse set of tools and frameworks. 
            I focus on creating efficient, scalable, and intelligent solutions.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-ai-green shadow-[0_0_10px_#39ff14]" />
              <span className="text-white/80 font-medium">Advanced Model Training</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_10px_#00d2ff]" />
              <span className="text-white/80 font-medium">Real-time Data Pipelines</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
              <span className="text-white/80 font-medium">Cloud-native AI Deployment</span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-full glass rounded-[3rem] overflow-hidden flex items-center justify-center"
          >
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[15rem] md:text-[20rem] font-bold text-white/[0.02] tracking-tighter">
                AI
              </span>
            </div>

            {/* Floating Circle */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-64 h-64 border border-electric-blue/20 rounded-full"
            />

            {/* Floating Skills */}
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                animate={{
                  x: [
                    Math.sin(i) * 100,
                    Math.cos(i) * 120,
                    Math.sin(i + 2) * 100,
                    Math.sin(i) * 100
                  ],
                  y: [
                    Math.cos(i) * 100,
                    Math.sin(i) * 120,
                    Math.cos(i + 2) * 100,
                    Math.cos(i) * 100
                  ],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={cn(
                  "absolute px-4 py-2 rounded-xl font-bold text-sm shadow-xl backdrop-blur-md border border-white/10",
                  skill.color
                )}
              >
                {skill.name}
              </motion.div>
            ))}

            {/* Center Piece */}
            <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-electric-blue to-ai-green flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.3)]">
              <span className="text-black font-bold text-3xl">N</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
