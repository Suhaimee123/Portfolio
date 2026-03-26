import React from 'react';

const skillCategories = [
  {
    title: 'ภาษาโปรแกรม',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'PHP']
  },
  {
    title: 'Frontend',
    skills: ['React (TypeScript)', 'Vue.js', 'HTML5', 'CSS3']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'NestJS', 'CodeIgniter']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Docker', 'AWS', 'DigitalOcean', 'Google Cloud Run', 'GitHub Actions']
  },
  {
    title: 'ฐานข้อมูล',
    skills: ['Firestore (NoSQL)', 'MySQL', 'PostgreSQL']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-white/5">
      <div className="mb-16 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">ทักษะทางเทคนิค</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.03] to-transparent rounded-bl-full pointer-events-none" />

            <h3 className="text-xl font-bold mb-8 text-white relative z-10">{category.title}</h3>

            <div className="flex flex-wrap gap-3 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
