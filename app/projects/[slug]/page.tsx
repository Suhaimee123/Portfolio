import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects';
import ProjectImageCarousel from '@/app/components/ProjectImageCarousel';
import MotionSection from '@/app/components/MotionSection';

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
    <div className="min-h-screen bg-[#050505] text-white">
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <MotionSection delay={0}>
          <Link
            href="/#projects"
            className="chip-hover inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm mb-8"
          >
            กลับไปหน้าโปรเจกต์
          </Link>
        </MotionSection>

        <MotionSection delay={90}>
          <section className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 title-shimmer bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-white to-zinc-400">{project.title}</h1>
          <p className="text-zinc-300 leading-relaxed text-lg mb-8">{project.description}</p>

          {project.images?.length ? (
            <>
              <h2 className="text-xl font-bold mb-4">ภาพโปรเจกต์</h2>
              <ProjectImageCarousel images={project.images} title={project.title} />
            </>
          ) : null}

          {project.documents?.length ? (
            <>
              <h2 className="text-xl font-bold mb-4">เอกสารแนบ</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.documents.map((document) => (
                  <a
                    key={document.url}
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip-hover inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    {document.label}
                  </a>
                ))}
              </div>
            </>
          ) : null}

          <h2 className="text-xl font-bold mb-4">รายละเอียดโปรเจกต์</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            {project.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mb-4">เทคโนโลยีที่ใช้</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pop px-4 py-1.5 text-sm font-medium text-zinc-200 bg-white/5 border border-white/10 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
            >
              เปิดโปรเจกต์จริง
            </a>
          ) : (
            <span className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400">
              โปรเจกต์นี้ยังไม่มีลิงก์ระบบจริง
            </span>
          )}
          </section>
        </MotionSection>
      </main>
    </div>
  );
}
