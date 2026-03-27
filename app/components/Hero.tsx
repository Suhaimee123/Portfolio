import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="hero-blob absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen" />
        <div className="hero-blob-alt absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div className="relative mb-10 group avatar-float">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 backdrop-blur-sm">
            <Image
              src="/IMG_1168.PNG"
              alt="SUHAIMEE KAJE (JJ)"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="title-shimmer text-4xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
          SUHAIMEE KAJE
          <span className="text-2xl md:text-3xl block mt-2 text-zinc-400 font-medium">( JJ )</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6 tracking-wide">
          Software Developer
        </h2>

        <p className="text-base md:text-xl text-zinc-300 max-w-3xl mb-10 leading-relaxed">
          Software Developer (Frontend) ที่มีประสบการณ์พัฒนา Web Application ในระบบขนาดใหญ่ (Enterprise Scale) โดยมีส่วนร่วมในการพัฒนาระบบลงทะเบียนที่รองรับผู้ใช้งานพร้อมกันกว่า 10,000 คน และดูแลระบบที่มีฐานผู้ใช้รวมกว่า 1 ล้านคน เน้นการสร้าง UI ที่ใช้งานง่ายและมีประสิทธิภาพ ควบคู่ไปกับการทำงานร่วมกับทีม Backend และ DevOps เพื่อให้การส่งมอบฟีเจอร์เป็นไปอย่างรวดเร็วและมีเสถียรภาพ
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm md:text-base">
          <a href="tel:0987231910" className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            098-723-1910
          </a>
          <a href="tel:0640826028" className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            064-082-6028
          </a>
          <a href="mailto:suhaimee.kj@gmail.com" className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            suhaimee.kj@gmail.com
          </a>
          <a
            href="https://github.com/Suhaimee123"
            target="_blank"
            rel="noopener noreferrer"
            className="chip-hover px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            https://github.com/Suhaimee123
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="cta-button px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            ดูผลงาน
          </a>
        </div>
      </div>
    </section>
  );
}
