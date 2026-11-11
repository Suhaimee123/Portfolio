import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects';
import AppShell from '@/app/components/AppShell';
import ProjectImageCarousel from '@/app/components/ProjectImageCarousel';
import MotionSection from '@/app/components/MotionSection';
import ScaleMonitor from '@/app/components/ScaleMonitor';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <AppShell autoStartSwarm={false} defaultSection="PROJECTS">
      {/* Background ambient lighting matching homepage */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ambient-glow-a absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#00a2ff]/10 blur-[140px]" />
        <div className="ambient-glow-b absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#38bdf8]/10 blur-[160px]" />
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
        <MotionSection delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <Link
              href="/projects"
              className="chip-hover inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#38bdf8] transition-all text-xs md:text-sm font-mono uppercase tracking-wider"
              data-cursor="BACK"
            >
              <span>←</span>
              <span>กลับไปหน้าโปรเจกต์ // PROJECTS</span>
            </Link>

            <Link
              href="/#projects"
              className="chip-hover inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#38bdf8] transition-all text-xs md:text-sm font-mono uppercase tracking-wider"
              data-cursor="HOME"
            >
              หน้าแรก // HOME
            </Link>
          </div>
        </MotionSection>

        <MotionSection delay={90}>
          <section className="rounded-[2rem] border border-[#00a2ff]/25 bg-gradient-to-br from-[#0c1017]/95 to-[#080b12]/95 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(0,162,255,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00a2ff]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a2ff]/10 border border-[#00a2ff]/30 text-[#00a2ff] text-xs font-mono font-bold tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a2ff]" />
                PROJECT CASE STUDY
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 text-white leading-tight">
                {project.title}
              </h1>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-8">
                {project.description}
              </p>

              {project.slug === 'gold-scale-monitoring' && <ScaleMonitor />}

              {project.images?.length ? (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00a2ff]" />
                    ภาพโปรเจกต์
                  </h2>
                  <ProjectImageCarousel images={project.images} title={project.title} />
                </div>
              ) : null}

              {project.videos?.length ? (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                    วิดีโอตัวอย่าง
                  </h2>
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {project.videos.map((videoUrl) => (
                      <div key={videoUrl} className="flex-1 rounded-2xl overflow-hidden border border-white/10 bg-[#07090e] flex items-center justify-center p-2">
                        <video
                          src={videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full max-h-[60vh] object-contain rounded-xl"
                        >
                          เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                        </video>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.documents?.length ? (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00a2ff]" />
                    เอกสารและลิงก์ตัวอย่าง
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.documents.map((document) => (
                      <a
                        key={document.url}
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chip-hover inline-flex items-center px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff] hover:text-[#38bdf8] text-sm font-semibold transition-all"
                        data-cursor="OPEN"
                      >
                        {document.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00a2ff]" />
                รายละเอียดโปรเจกต์
              </h2>
              <ul className="space-y-3.5 text-zinc-300 mb-8">
                {project.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#00a2ff] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                เทคโนโลยีที่ใช้
              </h2>
              <div className="flex flex-wrap gap-2.5 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pop px-4 py-1.5 text-xs md:text-sm font-mono font-semibold text-zinc-200 bg-white/5 border border-white/10 hover:border-[#00a2ff]/50 hover:text-[#38bdf8] rounded-full transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button inline-flex items-center px-7 py-3 rounded-full bg-[#00a2ff] text-white font-bold hover:bg-[#38bdf8] transition-all shadow-[0_0_25px_rgba(0,162,255,0.35)] text-sm font-mono uppercase tracking-wider"
                    data-cursor="LIVE"
                  >
                    เปิดโปรเจกต์จริง // LIVE SITE
                  </a>
                ) : (
                  <span className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-mono">
                    โปรเจกต์นี้เป็นระบบภายใน (ไม่มีลิงก์สาธารณะ)
                  </span>
                )}

                <Link
                  href="/#contact"
                  className="cta-button inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-semibold hover:border-[#00a2ff] hover:text-[#38bdf8] transition-all text-sm font-mono uppercase tracking-wider"
                  data-cursor="HIRE"
                >
                  ติดต่อร่วมงาน // CONTACT
                </Link>
              </div>
            </div>
          </section>
        </MotionSection>
      </main>
    </AppShell>
  );
}
