import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useVelocity } from 'framer-motion';
import { Code, Palette, Database, Smartphone, Globe, Zap, Star, Sparkles, Heart, Coffee, Rocket, Target, CheckCircle, ArrowRight, Settings, Users, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Smoother scroll animations with reduced intensity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Gentler mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 50 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 50 });

  // Reduced velocity tracking
  const mouseXVelocity = useVelocity(mouseX);
  const mouseYVelocity = useVelocity(mouseY);
  const velocityFactor = useTransform([mouseXVelocity, mouseYVelocity], ([x, y]) => Math.min(Math.sqrt(x * x + y * y) / 2000, 1.2));

  const movingSkills = [
    "Frontend Development",
    "Backend Development", 
    "UI/UX Design",
    "Mobile Development",
    "Cloud Architecture",
    "DevOps & Deployment"
  ];

  // Slower floating elements
  const floatingElements = [
    { icon: Star, delay: 0, duration: 15 },
    { icon: Sparkles, delay: 2, duration: 18 },
    { icon: Heart, delay: 4, duration: 20 },
    { icon: Coffee, delay: 6, duration: 16 },
    { icon: Rocket, delay: 8, duration: 22 },
    { icon: Target, delay: 10, duration: 14 }
  ];

  // Skills data matching the reference design
  const skillCategories = [
    {
      title: "React Developer",
      icon: "⚛️",
      description: "Building modern, responsive web applications with React.js and its ecosystem",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Python Developer", 
      icon: "🐍",
      description: "Backend development, data analysis, and automation using Python",
      bgColor: "from-yellow-500/20 to-green-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "Backend Developer",
      icon: "⚙️", 
      description: "Server-side development with Node.js, databases, and API design",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "Interactive Developer",
      icon: "✨",
      description: "Creating engaging user experiences with animations and interactions",
      bgColor: "from-purple-500/20 to-pink-500/20", 
      borderColor: "border-purple-500/30"
    },
    {
      title: "Project Manager",
      icon: "📋",
      description: "Leading development teams and managing project lifecycles",
      bgColor: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30"
    }
  ];

  // Mouse tracking with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePosition({ x, y });
          mouseX.set(x);
          mouseY.set(y);
        }
      }, 16); // Throttle to ~60fps
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeoutId);
      };
    }
  }, [mouseX, mouseY]);

  // Change skill every 5 seconds (much slower)
  useEffect(() => {
    const skillInterval = setInterval(() => {
      setCurrentSkill(prev => (prev + 1) % movingSkills.length);
    }, 5000); // Increased from 3000 to 5000ms

    return () => clearInterval(skillInterval);
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Slower floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-purple-400/10"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(index) * 20, 0],
              rotate: [0, 180],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            <element.icon size={20} />
          </motion.div>
        ))}
      </div>

      {/* Gentler mouse follower effect */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl pointer-events-none"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          scale: velocityFactor,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            About{' '}
            <motion.span 
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 6, // Slower gradient animation
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Me
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            I'm a passionate developer with 5+ years of experience creating digital solutions that make a difference.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.h3 
              className="text-3xl font-bold text-white mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              My Story
            </motion.h3>
            
            <motion.div className="space-y-6">
              {[
                "I started my journey in web development 5 years ago and have been passionate about creating beautiful, functional websites ever since. I specialize in modern web technologies and love to work on projects that challenge me to grow as a developer.",
                "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring."
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 text-lg leading-relaxed cursor-pointer"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Moving Skills Text - NO BLINKING CURSOR */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))',
                    'linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(6, 182, 212, 0.05))',
                    'linear-gradient(45deg, rgba(6, 182, 212, 0.05), rgba(168, 85, 247, 0.05))'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }} // Much slower
              />
              
              <h4 className="text-lg font-semibold text-white mb-4 relative z-10">Currently Specializing In:</h4>
              <div className="flex items-center h-8 relative z-10">
                <motion.span
                  key={currentSkill}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 1.2, // Much slower transition
                    ease: "easeOut"
                  }}
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-bold text-xl"
                >
                  {movingSkills[currentSkill]}
                </motion.span>
              </div>
            </motion.div>

            {/* Stats with gentler animations */}
            <motion.div 
              className="flex space-x-8 pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { value: "50+", label: "Projects", color: "text-purple-400" },
                { value: "5+", label: "Years", color: "text-pink-400" },
                { value: "100+", label: "Happy Clients", color: "text-cyan-400" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`text-3xl font-bold ${stat.color}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: 1 + index * 0.1, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Personal Image with increased radius */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center"
            style={{ perspective: "1000px" }}
          >
            <motion.div 
              className="relative w-full h-96"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Slower background rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-purple-400/10"
                  style={{
                    scale: 1 + i * 0.1,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20 + i * 10, // Much slower
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
              
              {/* Main image container - increased size */}
              <motion.div 
                className="relative w-96 h-96 mx-auto rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(168, 85, 247, 0.3)",
                    "0 0 50px rgba(236, 72, 153, 0.4)",
                    "0 0 30px rgba(168, 85, 247, 0.3)"
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.5 }
                }}
              >
                {/* Personal image with transparent background */}
                <motion.img
                  src="/LS20250703184432-removebg-preview.png"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover object-center"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.6 }
                  }}
                />
                
                {/* Enhanced gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-pink-500/15"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(168, 85, 247, 0.15), transparent, rgba(236, 72, 153, 0.15))',
                      'linear-gradient(45deg, rgba(236, 72, 153, 0.15), transparent, rgba(6, 182, 212, 0.15))',
                      'linear-gradient(45deg, rgba(6, 182, 212, 0.15), transparent, rgba(168, 85, 247, 0.15))'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                {/* Fewer, slower particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -60, 0],
                      x: [0, Math.sin(i) * 30, 0],
                      opacity: [0, 0.4, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4, // Much slower
                      repeat: Infinity,
                      delay: Math.random() * 4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Decorative floating elements around the image */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* How I Can Contribute & My Key Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-purple-500/30 mb-6"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-purple-300 font-medium">What I Bring to the Table</span>
            </motion.div>
            
            <motion.h3 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              whileHover={{ scale: 1.02 }}
            >
              How I Can{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contribute
              </span>{' '}
              & My Key{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Skills
              </span>
            </motion.h3>
          </motion.div>

          {/* Circular Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 max-w-6xl mx-auto">
            {skillCategories.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Circular Background */}
                <motion.div
                  className={`relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br ${skill.bgColor} backdrop-blur-lg border-2 ${skill.borderColor} flex items-center justify-center mb-4 overflow-hidden`}
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
                    borderColor: "rgba(168, 85, 247, 0.6)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      background: [
                        `linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))`,
                        `linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1))`,
                        `linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className="text-4xl lg:text-5xl relative z-10"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 10, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Title */}
                <motion.h4 
                  className="text-lg lg:text-xl font-semibold text-white text-center mb-2"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#a855f7"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.title}
                </motion.h4>
                
                {/* Description */}
                <motion.p 
                  className="text-gray-400 text-sm text-center max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 10 }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {skill.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;