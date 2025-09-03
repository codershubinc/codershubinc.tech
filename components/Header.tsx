import Link from "next/link";

interface HeaderProps {
    showBackButton?: boolean;
    backButtonText?: string;
    backButtonHref?: string;
}

export default function Header({
    showBackButton = false,
    backButtonText = "← Back to Home",
    backButtonHref = "/"
}: HeaderProps) {
    return (
        <nav className="px-6 py-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {showBackButton ? (
                    <Link
                        href={backButtonHref}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                    >
                        {backButtonText}
                    </Link>
                ) : (
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-sm font-bold text-white">CH</span>
                        </div>
                        <span className="text-lg font-semibold">CodersHub Inc</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}