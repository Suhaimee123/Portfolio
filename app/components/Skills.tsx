

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'Next.js', 'React', 'Vue.js', 'TailwindCSS', 'SPA']
  },
  {
    title: 'Backend & API',
    skills: ['Node.js', 'NestJS', 'RESTful API', 'WebSocket', 'Server-Sent Events (SSE)']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Google Cloud Run', 'DigitalOcean', 'AWS', 'Vercel', 'Docker', 'GitHub Actions (CI/CD)']
  },
  {
    title: 'Database & Testing',
    skills: ['PostgreSQL', 'MySQL', 'Firebase', 'Performance & Load Testing']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-white/5">
      <div className="mb-16 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight title-shimmer bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-white to-zinc-400">ทักษะทางเทคนิค</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="reveal-card p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.03] to-transparent rounded-bl-full pointer-events-none" />

            <h3 className="text-xl font-bold mb-8 text-white relative z-10">{category.title}</h3>

            <div className="flex flex-wrap gap-3 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className="tag-pop px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-default">
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
