import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import { projects } from './data/projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans pb-24 relative overflow-x-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 relative z-10">
        <Hero />

        <About />

        <Experience />

        <Skills />

        <section id="projects" className="py-24 relative">
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">โปรเจกต์เด่น</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full" />
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

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-white/[0.01] rounded-[100%] blur-[100px] pointer-events-none -z-10" />
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-white/5 text-center text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-6 mt-12 bg-[#050505]/80 backdrop-blur-xl relative z-20">
        <p className="text-sm">© {new Date().getFullYear()} SUHAIMEE KAJE. สงวนลิขสิทธิ์ทุกประการ</p>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <a href="tel:0987231910" className="hover:text-white transition-colors">098-723-1910</a>
          <a href="mailto:suhaimee.kj@gmail.com" className="hover:text-white transition-colors">suhaimee.kj@gmail.com</a>
          <a href="https://yoursite.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">พอร์ตโฟลิโอ</a>
        </div>
      </footer>
    </div>
  );
}
