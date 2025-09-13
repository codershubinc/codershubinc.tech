"use client"
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import { getFeaturedProjects } from "@/data";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <ProjectCarousel 
        projects={featuredProjects}
        title="Featured Projects"
        description="Open-source tools built to enhance your development workflow"
      />
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Open-source tools built to enhance your development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* GitHub NewTab Project Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                GitHub NewTab
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your GitHub dashboard in every new tab.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/projects/github-newtab"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  View Details
                </Link>
                <a
                  href="#"
                  className="flex-1 border border-gray-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  Download
                </a>
              </div>
            </div>

            {/* VS Music Project Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                VS Music
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Control your music directly from VS Code.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/projects/vs-music"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  View Details
                </Link>
                <a
                  href="#"
                  className="flex-1 border border-gray-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  Download
                </a>
              </div>
            </div>

            {/* Placeholder for future project */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                More Coming Soon
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                New developer tools in development.
              </p>
              <div className="flex gap-3">
                <button
                  disabled
                  className="flex-1 bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 font-medium py-2 px-4 rounded-lg text-center cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Built by a Developer, for Developers
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our core principles guide everything we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Open Source First */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Open Source First
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                All our projects are open-source. We believe in the power of community and transparency.
              </p>
            </div>

            {/* Practical & Purposeful */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Practical & Purposeful
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                We build tools to solve real, everyday frustrations, not to chase trends.
              </p>
            </div>

            {/* Clean & Lightweight */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Clean & Lightweight
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our goal is to create software that is efficient, easy to use, and gets out of your way.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              CodersHub Inc is a brand by Swapnil Ingle.
            </p>
            <a
              href="https://swapnilingle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
            >
              Learn more about the creator →
            </a>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-20 px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Updates
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay updated with our latest releases and announcements
            </p>
          </div>

          <div className="space-y-6">
            {/* Sample update post */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  September 3, 2025
                </div>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Release
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Welcome to CodersHub Inc
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We&apos;re excited to launch our new brand hub showcasing our collection of open-source developer tools.
                This marks the beginning of our journey to build practical utilities that solve real developer problems.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Read more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join the Community
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Help us build better tools for developers. Contribute code, report issues, or simply stay connected
            for updates on our latest projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/codershubinc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://github.com/codershubinc/codershubinc.tech/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Report an Issue
            </a>
            <a
              href="https://x.com/codershubinc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Follow for Updates
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="detailed" />
    </div>
  );
}
