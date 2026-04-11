import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  const glowX = useSpring(0, { damping: 30, stiffness: 100 });
  const glowY = useSpring(0, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, glowX, glowY]);

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : 1,
        }}
      />
      <motion.div
        className="cursor-glow hidden md:block"
        style={{
          left: glowX,
          top: glowY,
        }}
      />
    </>
  );
};
