import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company_name: string;
  img: string;       // ✅ replaced icon with img
  iconBg: string;
  date: string;
  points: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Web Developer",
      company_name: "Think India NITP",
      img: "/image.png",  // ✅ image path from /public
      iconBg: "#383E56",
      date: "March 2024 - Present",
      points: [
        "Built and maintained dynamic web applications using React.js, Firebase, and modern frontend libraries.",
        "Integrated APIs and optimized application performance for seamless user experience.",
        "Worked closely with organizers to develop digital platforms for events and community initiatives.",
        "Ensured responsive design, accessibility, and smooth deployment across devices and browsers.",
      ],
    },
    {
      title: "UI/UX Designer",
      company_name: "DesCo NITP",
      img: "/img3.png",  // ✅ image path from /public
      iconBg: "#E6DEDD",
      date: "Dec 2023 - Present",
      points: [
        "Designed intuitive user interfaces and crafted wireframes, prototypes, and design systems for projects and events.",
        "Conducted user research and gathered feedback to improve design decisions.",
        "Collaborated with developers to ensure design consistency during implementation.",
        "Created engaging visuals, posters, and digital assets to enhance branding and user engagement.",
      ],
    }
  ];

  // Animation variants
  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -100, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: index * 0.3,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    })
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.3 + 0.2,
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 200
      }
    })
  };

  const pointVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-gray-400 text-lg mb-4 tracking-wider uppercase">
            What I have done so far
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Work{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Experience.
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute left-8 top-0 bottom-0 w-1 hidden md:block origin-top"
              style={{
                background: 'linear-gradient(180deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
              }}
            />

            {experiences.map((experience, index) => (
              <div key={`experience-${index}`} className="relative mb-16 md:ml-24">
                {/* Timeline dot with image */}
                <motion.div
                  custom={index}
                  variants={dotVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="absolute -left-24 top-8 hidden md:flex"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.6 } }}
                    className="relative"
                  >
                    <div
                      className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm relative z-10"
                      style={{ backgroundColor: experience.iconBg }}
                    >
                      <img
                        src={experience.img}
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Experience card */}
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                  className="relative group"
                >
                  <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 relative overflow-hidden">
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                          {/* Mobile image */}
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-16 h-16 rounded-full overflow-hidden shadow-lg lg:hidden"
                            style={{ backgroundColor: experience.iconBg }}
                          >
                            <img
                              src={experience.img}
                              alt={experience.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {experience.title}
                            </h3>
                            <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {experience.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 bg-slate-700/50 px-4 py-2 rounded-full">
                          <Calendar size={16} />
                          <span className="text-sm font-medium">{experience.date}</span>
                        </div>
                      </div>

                      <motion.ul
                        className="space-y-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {experience.points.map((point, pointIndex) => (
                          <motion.li
                            key={pointIndex}
                            custom={pointIndex}
                            variants={pointVariants}
                            className="flex items-start space-x-4 text-gray-300"
                          >
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0 shadow-lg" />
                            <span className="leading-relaxed text-base">{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Let's Work Together</span>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="relative z-10">
              <ExternalLink size={20} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
