import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Eye, Code2, Layers, Award } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      name: "Car Rent",
      description: "Simplify your car rental experience with our streamlined platform. Find, book, and manage your vehicle rentals with ease.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
      source_code_link: "https://github.com/",
      live_demo_link: "https://example.com/",
    },
    {
      name: "Job IT",
      description: "Web application that enables users to search for job openings, view detailed job descriptions, and apply for positions.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      source_code_link: "https://github.com/",
      live_demo_link: "https://example.com/",
    },
    {
      name: "Trip Guide",
      description: "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and manage their trips.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800",
      source_code_link: "https://github.com/",
      live_demo_link: "https://example.com/",
    },
    {
      name: "AI Summarizer",
      description: "An AI-powered article summarizer that transforms lengthy articles into clear and concise summaries using OpenAI GPT-4.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "openai",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      source_code_link: "https://github.com/",
      live_demo_link: "https://example.com/",
    },
    {
      name: "Crypto Tracker",
      description: "Real-time cryptocurrency price tracking and portfolio management with advanced charts and market analysis.",
      tags: [
        {
          name: "vue",
          color: "blue-text-gradient",
        },
        {
          name: "firebase",
          color: "green-text-gradient",
        },
        {
          name: "chartjs",
          color: "pink-text-gradient",
        },
      ],
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      source_code_link: "https://github.com/",
      live_demo_link: "https://example.com/",
    },
    {
      name: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization and engagement metrics.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "mongodb",
          color: "pink-text-gradient",
        },
      ],
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      source_code_link: "https://github.com/",
      live_demo_link: "https://example.com/",
    },
  ];

  const techStack = [
    { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', level: 90, color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 80, color: 'from-yellow-400 to-yellow-600' },
    { name: 'PostgreSQL', level: 85, color: 'from-blue-600 to-blue-800' },
    { name: 'MongoDB', level: 75, color: 'from-green-500 to-green-700' },
    { name: 'AWS', level: 70, color: 'from-orange-400 to-orange-600' },
    { name: 'Docker', level: 75, color: 'from-blue-400 to-blue-600' },
  ];

  const certificates = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: Award
    },
    {
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      icon: Award
    },
    {
      title: 'Meta React Developer Certificate',
      issuer: 'Meta',
      date: '2022',
      icon: Award
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      icon: Award
    }
  ];

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'techstack', label: 'Tech Stack', icon: Layers },
    { id: 'certificates', label: 'Certificates', icon: Award }
  ];

  // Pin animation component with perfect alignment and enhanced translucency
  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    return (
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.8,
          ease: "easeOut"
        }}
        className="group relative cursor-grab w-full max-w-[360px] mx-auto"
      >
        <motion.div
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            rotateX: 5,
            z: 50
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className="relative w-full h-[480px] bg-slate-800/30 backdrop-blur-xl rounded-[20px] p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {/* Pin effect - small circle at top */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg z-20"
          />
          
          {/* Pin shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
            className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-purple-400/30 to-transparent rounded-full blur-sm z-10"
          />

          {/* Image container */}
          <div className="relative w-full h-[230px] rounded-[15px] overflow-hidden mb-4">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Enhanced gradient overlay with more transparency */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            
            {/* Floating action buttons - Always visible on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100"
            >
              <motion.a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-slate-900/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-purple-500/60 transition-all duration-300 border border-white/20"
              >
                <Github size={16} />
              </motion.a>
              <motion.a
                href={project.live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-slate-900/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-500/60 transition-all duration-300 border border-white/20"
              >
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              className="text-white font-bold text-[24px] mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300"
            >
              {project.name}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
              className="text-gray-300 text-[14px] leading-[20px] mb-4"
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {project.tags.map((tag: any, tagIndex: number) => (
                <motion.p
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + tagIndex * 0.1 + 0.8, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className={`text-[14px] font-medium cursor-pointer transition-all duration-300 ${
                    tag.color === 'blue-text-gradient' 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : tag.color === 'green-text-gradient'
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-pink-400 hover:text-pink-300'
                  }`}
                >
                  #{tag.name}
                </motion.p>
              ))}
            </motion.div>

            {/* Bottom Action Buttons - Always visible */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.9, duration: 0.5 }}
              className="flex items-center justify-between pt-4 border-t border-purple-500/20"
            >
              <motion.a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 group/link"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github size={18} />
                </motion.div>
                <span className="text-sm font-medium group-hover/link:text-purple-400">GitHub</span>
              </motion.a>
              
              <motion.a
                href={project.live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 group/link"
              >
                <span className="text-sm font-medium group-hover/link:text-pink-400">Live Demo</span>
                <motion.div
                  whileHover={{ rotate: -360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ExternalLink size={18} />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>

          {/* Enhanced animated background gradient with more transparency */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)',
                'linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                'linear-gradient(45deg, rgba(236, 72, 153, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* 3D depth effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/10 pointer-events-none rounded-[20px]"
            style={{ transform: "translateZ(-50px)" }}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg mb-4 tracking-wider uppercase"
          >
            My work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            Projects<span className="text-purple-400">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
          </motion.p>
        </motion.div>

        {/* Tab Navigation with enhanced translucency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center mb-16"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.9, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-8 py-4 rounded-full mx-2 mb-4 transition-all duration-500 relative overflow-hidden backdrop-blur-xl ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/30 text-gray-300 hover:bg-slate-700/40 border border-purple-500/20 hover:border-purple-500/40'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/80 to-pink-500/80 -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Projects Tab with Perfect Grid Alignment */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
              style={{ perspective: "1000px" }}
            >
              {/* Perfect Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                {projects.map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack Tab with enhanced translucency */}
          {activeTab === 'techstack' && (
            <motion.div
              key="techstack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                      <span className="text-gray-400">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        className={`h-3 bg-gradient-to-r ${tech.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certificates Tab with enhanced translucency */}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-full flex items-center justify-center">
                      <cert.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                      <p className="text-gray-400">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-purple-400 font-semibold">{cert.date}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;