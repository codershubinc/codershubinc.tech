import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'icon' | 'text' | 'modern';
    href?: string;
    className?: string;
    showText?: boolean;
    textSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({
    size = 'md',
    variant = 'modern',
    href = "/",
    className,
    showText = true,
    textSize = 'md'
}: LogoProps) {
    // Size mappings for the logo
    const logoSizes = {
        sm: { width: 20, height: 20 },
        md: { width: 28, height: 28 },
        lg: { width: 36, height: 36 },
        xl: { width: 48, height: 48 }
    };

    // Text size classes
    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl'
    };

    // SVG file mapping
    const svgFiles = {
        icon: '/static/ch-logo-icon.svg',
        text: '/static/ch-logo.svg',
        modern: '/static/ch-logo-modern.svg'
    };

    const logoElement = (
        <div className={`inline-flex items-center gap-3 ${className || ''}`}>
            <Image
                src={svgFiles[variant]}
                alt="CodersHub Inc Logo"
                width={logoSizes[size].width}
                height={logoSizes[size].height}
                className="object-contain"
            />
            {showText && (
                <span className={`font-semibold ${textSizeClasses[textSize]}`}>
                    CodersHub Inc
                </span>
            )}
        </div>
    );

    // If href is provided, wrap in Link
    if (href) {
        return (
            <Link href={href}>
                {logoElement}
            </Link>
        );
    }

    return logoElement;
}

// Export convenience components
export function LogoIcon({ size = 'md', className }: Pick<LogoProps, 'size' | 'className'>) {
    return <Logo size={size} variant="icon" showText={false} className={className} href="" />;
}

export function LogoWithText({ size = 'md', textSize = 'md', href = "/", className }: Pick<LogoProps, 'size' | 'textSize' | 'href' | 'className'>) {
    return <Logo size={size} variant="modern" showText={true} textSize={textSize} href={href} className={className} />;
}