import React from 'react';
import {
  Download, Star, ArrowLeft,
  Mic2, Command, Music, GitFork, Github, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getInstallCount } from './scraper';
import { getGitHubStats } from './github-stats';
import CountUp from '@/components/CountUp';
import ImageMarquee from '@/components/ImageMarquee';
import CopyButton from '@/components/CopyButton';

export default async function VSMusicPage() {
  const [installCount, ghStats] = await Promise.all([
    getInstallCount(),
    getGitHubStats()
  ]);
  const gitRepoUrl = "https://github.com/codershubinc/vs-music";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#b0b0b0] font-sans selection:bg-[#007acc] selection:text-white relative">

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Top Nav */}
      <nav className="fixed w-full z-50 border-b border-[#1a1a1a]/30 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-white transition group">
            <ArrowLeft size={16} className="text-[#858585] group-hover:text-[#007acc] transition-colors" />
            <span className="font-mono text-sm">codershubinc</span>
          </Link>
          <div className="flex items-center gap-3 text-sm font-medium">
            {ghStats.stars !== null && (
              <Link href={gitRepoUrl} target="_blank" >
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161616] border border-[#1a1a1a] hover:border-[#007acc] transition">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[#b0b0b0] font-bold">{ghStats.stars}</span>
                </div>
              </Link>
            )}
            {
              ghStats.version && (
                <Link href={gitRepoUrl + "/releases"} target="_blank" >
                  <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#161616] border border-[#1a1a1a]">
                    <span className="w-2 h-2 rounded-full bg-[#007acc] animate-pulse"></span>
                    <span className="text-[#707070]">{ghStats.version || 'v0.2.0'}</span>
                  </div>
                </Link>
              )
            }
            <a href={gitRepoUrl} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition">
              <Github size={22} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 relative">
        {/* VS Code Glow - A massive blue spotlight behind the text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#007acc] opacity-5 blur-[150px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start z-10">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full border border-[#007acc]/30 bg-[#007acc]/15 text-[#007acc] text-sm font-bold tracking-wider uppercase">
                VS Code Extension
              </span>
              {installCount && (
                <span className="px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#161616] text-white text-sm font-bold">
                  <CountUp value={installCount} /> Installs
                </span>
              )}
              {ghStats.stars !== null && (
                <Link href={gitRepoUrl} target="_blank" >
                  <span className="px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-sm font-bold flex items-center gap-2">
                    <Star size={14} className="fill-yellow-400" />
                    {ghStats.stars} Stars
                  </span>
                </Link>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Code to the <br />
              {/* VS Code Signature Gradient */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007acc] to-[#0e639c]">
                Rhythm.
              </span>
            </h1>

            <p className="text-lg text-[#b0b0b0] max-w-lg mb-10 leading-relaxed">
              The only <span className="text-white font-medium">VS Code extension</span> that puts your Spotify & Apple Music playlists directly into your sidebar. No context switching required.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=codershubinc.music"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#007acc] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0e639c] transition-all w-full sm:w-auto"
              >
                <Download size={18} />
                Install Now
              </a>
              <div className="flex items-center justify-between gap-3 px-4 py-4 rounded-lg text-[#b0b0b0] font-mono text-sm w-full sm:w-auto border border-[#1a1a1a] bg-[#161616] hover:bg-[#1c1c1c] transition-colors">
                <span className="select-all">ext install codershubinc.music</span>
                <CopyButton text="ext install codershubinc.music" />
              </div>
            </div>
          </div>

          {/* RIGHT: Blended Dashboard Preview */}
          <div className="relative lg:scale-110 lg:translate-x-8">
            {/* Glow Effect Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#007acc]/15 to-[#0e639c]/10 blur-[120px] -z-10"></div>

            {/* Image with Fade Mask */}
            <div className="relative">
              <Image
                src="/projects/vs-music-demo.png"
                alt="Main Interface"
                width={1400}
                height={900}
                className="w-full h-auto"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
                priority
              />
              {/* Subtle overlay for integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee */}
      <section className="py-12 px-6 border-t border-[#1a1a1a]">
        <p className="text-center text-xs font-mono text-[#6e6e6e] mb-8 uppercase tracking-widest">
          Visual Tour
        </p>
        <ImageMarquee />
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Developers</h2>
            <p className="text-[#6e6e6e] max-w-2xl mx-auto">Every feature is designed to keep you in the flow state</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mic2, title: "Webview Powered", desc: "React-based UI rendered natively in VS Code with smooth animations.", color: "from-[#007acc] to-[#005a9e]" },
              { icon: Command, title: "Command Palette", desc: "Control playback via Ctrl+Shift+P without touching the mouse.", color: "from-[#0e639c] to-[#007acc]" },
              { icon: Music, title: "Queue System", desc: "Drag & rop queue management for your coding sessions.", color: "from-[#005a9e] to-[#007acc]" }
            ].map((feature, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#007acc] transition-all hover:scale-[1.02]">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} opacity-10 flex items-center justify-center mb-6 group-hover:opacity-20 transition-all group-hover:scale-110`}>
                    <feature.icon size={26} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#b0b0b0] leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <p className="text-[#6e6e6e] text-sm">CodersHubInc &copy; 2026</p>
      </footer>
    </main>
  );
}