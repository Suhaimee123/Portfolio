import React from 'react';

const experiences = [
  {
    company: 'บริษัท แวนเซลส์ แอพพลิเคชั่น จำกัด',
    role: 'Developer (Frontend)',
    period: '2568 - 2569',
    type: 'งานประจำ',
    highlights: [
      'Production Support & Data Cleansing: ดูแลและซัพพอร์ตระบบขนาดใหญ่ที่มีฐานผู้ใช้งานมากกว่า 1 ล้านราย และรองรับผู้ใช้งานพร้อมกันกว่า 10,000 คน (Concurrent users) โดยรับผิดชอบในการแก้ไขปัญหาเฉพาะหน้า (Troubleshooting), ตรวจสอบและจัดการข้อมูลขยะในฐานข้อมูล เพื่อให้ระบบดำเนินงานต่อไปได้ในช่วงที่มี Traffic สูง',
      'ดำเนินการย้ายข้อมูล (Data Migration) จากระบบเดิมสู่ระบบใหม่ อย่างถูกต้อง และรองรับการใช้งานต่อเนื่อง',
      'พัฒนาระบบติดตามตำแหน่ง (GPS) แบบ Real-time เพื่อเพิ่มประสิทธิภาพการทำงานของทีมขาย',
      'พัฒนาหน้าจอ Dashboard สำหรับแสดงผลข้อมูลยอดขายและสรุปผล การดำเนินงานตาม Business Requirement',
      'วิเคราะห์และแก้ไขปัญหาระบบใน Production เพื่อลด Downtime และเพิ่มเสถียรภาพของระบบ'
    ]
  },
  {
    company: 'Protoss Technology Co., Ltd. / VECABO CO., LTD.',
    role: 'Software Engineer',
    period: '2567 - 2568',
    type: 'ฝึกงาน',
    highlights: [
      'ความรับผิดชอบ: พัฒนาเว็บไซต์และแอปพลิเคชัน',
      'พัฒนาเว็บไซต์และแอปพลิเคชันตามความต้องการและข้อกำหนดที่ได้รับมอบหมาย ให้สอดคล้องกับเป้าหมายของโครงการ และมอบประสบการณ์การใช้งานที่เหมาะสมที่สุดแก่ผู้ใช้'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative border-t border-white/5">
      <div className="mb-16 flex flex-col items-center lg:items-start">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-4xl font-extrabold tracking-tight title-shimmer bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-white to-zinc-400">ประสบการณ์การทำงาน</h2>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]">รวม 1 ปี 9 เดือน</span>
        </div>
        <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group reveal-card relative p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-all hover:bg-zinc-900/40">
            <div className="flex flex-wrap gap-3 justify-between items-start mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-zinc-400 border border-white/5 group-hover:text-zinc-300">
                {exp.type}
              </span>
              <span className="text-sm font-medium text-zinc-500">{exp.period}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors uppercase italic">
              {exp.company}
            </h3>
            <p className="text-purple-400 font-medium mb-6">{exp.role}</p>

            <ul className="space-y-3 text-zinc-300">
              {exp.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
