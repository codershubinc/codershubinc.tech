import React from 'react';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { Terminal, Server, Music, Cpu, Github, Globe, Command } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-400 selection:bg-blue-500/30 selection:text-blue-200">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-100 font-bold tracking-tight">
            <Command size={18} />
            <span className="font-mono">CodersHubInc</span>
          </div>
          <nav className="flex gap-6 text-xs md:text-sm font-mono font-medium text-zinc-500">
            <a href="#projects" className="hover:text-white transition-colors">~/projects</a>
            <a href="#stack" className="hover:text-white transition-colors">~/stack</a>
            <a href="mailto:swapnil@codershubinc.com" className="hover:text-white transition-colors">~/contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-fit text-xs font-mono text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>System Online: Mumbai, IN</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
            Swapnil Ingle<span className="text-blue-600">.</span>
          </h1>

          <div className="max-w-2xl space-y-4">
            <p className="text-xl md:text-2xl text-zinc-400 font-light">
              Backend Developer & Linux Enthusiast.
            </p>
            <p className="text-zinc-500 leading-relaxed">
              Founder of <strong className="text-zinc-300">CodersHubInc</strong>. Building high-performance developer tools, self-hosted infrastructure, and distributed systems.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 font-mono text-sm">
            <a href="https://github.com/codershubinc" target="_blank" className="flex items-center gap-2 bg-zinc-100 text-black px-6 py-3 rounded font-bold hover:bg-white hover:scale-105 transition-all">
              <Github size={18} />
              github.com
            </a>
            <a href="/resume.pdf" className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 text-zinc-300 px-6 py-3 rounded font-medium hover:border-zinc-700 hover:text-white transition-all">
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Terminal className="text-blue-600" size={24} />
              Active Deployments
            </h2>
            <p className="text-zinc-500 text-sm">Production-grade systems and tools.</p>
          </div>
          <span className="hidden md:block font-mono text-xs text-zinc-300 bg-zinc-900/50 px-2 py-1 rounded border  border-solid border-zinc-800">
            ls -la ./projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-[#0f0f0f] border border-white/5 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300 flex flex-col h-full">

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-zinc-900 rounded-lg text-blue-500 group-hover:text-blue-400 transition-colors">
                  {project.slug === 'orbit' && <Server size={24} />}
                  {project.slug === 'vs-music' && <Music size={24} />}
                  {project.slug === 'quazaar' && <Cpu size={24} />}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.liveUrl} target="_blank" className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition">
                    <Globe size={18} />
                  </a>
                  <a href={project.githubUrl} target="_blank" className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition">
                    <Github size={18} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-zinc-500 mb-8 leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-20 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">System Architecture</h2>
          <p className="text-zinc-500 text-sm">Technologies used to build CodersHubInc.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-blue-500 uppercase tracking-widest">
                {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-400 group cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-blue-500 transition-colors"></span>
                    <span className="group-hover:text-zinc-200 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600">
          <p>&copy; 2026 CodersHubInc. Deployed on Linux.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-900"></span>
              API Status: Normal
            </span>
            <span>v2.0.0-beta</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
