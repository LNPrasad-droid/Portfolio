import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
  {
    degree: 'B.E – Artificial Intelligence and Machine Learning',
    institution: 'Coorg Institute of Technology',
    period: '2022 – Present',
    score: 'CGPA: 8.06',
    description: 'Focusing on Artificial Intelligence, Machine Learning, and Data Structures.'
  },
  {
    degree: 'Pre-University Course (PUC)',
    institution: 'St. Joseph’s College',
    period: '2020 – 2022',
    score: 'Percentage: 75%',
    description: 'Specialized in Physics, Chemistry, Mathematics, and Computer Science.'
  },
  {
    degree: 'SSLC',
    institution: 'St. John’s High School',
    period: '2019 – 2020',
    score: 'Percentage: 89%',
    description: 'Foundation in science and mathematics with consistent academic performance.'
  }
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Academic <span className="text-ai-green">Journey.</span>
        </h2>
        <p className="text-white/50">My educational background and academic milestones.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {education.map((item, i) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-deep-bg text-ai-green shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:border-ai-green/50">
              <GraduationCap size={18} />
            </div>

            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-3xl transition-all group-hover:border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-white group-hover:text-ai-green transition-colors">{item.degree}</h3>
                <span className="text-xs font-mono text-ai-green bg-ai-green/10 px-2 py-1 rounded-full">{item.score}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                <Calendar size={14} />
                <span>{item.period}</span>
              </div>
              <p className="text-white/60 text-sm font-medium mb-2">{item.institution}</p>
              <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
