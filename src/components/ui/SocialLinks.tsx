import { SOCIAL_LINKS } from "@/data/socials";

type variantType = "small" | "default" | "large" | "tile" | "icon";
export default function SocialLinks({ variant = "default" }: { variant?: variantType }) {
    const variantStyles = {
        small: {
            container: "px-3 py-1.5 text-[10px] rounded-lg gap-1.5 flex-row",
            iconSize: 12,
        },
        default: {
            container: "px-4 py-2.5 text-xs rounded-xl gap-2 flex-row",
            iconSize: 14,
        },
        large: {
            container: "px-6 py-3.5 text-sm rounded-2xl gap-3 flex-row",
            iconSize: 18,
        },
        tile: {
            container: "w-24 h-24 p-4 text-xs rounded-2xl gap-3 flex-col justify-center text-center",
            iconSize: 24,
        },
        icon: {
            container: "w-10 h-10 p-0 rounded-full justify-center flex-row",
            iconSize: 16,
        }
    }

    const currentStyle = variantStyles[variant] || variantStyles.default;

    return (
        <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => {
                const { Icon } = link;
                return (
                    <a
                        key={link.id}
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`group flex items-center font-mono border transition-all 
                            ${currentStyle.container} 
                            ${link.baseStyles} 
                            ${link.hoverStyles}`}
                        title={variant === 'icon' ? link.shortLabel : undefined}
                    >
                        <Icon
                            size={currentStyle.iconSize}
                            className={`transition-colors ${link.iconHover}`}
                        />

                        {/* Only render text if it's not the icon-only variant */}
                        {variant !== 'icon' && (
                            <span className={variant === 'tile' ? 'w-full truncate' : ''}>
                                {variant === 'tile' ? link.shortLabel : link.label}
                            </span>
                        )}
                    </a>
                )
            })}
        </div>
    )
}