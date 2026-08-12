import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import { projects } from './data/projects';
import MotionSection from './components/MotionSection';
import AppShell from './components/AppShell';

export default function Home() {
  return (
    <AppShell>
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ambient-glow-a absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#00a2ff]/10 blur-[140px]" />
        <div className="ambient-glow-b absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#38bdf8]/10 blur-[160px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        <MotionSection delay={0}>
          <Hero />
        </MotionSection>

        <MotionSection delay={80}>
          <About />
        </MotionSection>

        <MotionSection delay={120}>
          <Experience />
        </MotionSection>

        <MotionSection delay={160}>
          <Skills />
        </MotionSection>

        {/* Featured Projects Section */}
        <MotionSection delay={200}>
          <section id="projects" className="py-24 relative border-t border-white/5">
            <div className="mb-16 text-center">
              <span className="text-[#00a2ff] font-mono text-sm tracking-wider uppercase mb-3 block font-bold">
                04 // FEATURED PROJECTS
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                ผลงานและโปรเจกต์เด่น
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                คัดสรรระบบโปรดักชันที่มี Logic ซับซ้อน การเชื่อมต่อ IoT และเว็บแอปพลิเคชันที่สร้างมูลค่าจริงให้แก่ธุรกิจ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={idx}
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

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#00a2ff]/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />
          </section>
        </MotionSection>

        {/* Contact CTA Section */}
        <MotionSection delay={240}>
          <section id="contact" className="py-24 relative border-t border-white/5">
            <div className="max-w-5xl mx-auto p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#0c1017] to-[#07090e] border border-[#00a2ff]/30 shadow-[0_0_50px_rgba(0,162,255,0.15)] text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a2ff]/10 rounded-full blur-[80px] pointer-events-none" />

              <span className="text-[#00a2ff] font-mono text-sm tracking-wider uppercase mb-3 block font-bold">
                05 // GET IN TOUCH
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                พร้อมร่วมงานและสร้างสรรค์<br />ซอฟต์แวร์ระดับพรีเมียม
              </h2>
              <p className="text-zinc-300 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed">
                กำลังมองหา Full-Stack Developer ที่มีความใส่ใจในความเสถียรของระบบ และพร้อมเรียนรู้สิ่งใหม่ๆ อยู่เสมอ? ติดต่อผมได้ทันทีครับ
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base font-mono">
                <a
                  href="tel:0987231910"
                  className="cta-button px-6 py-3.5 rounded-full bg-[#00a2ff] text-white font-bold hover:bg-[#38bdf8] transition-all shadow-[0_0_20px_rgba(0,162,255,0.4)] uppercase tracking-wider"
                  data-cursor="CALL"
                >
                  📞 098-723-1910
                </a>
                <a
                  href="mailto:suhaimee.kj@gmail.com"
                  className="cta-button px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all uppercase tracking-wider"
                  data-cursor="MAIL"
                >
                  ✉️ suhaimee.kj@gmail.com
                </a>
                <a
                  href="https://github.com/Suhaimee123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all uppercase tracking-wider"
                  data-cursor="GITHUB"
                >
                  💻 GitHub Profile
                </a>
              </div>
            </div>
          </section>
        </MotionSection>
      </main>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-center text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-6 mt-12 border-t border-white/5 relative z-20 font-mono text-xs">
        <p>© {new Date().getFullYear()} SUHAIMEE KAJE (JJ) • ALL RIGHTS RESERVED</p>
        <div className="flex flex-wrap gap-4 font-semibold text-zinc-400">
          <a href="tel:0987231910" className="hover:text-[#00a2ff] transition-colors">098-723-1910</a>
          <a href="mailto:suhaimee.kj@gmail.com" className="hover:text-[#00a2ff] transition-colors">suhaimee.kj@gmail.com</a>
          <a href="https://github.com/Suhaimee123" target="_blank" rel="noopener noreferrer" className="hover:text-[#00a2ff] transition-colors">GitHub</a>
        </div>
      </footer>
    </AppShell>
  );
}
