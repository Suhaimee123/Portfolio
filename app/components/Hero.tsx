import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-16">
      {/* Ashley Radial Nimbus Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] mil-portrait-nimbus rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Ashley Style Radial Aura Portrait Frame */}
        <div className="relative mb-10 group avatar-float" data-cursor="JJ">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#00a2ff] via-[#38bdf8] to-[#00a2ff] rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-700" />
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00a2ff]/50 backdrop-blur-md shadow-[0_0_40px_rgba(0,162,255,0.4)]">
            <Image
              src="/IMG_1168.PNG"
              alt="SUHAIMEE KAJE (JJ)"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Ashley Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a2ff]/10 border border-[#00a2ff]/30 text-[#00a2ff] text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,162,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#00a2ff] animate-ping" />
          FULL-STACK SOFTWARE DEVELOPER
        </div>

        {/* Title Heading */}
        <h1 className="title-shimmer text-4xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-100 to-[#38bdf8]">
          SUHAIMEE KAJE
          <span className="text-2xl md:text-3xl block mt-2 text-[#00a2ff] font-medium font-mono">( JJ )</span>
        </h1>

        <p className="text-base md:text-xl text-zinc-300 max-w-3xl mb-10 leading-relaxed">
          นักพัฒนาซอฟต์แวร์ที่มีประสบการณ์รวม 2 ปี ในการทำ Web Application ทั้งฝั่ง Frontend และ Backend มีความถนัดในการเขียนระบบที่มี Logic ซับซ้อน เช่น ระบบซื้อขายทองคำที่เชื่อมโยงเครื่องชั่งน้ำหนักดิจิทัล (IoT) แบบ Real-time และระบบ POS ร้านอาหาร เน้นการเขียนโค้ดที่เป็นระเบียบ และชอบเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอครับ
        </p>

        {/* Ashley Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00a2ff]/40 transition-all backdrop-blur-md">
            <p className="text-3xl font-extrabold text-[#00a2ff] font-mono">2+ YEARS</p>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">Full-stack Experience</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00a2ff]/40 transition-all backdrop-blur-md">
            <p className="text-3xl font-extrabold text-[#38bdf8] font-mono">IoT & POS</p>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">Complex Logic Systems</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00a2ff]/40 transition-all backdrop-blur-md">
            <p className="text-3xl font-extrabold text-emerald-400 font-mono">100%</p>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">Production Reliability</p>
          </div>
        </div>

        {/* Contact Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs md:text-sm font-mono">
          <a href="tel:0987231910" className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all" data-cursor="CALL">
            📞 098-723-1910
          </a>
          <a href="tel:0640826028" className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all" data-cursor="CALL">
            📞 064-082-6028
          </a>
          <a href="mailto:suhaimee.kj@gmail.com" className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all" data-cursor="MAIL">
            ✉️ suhaimee.kj@gmail.com
          </a>
          <a
            href="https://github.com/Suhaimee123"
            target="_blank"
            rel="noopener noreferrer"
            className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all"
            data-cursor="GITHUB"
          >
            💻 github.com/Suhaimee123
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="cta-button px-8 py-3.5 rounded-full bg-[#00a2ff] text-white font-bold hover:bg-[#38bdf8] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,162,255,0.4)] uppercase tracking-wider text-sm"
            data-cursor="VIEW"
          >
            ดูผลงานเด่น // EXPLORE WORK
          </a>
          <a
            href="#contact"
            className="cta-button px-8 py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 hover:border-[#00a2ff] transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm"
            data-cursor="HIRE"
          >
            ติดต่อผม // CONTACT ME
          </a>
        </div>
      </div>
    </section>
  );
}
