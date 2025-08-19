import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrails(prev => [...prev.slice(-8), newTrail]);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
            width: 12,
            height: 12,
          }}
          initial={{ 
            opacity: 0.8,
            scale: 1,
            background: 'rgba(168, 85, 247, 0.6)'
          }}
          animate={{ 
            opacity: 0,
            scale: 0.5,
            background: 'rgba(168, 85, 247, 0.2)'
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main cursor - made bigger */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          background: isHovering 
            ? 'linear-gradient(45deg, #06b6d4, #10b981)' 
            : 'linear-gradient(45deg, #a855f7, #ec4899)',
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          width: 30,
          height: 30,
        }}
      />

      {/* Outer ring for hover effect - made bigger */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full border-2 border-white/30"
        style={{
          left: mousePosition.x - 30,
          top: mousePosition.y - 30,
        }}
        animate={{
          scale: isHovering ? 2 : 0,
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          width: 60,
          height: 60,
        }}
      />
    </>
  );
};

export default CustomCursor;