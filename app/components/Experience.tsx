'use client';

import React, { useState } from 'react';

const experiences = [
  {
    company: 'บริษัท แวนเซลส์ แอพพลิเคชั่น จำกัด',
    role: 'Developer (Frontend & System Support)',
    period: 'พ.ศ. 2568 - 2569',
    type: 'งานประจำ',
    highlights: [
      'Gold ERP & IoT Integration: ร่วมพัฒนาเว็บแอปพลิเคชันระบบคลังสินค้าทองคำ (ERP) และพัฒนาระบบเชื่อมต่อกับเครื่องชั่งดิจิทัลระดับอุตสาหกรรมด้วย Web Serial API และ Python (PySerial) เพื่ออ่านค่าน้ำหนักจริงแบบ Real-time',
      'Data Cleansing & Migration: พัฒนาสคริปต์ Python & Pandas ทำความสะอาดฐานข้อมูลคู่ค้าและสินค้าคงคลัง (SKUs) เพื่อย้ายจากระบบเก่า เข้าสู่ระบบใหม่ได้อย่างสมบูรณ์แบบ',
      'Production Support & Troubleshooting: ร่วมซัพพอร์ตและวิเคราะห์หาสาเหตุของปัญหาระบบขัดข้องใน Production พร้อมทำโปรแกรมแก้ไขแบบเร่งด่วนเพื่อกู้คืนระบบ',
      'Real-time Navigation: พัฒนาระบบติดตามพิกัดตำแหน่ง (GPS) ของทีมพนักงานขายแบบ real-time อัปเดตพิกัดไวและใช้ทรัพยากรระบบต่ำ',
      'Executive Dashboard: พัฒนาหน้าแสดงผล Dashboard สรุปยอดขายตามข้อมูลเรียลไทม์เพื่อประกอบการตัดสินใจของฝ่ายบริหาร'
    ]
  },
  {
    company: 'Protoss Technology Co., Ltd. / VECABO CO., LTD.',
    role: 'Software Engineer (Internship)',
    period: 'พ.ศ. 2567 - 2568',
    type: 'ฝึกงาน',
    highlights: [
      'Core Frontend Engineering: ร่วมพัฒนาระบบหลักของแอปพลิเคชันและเว็บไซต์ขององค์กรด้วย React และ TypeScript ให้มีสถาปัตยกรรมโค้ดที่สะอาดและขยายต่อได้ง่าย',
      'Cross-Functional Delivery: ประสานงานร่วมกับทีมพัฒนาและทีม Product ในการวิเคราะห์ Requirement และแปลงมาเป็นหน้าจอใช้งานจริงที่สวยงามตาม Figma Prototype',
      'Responsive Overhaul: ปรับปรุงประสิทธิภาพหน้าบ้านให้มีความเร็วสูงสุด รองรับการแสดงผลหน้าจอมือถือและแท็บเล็ตทุกขนาดอย่างไร้ที่ติ'
    ]
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeExp = experiences[activeIndex];

  return (
    <section id="experience" className="py-28 relative border-t border-white/5 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center lg:text-left">
          <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase mb-3 block">
            02 // CHRONOLOGY
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            เส้นทางและประสบการณ์ทำงาน
          </h2>
        </div>

        {/* Asymmetrical Chronological Timeline Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Column: Timeline Clickable Tree */}
          <div className="w-full lg:w-5/12 space-y-4 relative z-10">
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-white/5 -z-10" />

            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex gap-5 items-center relative overflow-hidden group ${isActive
                    ? 'bg-[#0f0f0f] border-cyan-500/30 shadow-[0_4px_25px_rgba(6,182,212,0.15)] text-white'
                    : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-[#0c0c0c] text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  {/* Glowing vertical connector highlight on active node */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                  )}

                  {/* Bullet Node Indicator */}
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-300 ${isActive
                    ? 'border-cyan-400 bg-cyan-400/25 scale-125'
                    : 'border-zinc-700 bg-transparent group-hover:border-zinc-500'
                    }`}>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                        {exp.period}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${isActive
                        ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400'
                        : 'bg-white/5 border-white/5 text-zinc-500'
                        }`}>
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-base transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className={`text-xs ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`}>
                      {exp.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Hub */}
          <div className="w-full lg:w-7/12 min-h-[380px] bg-[#0c0c0c]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/[0.01] to-transparent pointer-events-none" />

            {/* Content block fades in cleanly when activeExp updates */}
            <div key={activeIndex} className="animate-[fadeIn_0.5s_ease-in-out]">
              <div className="border-b border-white/5 pb-6 mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3 inline-block">
                  ACTIVE_ROLE_DETAILS // 0{activeIndex + 1}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {activeExp.role}
                </h3>
                <p className="text-zinc-400 font-medium">
                  {activeExp.company}
                </p>
              </div>

              {/* Bullet Highlights */}
              <h4 className="text-sm font-semibold uppercase text-zinc-400 mb-4 tracking-wider">
                หน้าที่รับผิดชอบและผลงานสำคัญ
              </h4>
              <ul className="space-y-4">
                {activeExp.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-3.5 leading-relaxed text-zinc-300 text-sm md:text-base">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
