import Link from 'next/link';
import AppShell from '@/app/components/AppShell';
import MotionSection from '@/app/components/MotionSection';
import ProjectCard from '@/app/components/ProjectCard';
import { projects } from '@/app/data/projects';

export default function ProjectsIndexPage() {
  return (
    <AppShell autoStartSwarm={false} defaultSection="PROJECTS">
      {/* Background ambient lighting matching homepage */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ambient-glow-a absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#00a2ff]/10 blur-[140px]" />
        <div className="ambient-glow-b absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#38bdf8]/10 blur-[160px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
        <MotionSection delay={0}>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="chip-hover inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#38bdf8] transition-all text-xs md:text-sm font-mono uppercase tracking-wider"
              data-cursor="HOME"
            >
              <span>←</span>
              <span>กลับหน้าแรก // HOME</span>
            </Link>

            <span className="text-xs font-mono text-[#00a2ff] bg-[#00a2ff]/10 border border-[#00a2ff]/30 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
              {projects.length} PRODUCTION PROJECTS
            </span>
          </div>

          <div className="mb-14 text-center">
            <span className="text-[#00a2ff] font-mono text-sm tracking-wider uppercase mb-3 block font-bold">
              04 // FEATURED PROJECTS
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              ผลงานและโปรเจกต์เด่น
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              คัดสรรระบบโปรดักชันที่มี Logic ซับซ้อน การเชื่อมต่อ IoT และเว็บแอปพลิเคชันที่สร้างมูลค่าจริงให้แก่ธุรกิจ
            </p>
          </div>
        </MotionSection>

        <MotionSection delay={90}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                gradient={project.gradient}
                liveUrl={project.liveUrl}
                coverImage={project.coverImage}
                detailUrl={`/projects/${project.slug}`}
              />
            ))}
          </div>
        </MotionSection>
      </main>
    </AppShell>
  );
}

