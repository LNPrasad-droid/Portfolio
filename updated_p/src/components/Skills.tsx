import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const skillCategories = [
  {
    title: 'AI/ML',
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'Deep Learning', level: 85 },
      { name: 'NLP', level: 80 },
      { name: 'CNN/RNN/LSTM', level: 85 },
      { name: 'Transformers', level: 75 },
    ]
  },
  {
    title: 'Programming',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 80 },
      { name: 'C', level: 70 },
      { name: 'Java', level: 75 },
    ]
  },
  {
    title: 'Tools & Frameworks',
    skills: [
      { name: 'TensorFlow/PyTorch', level: 85 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'Pandas/NumPy', level: 95 },
      { name: 'Power BI', level: 80 },
    ]
  }
];

const floatingTags = [
  "Model Deployment", "Data Visualization", "Predictive Analytics", 
  "Computer Vision", "Geospatial Data", "REST APIs", "Cloud Computing"
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Technical <span className="text-electric-blue">Arsenal.</span>
          </h2>
          <p className="text-white/50 mb-12 max-w-lg">
            I build intelligent systems with precision, scalability, and real-world impact. 
            My expertise spans the entire AI lifecycle from data engineering to model deployment.
          </p>

          <div className="flex flex-wrap gap-3">
            {floatingTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, color: '#00d2ff' }}
                className="px-4 py-2 rounded-xl glass text-sm font-medium transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title}>
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-white/30 mb-6">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, i) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80 font-medium">{skill.name}</span>
                      <span className="text-white/40 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 + catIdx * 0.2 }}
                        className="h-full bg-gradient-to-r from-electric-blue to-ai-green rounded-full shadow-[0_0_10px_rgba(0,210,255,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
