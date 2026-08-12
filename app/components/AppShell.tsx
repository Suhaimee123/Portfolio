'use client';

import React, { useEffect, useState } from 'react';
import CustomCursor from './CustomCursor';
import MenuOverlay from './MenuOverlay';
import Preloader from './Preloader';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      // Determine active section based on scroll position
      const sections = ['about', 'experience', 'skills', 'projects', 'contact'];
      let current = 'HOME';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
            current = section.toUpperCase();
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-[#f3f4f6] relative flex flex-col font-sans selection:bg-[#00a2ff]/30 selection:text-white">
      <Preloader />
      <CustomCursor />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Top Scroll Progress Line */}
      <div className="mil-progress-track">
        <div className="mil-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Fixed Top Bar (Duckgrammer / Ashley Frame Top) */}
      <header className="fixed top-0 inset-x-0 h-16 md:h-20 z-[900] px-6 md:px-12 flex items-center justify-between bg-[#080b12]/80 backdrop-blur-xl border-b border-white/5">
        <a href="#" className="flex items-center gap-3 group" data-cursor="HOME">
          <span className="w-3 h-3 rounded-full bg-[#00a2ff] shadow-[0_0_12px_#00a2ff] animate-pulse" />
          <span className="font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
            SUHAIMEE KAJE
          </span>
          <span className="text-xs font-mono text-[#00a2ff] bg-[#00a2ff]/10 border border-[#00a2ff]/30 px-2 py-0.5 rounded-full hidden sm:inline-block">
            JJ
          </span>
        </a>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#00a2ff]/20 hover:border-[#00a2ff] transition-all text-sm font-semibold group"
            aria-label="Open menu"
            data-cursor="MENU"
          >
            <span className="text-xs font-mono text-zinc-400 group-hover:text-white uppercase tracking-wider hidden sm:inline">MENU</span>
            <div className="w-5 h-4 flex flex-col justify-between items-end">
              <span className="w-5 h-0.5 bg-white group-hover:bg-[#00a2ff] transition-colors" />
              <span className="w-3.5 h-0.5 bg-white group-hover:bg-[#00a2ff] transition-colors" />
              <span className="w-5 h-0.5 bg-white group-hover:bg-[#00a2ff] transition-colors" />
            </div>
          </button>
        </div>
      </header>

      {/* Main Page Layout Container */}
      <div className="pt-20 pb-20 flex-1">
        {children}
      </div>

      {/* Fixed Bottom Bar (Duckgrammer / Ashley Frame Bottom) */}
      <footer className="fixed bottom-0 inset-x-0 h-12 z-[800] px-6 md:px-12 flex items-center justify-between bg-[#080b12]/90 backdrop-blur-xl border-t border-white/5 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="uppercase text-zinc-400">LOCATION // BANGKOK</span>
          <span className="text-zinc-600 hidden md:inline">•</span>
          <span className="text-[#00a2ff] font-bold hidden md:inline">SECTION: {activeSection}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 hover:text-[#00a2ff] transition-colors group cursor-pointer"
          data-cursor="TOP"
        >
          <span>BACK TO TOP</span>
          <span className="text-[#00a2ff] group-hover:-translate-y-1 transition-transform font-bold">↑</span>
        </button>
      </footer>
    </div>
  );
}
