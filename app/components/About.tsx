'use client';

import React, { useState, useEffect } from 'react';

export default function About() {
  const [systemUptime, setSystemUptime] = useState(34212);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  // Auto-increment simulated uptime to make the console feel alive!
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const logs = [
    "🚀 Initialized core profile rendering engine",
    "📡 Socket stream: Real-time GPS location active",
    "🔥 Handling sales dashboard background processes",
    "🛡️ CORS & database layers authenticated successfully",
    "📈 Load testing simulation: 10k concurrent users stable",
    "💡 Next.js 16 Server Components optimized successfully",
  ];

  // Rotate console logs for visual micro-interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % logs.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <section id="about" className="py-28 relative border-t border-white/5 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-stretch">

        {/* Left Column: Mission Narrative & Simulated Operational Log */}
        <div className="lg:w-5/12 flex flex-col justify-between">
          <div>
            <span className="text-purple-400 font-mono text-sm tracking-wider uppercase mb-3 block">
              01 // BIOGRAPHY
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-white leading-tight">
              ขับเคลื่อนธุรกิจ<br />ด้วยโค้ดคุณภาพสูง
            </h2>
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
              ผมเป็น Full-Stack Developer ที่หลงใหลการพัฒนาระบบตั้งแต่การปรับประสิทธิภาพหน้าเว็บฝั่ง Frontend ให้ไหลลื่น ไปจนถึงการวางโครงสร้างฐานข้อมูลและการจัดการ API ความปลอดภัยระดับสูงฝั่ง Backend โดยมุ่งเน้นการสร้างสถาปัตยกรรมซอฟต์แวร์ที่แข็งแกร่ง รองรับการขยายตัว และนำมาซึ่งผลลัพธ์ที่เป็นรูปธรรมต่อธุรกิจจริง
            </p>
          </div>

          {/* Interactive Simulated Operational Log / Terminal Dashboard */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md p-6 font-mono text-xs text-zinc-400 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden group">
            {/* Top Bar simulating a Terminal window */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-zinc-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>jj-runtime.sh</span>
              </div>
            </div>

            {/* Simulated Live Console Log Feed */}
            <div className="space-y-2.5 min-h-[140px] flex flex-col justify-between">
              <div>
                <p className="text-purple-400 font-semibold mb-1">
                  JJ_SYSTEM_CONSOLE // CORE_ENG_ACTIVE
                </p>
                <p className="text-zinc-500">
                  Uptime: <span className="text-zinc-300">{systemUptime}s</span> | Status: <span className="text-emerald-400">ONLINE</span>
                </p>
              </div>

              <div className="space-y-1 bg-black/45 p-3.5 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">SYSTEM METRIC FEED</p>
                <p className="text-emerald-400 font-semibold break-all transition-all duration-500 transform translate-x-0">
                  {logs[activeLogIndex]}
                </p>
                <p className="text-zinc-500 text-[10px] italic">
                  &gt; database_latency: 14ms | event_loop_lag: 0.12ms
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-zinc-600 mt-2">
                <span>$</span>
                <span className="inline-block w-2.5 h-4 bg-zinc-600 animate-[pulse_1s_infinite]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Philosophy Cards */}
        <div className="lg:w-7/12 flex flex-col gap-6 justify-center">

          {/* Card 1: Education & Foundation */}
          <div className="reveal-card p-8 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/10 border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125" />
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0 group-hover:bg-purple-500/20 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">รากฐานการศึกษาและการพัฒนา</h3>
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-semibold text-base">สถาบันการจัดการปัญญาภิวัฒน์</p>
                  <p className="text-zinc-400 text-sm">คณะวิศวกรรมศาสตร์และเทคโนโลยี • สาขาสารสนเทศและเทคโนโลยีดิจิทัล</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      พ.ศ. 2564 - 2568
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">GPAX: IT SPECIALIST TRACK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Core Philosophy */}
          <div className="reveal-card p-8 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/10 border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125" />
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0 group-hover:bg-cyan-500/20 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">ปรัชญาและหลักการออกแบบระบบ</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  ผมมุ่งเน้นการสร้างสถาปัตยกรรมซอฟต์แวร์ที่ทนทาน (Robust) จัดการระบบข้อมูลขยะเพื่อลดภาระเครื่องเซิร์ฟเวอร์ ออกแบบระบบ real-time GPS Tracking ที่มี latency ต่ำมาก รวมถึงเขียน Test Script และทำการตรวจสอบประสิทธิภาพฝั่ง Frontend เสมอเพื่อให้มั่นใจว่าซอฟต์แวร์ไม่มีจุดขัดข้องในฝั่งผู้ใช้
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Enterprise Performance & Scale */}
          <div className="reveal-card p-8 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/10 border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125" />
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 group-hover:bg-emerald-500/20 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">ประสิทธิภาพระดับโปรดักชัน</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  ออกแบบระบบให้พร้อมรับมือกับ traffic ปริมาณมหาศาล โดยมีประสบการณ์ซัพพอร์ตระบบที่มี Concurrent users มากกว่า 10,000 คนพร้อมๆ กัน และฐานลูกค้ากว่า 1 ล้านราย มั่นใจได้ว่าทุกบรรทัดของโค้ดได้รับการคิดวิเคราะห์ในเรื่องของการขยายสเกลและประสิทธิผลสูงสุด
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
