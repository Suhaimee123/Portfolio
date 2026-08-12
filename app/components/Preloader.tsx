'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [phase, setPhase] = useState(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(2), 700);
    const timer2 = setTimeout(() => setPhase(3), 1500);
    const timer3 = setTimeout(() => setIsDone(true), 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#07090e] flex items-center justify-center transition-opacity duration-700 pointer-events-none">
      <div className="text-center">
        {phase === 1 && (
          <div className="animate-[fadeIn_0.3s_ease-in-out]">
            <p className="text-[#00a2ff] font-mono text-sm tracking-widest uppercase mb-2">01 // INITIALIZING</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Full-Stack Architect</h2>
          </div>
        )}
        {phase === 2 && (
          <div className="animate-[fadeIn_0.3s_ease-in-out]">
            <p className="text-[#38bdf8] font-mono text-sm tracking-widest uppercase mb-2">02 // CORE ENGINE</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">IoT & Cloud Systems</h2>
          </div>
        )}
        {phase === 3 && (
          <div className="animate-[fadeIn_0.3s_ease-in-out]">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#00a2ff]/20 border border-[#00a2ff] text-[#00a2ff] font-mono text-xs uppercase mb-3 font-bold">
              PORTFOLIO READY
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">SUHAIMEE KAJE</h1>
          </div>
        )}
      </div>

      {/* Blue reveal bar line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00a2ff] via-[#38bdf8] to-[#00a2ff] w-full animate-pulse" />
    </div>
  );
}
