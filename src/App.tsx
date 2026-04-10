/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Cpu, 
  Database, 
  Code2, 
  Globe, 
  BrainCircuit, 
  Layers,
  ChevronRight,
  Send
} from 'lucide-react';

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <h2 className="text-3xl md:text-4xl font-bold glow-text mb-4">{title}</h2>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
    <div className="h-1 w-20 bg-purple-500 mt-4 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
  </motion.div>
);

const SkillCard = ({ name, icon: Icon }: { name: string; icon: any }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="glass-card p-4 flex items-center gap-3 group"
  >
    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors">
      <Icon size={20} />
    </div>
    <span className="font-medium text-sm md:text-base">{name}</span>
  </motion.div>
);

const ProjectCard = ({ 
  title, 
  description, 
  tech, 
  features, 
  isFeatured = false 
}: { 
  title: string; 
  description: string; 
  tech: string[]; 
  features?: string[];
  isFeatured?: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass-card p-6 md:p-8 flex flex-col h-full ${isFeatured ? 'md:col-span-2 border-purple-500/30 bg-purple-500/5' : ''}`}
  >
    {isFeatured && (
      <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
        <Layers size={14} /> Featured Project
      </span>
    )}
    <h3 className={`font-bold mb-3 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{title}</h3>
    <p className="text-slate-400 mb-6 flex-grow leading-relaxed">{description}</p>
    
    {features && (
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Features:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {features.map((f, i) => (
            <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
              <ChevronRight size={12} className="text-purple-500" /> {f}
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="flex flex-wrap gap-2 mt-auto">
      {tech.map((t, i) => (
        <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 rounded-full text-slate-300">
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <div id="top" className="min-h-screen selection:bg-purple-500/30">
      {/* Background Glow Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-xl font-bold tracking-tight text-slate-900 transition-colors hover:text-indigo-600">
            Portfolio Page
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="section-container text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-emerald-500/10 border border-emerald-600/20 rounded-full text-emerald-700">
              Available for Opportunities
            </span>
            <h1 className="hero-display text-5xl md:text-7xl font-extrabold mb-6 leading-[0.95]">
              Building Intelligent Systems with <br />
              <span className="hero-accent-text">Artificial Intelligence and Machine learning, automations</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Final year AIML engineering student passionate about Artificial Intelligence, Machine Learning, and building scalable automations. I build real-world AI systems that solve practical problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="px-8 py-4 text-base md:text-lg bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2">
                View My Projects <ChevronRight size={18} />
              </a>
              <a href="#contact" className="px-8 py-4 text-base md:text-lg bg-emerald-700 hover:bg-emerald-600 text-amber-50 font-bold rounded-xl transition-all shadow-[0_10px_24px_rgba(6,95,70,0.22)] flex items-center justify-center gap-2">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Animated Hero Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[150px] rounded-full animate-pulse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative bg-white/[0.02]">
        <div className="section-container">
          <SectionHeader title="About Me" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-10"
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Lakshmi Narasimha prasad</h3>
              <p className="text-indigo-600 font-medium mb-6">Artificial Intelligence and Machine learning Engineer | Automations Specialist</p>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>I am a final year AIML engineering student with a strong foundation in Python and a deep passion for Machine Learning and Deep Learning.</p>
                <p>Currently, I am focused on developing AI-based models with the help of machine learning models for solar panel hotspot detection systems using satellite imagery, bridging the gap between geospatial AI and sustainable energy.</p>
                <p>My goal is to build production-ready, scalable Gen AI and Agentic AI systems, along with ML-powered intelligent automations that address real-world challenges in environmental monitoring and industrial automation.</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">Final</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Year Student</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">92%</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Model Accuracy</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">10+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">AI Projects</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">Python</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Expertise</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative">
        <div className="section-container">
          <SectionHeader title="Technical Skills" subtitle="A comprehensive toolkit for building modern AI and ML solutions." />
          
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                <BrainCircuit size={16} className="text-purple-500" /> Core AI & ML
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <SkillCard name="Python" icon={Code2} />
                <SkillCard name="Machine Learning" icon={BrainCircuit} />
                <SkillCard name="Deep Learning" icon={Layers} />
                <SkillCard name="Computer Vision" icon={Cpu} />
                <SkillCard name="Satellite Processing" icon={Globe} />
                <SkillCard name="Geospatial Analysis" icon={Database} />
                <SkillCard name="Data Science" icon={Database} />
                <SkillCard name="NLP" icon={BrainCircuit} />
                <SkillCard name="Gen AI" icon={BrainCircuit} />
                <SkillCard name="Agentic AI" icon={Cpu} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                  <Cpu size={16} className="text-purple-500" /> Frameworks & Tools
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCard name="TensorFlow" icon={Layers} />
                  <SkillCard name="PyTorch" icon={Layers} />
                  <SkillCard name="OpenCV" icon={Cpu} />
                  <SkillCard name="Scikit-Learn" icon={BrainCircuit} />
                  <SkillCard name="NumPy / Pandas" icon={Database} />
                  <SkillCard name="Git / Jupyter" icon={Code2} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                  <Globe size={16} className="text-purple-500" /> Other Technologies
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCard name="React (Beginner)" icon={Code2} />
                  <SkillCard name="Flutter (Basic)" icon={Code2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative bg-white/[0.02]">
        <div className="section-container">
          <SectionHeader title="Featured Projects" subtitle="Showcasing my work in AI, Computer Vision, and Automations." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard 
              isFeatured
              title="Satellite-Based Solar Plant Hotspot Detection System"
              description="Developed an AI-powered thermal anomaly detection system for solar plants using satellite thermal data (ECOSTRESS / thermal imagery). The system detects overheating solar panel zones, calculates degradation probability metrics, flags zones exceeding threshold, and generates automated inspection reports."
              features={[
                "Thermal hotspot identification",
                "Zone-wise degradation scoring",
                "Automated inspection recommendation",
                "Large-scale plant monitoring",
                "Logging and report generation pipeline"
              ]}
              tech={["Python", "Machine Learning", "Remote Sensing", "Geospatial Libraries"]}
            />
            
            <ProjectCard 
              title="Emotion Detection System"
              description="Built a real-time facial emotion recognition system using CNN and MTCNN. Achieved 92% accuracy on FER2013 dataset. Used in e-learning and mental health applications."
              tech={["CNN", "OpenCV", "MTCNN", "Python"]}
            />

            <ProjectCard 
              title="Drowsiness Detection System"
              description="Developed a driver fatigue detection system using OpenCV, EAR (Eye Aspect Ratio), and facial landmarks. Reduced false alerts by 25% through real-time notification tuning."
              tech={["OpenCV", "Facial Landmarks", "Python"]}
            />

            <ProjectCard 
              title="Sentiment Analysis System (BERT)"
              description="Fine-tuned BERT model for social media sentiment classification. Improved accuracy by 12% over traditional ML approaches. Deployed as REST API."
              tech={["BERT", "Transformers", "NLP", "REST API"]}
            />

            <ProjectCard 
              title="RON – AI Mental Health Chatbot"
              description="Hybrid CBT-based AI chatbot with mood tracking and journaling support. Features sentiment analysis, crisis detection, and emotional tracking."
              tech={["Python", "NLP", "Sentiment Analysis", "HTML/CSS"]}
            />

            <ProjectCard 
              title="Fake News Detection System"
              description="Built TF-IDF + Logistic Regression, Naive Bayes, and SVM pipeline for fake news classification. Achieved 88% F1-score on real-world dataset."
              tech={["TF-IDF", "SVM", "Naive Bayes", "Scikit-Learn"]}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Get In Touch" subtitle="Let's discuss how we can build the future of AI together." />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-8">
                <a
                  href="mailto:leo913173@gmail.com"
                  className="flex items-start gap-4 rounded-2xl p-2 -m-2 transition-all hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <Mail size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-slate-600 text-sm break-all">leo913173@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/lakshmi-narsimha-prasad-44306827b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl p-2 -m-2 transition-all hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <Linkedin size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900">LinkedIn</h4>
                    <p className="text-slate-600 text-sm break-words sm:truncate sm:max-w-[220px]">lakshmi-narsimha-prasad-44306827b</p>
                  </div>
                </a>
                <a
                  href="https://github.com/LNPrasad-droid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl p-2 -m-2 transition-all hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <Github size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900">GitHub</h4>
                    <p className="text-slate-600 text-sm break-all">github.com/LNPrasad-droid</p>
                  </div>
                </a>
              </div>

              <div className="md:col-span-2 glass-panel p-8 flex flex-col justify-center items-center text-center space-y-6">
                <BrainCircuit size={64} className="text-purple-500 animate-pulse" />
                <h3 className="text-2xl font-bold text-slate-900">Ready to Collaborate?</h3>
                <p className="text-slate-600">I'm currently looking for new opportunities and collaborations in Artificial Intelligence and Machine Learning. Feel free to reach out via email or connect on social media!</p>
                <a href="mailto:leo913173@gmail.com" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2">
                  Email Me Directly <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="https://github.com/LNPrasad-droid" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/lakshmi-narsimha-prasad-44306827b/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:leo913173@gmail.com" className="text-slate-500 hover:text-purple-400 transition-colors"><Mail size={20} /></a>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-left">
            © 2026 Lakshmi Narasimha prasad | Built with AI + Code
          </p>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            System Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
