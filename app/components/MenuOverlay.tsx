'use client';

import React from 'react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: '01', label: 'หน้าแรก // HOME', href: '#' },
  { number: '02', label: 'เกี่ยวกับผม // ABOUT', href: '#about' },
  { number: '03', label: 'ประสบการณ์ // EXPERIENCE', href: '#experience' },
  { number: '04', label: 'ทักษะ & เทคโนโลยี // SKILLS', href: '#skills' },
  { number: '05', label: 'ผลงานเด่น // PROJECTS', href: '#projects' },
  { number: '06', label: 'ติดต่อผม // CONTACT', href: '#contact' },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[990] bg-[#07090e]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 animate-[fadeIn_0.3s_ease-out]">
      {/* Top Header inside overlay */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00a2ff] animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-[#00a2ff] uppercase font-bold">
            SUHAIMEE KAJE // NAVIGATION
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#00a2ff]/20 hover:border-[#00a2ff] transition-all flex items-center justify-center group"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Nav Links */}
      <div className="my-auto py-8 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline gap-4 p-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-[#00a2ff]/30 transition-all"
            data-cursor="GO"
          >
            <span className="font-mono text-[#00a2ff] font-bold text-lg md:text-xl group-hover:scale-110 transition-transform">
              {item.number}.
            </span>
            <span className="text-2xl md:text-4xl font-extrabold text-white group-hover:text-[#38bdf8] transition-colors tracking-tight">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Footer Info inside Overlay */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-400">
        <div>
          <span>LOCATION: BANGKOK, THAILAND</span>
        </div>
        <div className="flex gap-6">
          <a href="tel:0987231910" className="hover:text-[#00a2ff] transition-colors">098-723-1910</a>
          <a href="mailto:suhaimee.kj@gmail.com" className="hover:text-[#00a2ff] transition-colors">suhaimee.kj@gmail.com</a>
          <a href="https://github.com/Suhaimee123" target="_blank" rel="noopener noreferrer" className="hover:text-[#00a2ff] transition-colors">GitHub</a>
        </div>
      </div>
    </div>
  );
}
