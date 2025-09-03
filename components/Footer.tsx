import { SocialMediaLinks } from "./SocialIcon";
import { LogoWithText } from "./Logo";

interface FooterProps {
    variant?: 'simple' | 'detailed';
}

export default function Footer({ variant = 'detailed' }: FooterProps) {
    if (variant === 'simple') {
        return (
            <footer className="bg-gray-900 dark:bg-slate-900 text-white py-8 px-6 lg:px-8">
                <div className="mx-auto max-w-6xl text-center">
                    <LogoWithText
                        size="sm"
                        textSize="md"
                        href="/"
                        className="mb-4"
                    />
                    <p className="text-gray-400">© 2025 CodersHub Inc. All rights reserved.</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-gray-900 dark:bg-slate-900 text-white py-12 px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <LogoWithText
                            size="md"
                            textSize="lg"
                            href="/"
                            className=""
                        />
                        <p className="text-gray-400 mt-2">© 2025 CodersHub Inc. All rights reserved.</p>
                    </div>

                    <SocialMediaLinks
                        size="md"
                        color="gray"
                        hoverEffect={true}
                        orientation="horizontal"
                        gap="lg"
                    />
                </div>
            </div >
        </footer >
    );
}