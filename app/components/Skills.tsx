'use client';

import React, { useState } from 'react';

interface SkillCategory {
  title: string;
  glowColor: string;
  borderColor: string;
  iconColor: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend (Visual Engine)',
    glowColor: 'hover:shadow-[0_0_25px_rgba(0,162,255,0.25)] hover:border-[#00a2ff]/40',
    borderColor: 'group-hover:border-[#00a2ff]/30',
    iconColor: 'text-[#00a2ff]',
    skills: ['JavaScript', 'TypeScript', 'Next.js', 'React', 'Vue.js', 'TailwindCSS', 'SPA']
  },
  {
    title: 'Backend & API (Logic Core)',
    glowColor: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:border-[#38bdf8]/40',
    borderColor: 'group-hover:border-[#38bdf8]/30',
    iconColor: 'text-[#38bdf8]',
    skills: ['Node.js', 'NestJS', 'RESTful API', 'WebSocket', 'Server-Sent Events (SSE)']
  },
  {
    title: 'Cloud & DevOps (Infrastructure)',
    glowColor: 'hover:shadow-[0_0_25px_rgba(0,162,255,0.25)] hover:border-[#00a2ff]/40',
    borderColor: 'group-hover:border-[#00a2ff]/30',
    iconColor: 'text-[#00a2ff]',
    skills: ['Google Cloud Run', 'DigitalOcean', 'AWS', 'Vercel', 'Docker', 'GitHub Actions (CI/CD)']
  },
  {
    title: 'Database & Testing (Stability)',
    glowColor: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:border-[#38bdf8]/40',
    borderColor: 'group-hover:border-[#38bdf8]/30',
    iconColor: 'text-[#38bdf8]',
    skills: ['PostgreSQL', 'MySQL', 'Firebase', 'Performance & Load Testing']
  }
];

const skillDescriptions: Record<string, string> = {
  'JavaScript': 'พัฒนาระบบ Interactive Frontend และเขียน Script ทำการล้างข้อมูลขยะ (Data Cleansing) ในระบบหลังบ้านอย่างแม่นยำ',
  'TypeScript': 'ใช้ในการเขียน Type-Safe Code ครอบคลุมทั้งโปรเจกต์ Next.js และ NestJS ช่วยลดข้อผิดพลาดใน Production ได้มากกว่า 90%',
  'Next.js': 'เชี่ยวชาญการปรับแต่งเส้นทาง SSR, ISR, Server Actions และระบบ Dynamic Routing เพื่อผลลัพธ์ประสิทธิภาพและความสามารถด้าน SEO สูงสุด',
  'React': 'ออกแบบ Custom Hooks และแยก Component โครงสร้าง UI ซับซ้อน เพื่อให้นำกลับมาใช้ซ้ำได้ง่ายและจัดการ Virtual DOM อย่างมีระเบียบ',
  'Vue.js': 'พัฒนา SPA ด้วย Vue.js (Composition API) และ Vuex ในการสร้างเว็บแอปพลิเคชันที่มีการอัปเดตข้อมูลแบบตอบสนองไว',
  'TailwindCSS': 'กำหนด CSS Tokens และจัดโครงสร้าง Theme ในระบบ เพื่อสร้างเว็บ Responsive ดีไซน์สวยงามและลื่นไหลไม่มีติดขัด',
  'SPA': 'ปรับปรุงกระบวนการ caching และการเปลี่ยนหน้าฝั่งไคลเอนต์เพื่อให้หน้าจอโหลดข้อมูลรวดเร็วทันใจผู้ใช้งานมากที่สุด',
  'Node.js': 'เขียน backend server-side จัดการงานหนักใน background event loops และสร้างกระบวนการส่งออกไฟล์ข้อมูลประสิทธิภาพสูง',
  'NestJS': 'วางสถาปัตยกรรมแบบ Modular Enterprise-Grade ตกแต่ง Dependency Injection และสร้าง Middleware ตรวจสอบสิทธิ์ผู้ใช้อย่างแน่นหนา',
  'RESTful API': 'สร้าง API Gateways รองรับการสื่อสารข้อมูล ปลอดภัยด้วย Payload Validation, CORS policies และการจัดการ Error อย่างเป็นระบบ',
  'WebSocket': 'เขียนระบบเชื่อมต่อแบบสองทิศทางแบบ real-time ใช้ในฟังก์ชันติดตามพิกัด GPS ของพนักงานขายที่มีความหน่วงต่ำเป็นพิเศษ',
  'Server-Sent Events (SSE)': 'สร้างท่อสตรีมข้อมูลฝั่งเดียวแบบ Real-time เพื่ออัปเดต Dashboard ยอดขายของร้านค้าโดยไม่ต้องดึงข้อมูลซ้ำๆ',
  'Google Cloud Run': 'ทำคอนเทนเนอร์เซิร์ฟเวอร์เลสแบบออโต้สเกลลิ่ง รองรับการเพิ่มขยายเครื่องอัตโนมัติเมื่อมี Traffic ในการเข้าใช้งานพุ่งสูงขึ้น',
  'DigitalOcean': 'บริหารจัดการ Droplets, ตั้งค่า Nginx Reverse Proxy, ติดตั้ง SSL Certs และวางระบบ Firewall คุมความปลอดภัย',
  'AWS': 'ใช้งาน Amazon S3 เก็บรักษาไฟล์มีเดียของพอร์ตโฟลิโอ รวมถึงสร้าง EC2 และกำหนด IAM permissions ควบคุมการเข้าถึง',
  'Vercel': 'กำหนดขอบเขต Edge Network, ฟังก์ชัน serverless และตั้งค่า Auto Deployments เชื่อมตรงกับ GitHub Branches สะดวกรวดเร็ว',
  'Docker': 'เขียน Multi-stage Dockerfile เพื่อห่อหุ้มสภาพแวดล้อมจำลองของระบบ ช่วยให้การนำขึ้นเซิร์ฟเวอร์ทุกเครื่องเสถียรและเร็วขึ้น',
  'GitHub Actions (CI/CD)': 'เขียนสคริปต์ Workflow ปล่อยทดสอบ Unit Test อัตโนมัติ และผลักโค้ดขึ้นระบบโฮสติ้งทุกครั้งที่สั่ง Merge โค้ดเสร็จสิ้น',
  'PostgreSQL': 'ออกแบบสคีมาฐานข้อมูล ตกแต่ง Index เพื่อการค้นหาด่วน และเขียนสคริปต์ดึงข้อมูลแบบ Join หลายตารางที่ซับซ้อน',
  'MySQL': 'จัดการระบบฐานข้อมูลเชิงสัมพันธ์ เขียน Queries ประสิทธิภาพสูง และทำ Transaction Control เพื่อความถูกต้องในระบบการขาย',
  'Firebase': 'ติดตั้ง Authentication จัดการสิทธิ์การล็อกอินของผู้ใช้ และเขียน Query ข้อมูลแบบเรียลไทม์ใน NoSQL Cloud Firestore',
  'Performance & Load Testing': 'ใช้เครื่องมือวัดประสิทธิภาพจำลองส่ง request เข้ามาถล่มเซิร์ฟเวอร์ เพื่อวิเคราะห์คอขวดและปรับแต่งจุดขัดข้องให้ระบบ'
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<SkillCategory | null>(null);

  const handleMouseEnter = (skill: string, category: SkillCategory) => {
    setHoveredSkill(skill);
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
    setHoveredCategory(null);
  };

  return (
    <section id="skills" className="py-24 relative border-t border-white/5 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00a2ff]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <span className="text-[#00a2ff] font-mono text-sm tracking-wider uppercase mb-3 block font-bold">
            03 // TECHNICAL STACK
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            ทักษะความสามารถทางเทคนิค
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            นำเมาส์ไปชี้ที่แต่ละกล่องเทคโนโลยี เพื่อตรวจสอบบันทึกการนำไปประยุกต์ใช้งานจริงในระบบโปรดักชัน
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl bg-[#0c1017]/80 border border-white/10 backdrop-blur-md relative overflow-hidden group transition-all duration-300 ${category.glowColor}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00a2ff]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex gap-4 items-center mb-6">
                <span className={`w-2.5 h-2.5 rounded-full bg-current ${category.iconColor}`} />
                <h3 className="text-lg font-bold text-white transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => {
                  const isHovered = hoveredSkill === skill;
                  return (
                    <span
                      key={sIdx}
                      onMouseEnter={() => handleMouseEnter(skill, category)}
                      onMouseLeave={handleMouseLeave}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-default ${
                        isHovered
                          ? 'bg-[#00a2ff]/20 text-white border-[#00a2ff] scale-105 shadow-sm'
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                      }`}
                      data-cursor="TECH"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Operational Console */}
        <div className="rounded-2xl border border-white/10 bg-[#0c1017]/90 backdrop-blur-md p-6 font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden relative group hover:border-[#00a2ff]/30 transition-colors">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a2ff]" />
            </div>
            <div className="text-zinc-500 text-[10px] tracking-wider uppercase font-bold">
              TECH_CONSOLE_OUTPUT // {hoveredSkill ? hoveredSkill.toUpperCase() : 'STANDBY'}
            </div>
          </div>

          <div className="min-h-[70px] flex items-center justify-between">
            <div className="space-y-1.5 flex-1">
              {hoveredSkill ? (
                <>
                  <p className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">
                    SYSTEM RUNTIME IMPLEMENTATION REPORT
                  </p>
                  <p className={`text-sm font-semibold transition-all duration-300 ${hoveredCategory?.iconColor}`}>
                    &gt; {hoveredSkill}: <span className="text-zinc-200">{skillDescriptions[hoveredSkill] || 'ไม่มีรายละเอียดการบันทึกการใช้งาน'}</span>
                  </p>
                </>
              ) : (
                <p className="text-zinc-500 text-sm">
                  &gt; นำเมาส์ไปชี้ที่ทักษะด้านบน เพื่อตรวจสอบบันทึกการใช้งานจริงในระบบ...
                </p>
              )}
            </div>
            <span className="ml-4 inline-block w-2.5 h-4 bg-[#00a2ff] animate-[pulse_1s_infinite] shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
