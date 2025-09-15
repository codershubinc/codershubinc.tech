import Link from "next/link";
import { SocialMediaLinks } from "./SocialIcon";
import { LogoWithText } from "./Logo";
import { siteConfig } from "@/data/site/config";

interface FooterProps {
    variant?: 'simple' | 'detailed';
}

export default function Footer({ variant = 'detailed' }: FooterProps) {
    const currentYear = 2025;

    if (variant === 'simple') {
        return (
            <footer className="bg-gray-900 dark:bg-slate-900 text-white py-8 px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-row items-center justify-center gap-4 mb-4">
                        <LogoWithText
                            size="sm"
                            textSize="md"
                            href="/"
                            className=""
                        />
                    </div>
                    <p className="text-gray-400 text-center">© {currentYear} {siteConfig.name}. All rights reserved.</p>
                </div>
            </footer>
        );
    } return (
        <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="py-16 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <div className="flex flex-row items-center gap-4 mb-6">
                                <LogoWithText
                                    size="lg"
                                    textSize="xl"
                                    href="/"
                                    className=""
                                />
                            </div>
                            <p className="text-gray-300 text-lg mb-6 max-w-md leading-relaxed">
                                {siteConfig.description}
                            </p>
                            <div className="flex flex-row items-center justify-start">
                                <SocialMediaLinks
                                    size="lg"
                                    color="gray"
                                    hoverEffect={true}
                                    orientation="horizontal"
                                    gap="lg"
                                />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-white">
                                Quick Links
                            </h3>
                            <nav className="space-y-4">
                                <Link
                                    href="/projects"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    All Projects
                                </Link>
                                <Link
                                    href="/projects/github-newtab"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    GitHub NewTab
                                </Link>
                                <Link
                                    href="/projects/vs-music"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    VS Music
                                </Link>
                                <a
                                    href="https://github.com/codershubinc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    GitHub Organization
                                </a>
                            </nav>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-white">
                                Resources
                            </h3>
                            <nav className="space-y-4">
                                <a
                                    href="https://github.com/codershubinc/codershubinc.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    Source Code
                                </a>
                                <a
                                    href="https://github.com/codershubinc/codershubinc.tech/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    Report Issues
                                </a>
                                <a
                                    href="https://github.com/codershubinc/codershubinc.tech/blob/main/CONTRIBUTING.md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    Contributing
                                </a>
                                <a
                                    href={siteConfig.author.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    About Creator
                                </a>
                            </nav>
                        </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-700">
                        <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                                Stay Updated
                            </h3>
                            <p className="text-gray-300 mb-6 text-sm md:text-base">
                                Get notified about new projects and updates. No spam, ever.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                                />
                                <button className="px-4 md:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm md:text-base">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-gray-400 text-xs md:text-sm mt-3">
                                By subscribing, you agree to our privacy policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 py-6 md:py-8 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-gray-400 text-sm md:text-base">
                            <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
                            <div className="flex flex-row items-center gap-4 md:gap-6">
                                <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">
                                    Terms of Service
                                </Link>
                                <a
                                    href={siteConfig.social.email}
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-gray-400 text-sm md:text-base">
                            <span>Made with</span>
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>by</span>
                            <a
                                href={siteConfig.author.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold hover:text-blue-400 transition-colors duration-200"
                            >
                                {siteConfig.author.name}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}