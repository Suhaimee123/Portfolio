'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate cursor on devices with mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out flex items-center justify-center rounded-full ${
        isHovered
          ? 'w-16 h-16 bg-[#00a2ff]/20 border border-[#00a2ff] backdrop-blur-xs shadow-[0_0_20px_rgba(0,162,255,0.6)] scale-110'
          : 'w-8 h-8 bg-[#00a2ff]/40 border border-[#00a2ff]/60 shadow-[0_0_10px_rgba(0,162,255,0.4)]'
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {cursorText ? (
        <span className="text-[10px] font-bold text-white uppercase tracking-wider animate-fadeIn">
          {cursorText}
        </span>
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full bg-white transition-opacity ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
      )}
    </div>
  );
}
