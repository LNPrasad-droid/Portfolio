import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Satellite, Brain, Eye, MessageSquare, ShieldAlert, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const projects = [
  {
    id: 'featured',
    title: 'Satellite-Based Solar Plant Hotspot Detection System',
    description: 'Developed an AI-powered thermal anomaly detection system using satellite thermal data (ECOSTRESS / thermal imagery). The system detects overheating zones, calculates degradation probability, flags critical areas, and generates automated inspection reports.',
    features: [
      'Thermal hotspot identification',
      'Zone-wise degradation scoring',
      'Automated inspection recommendations',
      'Large-scale solar plant monitoring',
      'Logging & report generation pipeline'
    ],
    tech: ['Python', 'Machine Learning', 'Remote Sensing', 'Geospatial Libraries'],
    icon: Satellite,
    featured: true,
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 'emotion',
    title: 'Emotion Detection System',
    description: 'CNN + OpenCV model with 92% accuracy for real-time emotion recognition.',
    tech: ['CNN', 'OpenCV', 'Python', 'Keras'],
    icon: Brain,
    featured: false
  },
  {
    id: 'drowsiness',
    title: 'Drowsiness Detection',
    description: 'Driver fatigue detection using EAR & facial landmarks to prevent accidents.',
    tech: ['Dlib', 'OpenCV', 'Python'],
    icon: Eye,
    featured: false
  },
  {
    id: 'sentiment',
    title: 'Sentiment Analysis (BERT)',
    description: 'Improved accuracy by 12% with BERT-based model and REST API deployment.',
    tech: ['BERT', 'Transformers', 'PyTorch', 'FastAPI'],
    icon: MessageSquare,
    featured: false
  },
  {
    id: 'ron',
    title: 'RON AI Assistant',
    description: 'NLP-based assistant with reminders, automation, and natural conversation.',
    tech: ['NLP', 'Python', 'SpeechRecognition'],
    icon: Zap,
    featured: false
  },
  {
    id: 'fake-news',
    title: 'Fake News Detection',
    description: 'ML models achieving 88% F1-score in identifying misinformation.',
    tech: ['Scikit-learn', 'NLP', 'Random Forest'],
    icon: ShieldAlert,
    featured: false
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Featured <span className="text-ai-green">Work.</span>
          </h2>
          <p className="text-white/50 max-w-xl">
            A selection of my most significant AI/ML projects, ranging from computer vision to geospatial analytics.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
            Scroll to explore
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group relative rounded-3xl p-8 glass overflow-hidden transition-all duration-500 hover:border-white/20",
              project.featured ? "md:col-span-2 lg:col-span-2" : ""
            )}
          >
            {/* Background Glow */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
              project.featured ? project.color : "from-electric-blue/10 to-transparent"
            )} />

            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className={cn(
                  "p-3 rounded-2xl",
                  project.featured ? "bg-ai-green/20 text-ai-green" : "bg-white/5 text-white/70"
                )}>
                  <project.icon size={24} />
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/LNPrasad-droid" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              <h3 className={cn(
                "font-bold mb-4 group-hover:text-ai-green transition-colors",
                project.featured ? "text-3xl md:text-4xl" : "text-xl"
              )}>
                {project.title}
              </h3>

              <p className="text-white/60 mb-6 text-sm md:text-base line-clamp-3">
                {project.description}
              </p>

              {project.featured && (
                <div className="mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features?.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1 h-1 rounded-full bg-ai-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-white/50 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
