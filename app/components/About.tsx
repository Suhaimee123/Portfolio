import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight title-shimmer bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-white to-zinc-400">สรุปโปรไฟล์</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8" />
          <p className="text-zinc-300 leading-relaxed text-lg mb-8">
            มีประสบการณ์พัฒนาระบบแบบ end-to-end ตั้งแต่การปรับประสิทธิภาพฝั่ง frontend
            ไปจนถึงการออกแบบ backend architecture และทำ CI/CD automation
            โดยมุ่งเน้นความเสถียร ความสามารถในการขยายระบบ และผลลัพธ์ที่ใช้งานได้จริงทางธุรกิจ
          </p>


        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="reveal-card p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">การศึกษา</h3>
            <div className="space-y-3">
              <p className="text-zinc-100 font-semibold">สถาบันการจัดการปัญญาภิวัฒน์</p>
              <p className="text-zinc-400 text-sm">คณะวิศวกรรมศาสตร์และเทคโนโลยี</p>
              <p className="text-zinc-400 text-sm">สาขาสารสนเทศและเทคโนโลยีดิจิทัล</p>
              <p className="text-emerald-400 font-medium">2564 - 2568</p>
            </div>
          </div>

          <div className="reveal-card p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                <path d="M20 7h-9m3 3H5m5 3h9M5 17h14" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">จุดแข็งหลัก</h3>
            <p className="text-zinc-400 leading-relaxed">
              ออกแบบระบบที่รองรับการขยายตัว แก้ปัญหา production incident จัดการงานข้อมูลแบบ real-time และ deploy แบบ cloud-native เพื่อให้มั่นใจในความเสถียรของซอฟต์แวร์
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
