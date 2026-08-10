import { Github, Linkedin, Twitter, Instagram, Youtube, Globe, BookOpen, Mail, Command } from "lucide-react";

export const SOCIAL_LINKS = [
    {
        id: 'github',
        url: 'https://github.com/codershubinc',
        label: 'github.com/codershubinc',
        shortLabel: 'GitHub',
        Icon: Github,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-white/25 hover:bg-white/10',
        iconHover: 'group-hover:text-white'
    },
    {
        id: 'linkedin',
        url: 'https://linkedin.com/in/codershubinc',
        label: 'linkedin/codershubinc',
        shortLabel: 'LinkedIn',
        Icon: Linkedin,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10',
        iconHover: 'group-hover:text-[#0A66C2]'
    },
    {
        id: 'twitter',
        url: 'https://twitter.com/codershubinc',
        label: 'x/codershubinc',
        shortLabel: 'Twitter',
        Icon: Twitter,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/10',
        iconHover: 'group-hover:text-[#1DA1F2]'
    },
    {
        id: 'instagram',
        url: 'https://instagram.com/codershubinc',
        label: 'instagram/codershubinc',
        shortLabel: 'Instagram',
        Icon: Instagram,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10',
        iconHover: 'group-hover:text-[#E1306C]'
    },
    {
        id: 'youtube',
        url: 'https://youtube.com/@codershubinc',
        label: 'youtube/codershubinc',
        shortLabel: 'YouTube',
        Icon: Youtube,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-[#FF0000]/40 hover:bg-[#FF0000]/10',
        iconHover: 'group-hover:text-[#FF0000]'
    },
    {
        id: 'website',
        url: 'https://codershubinc.com',
        label: 'codershubinc.com',
        shortLabel: 'Website',
        Icon: Globe,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-teal-500/40 hover:bg-teal-500/10',
        iconHover: 'group-hover:text-teal-500'
    },
    {
        id: 'orcid',
        url: 'https://orcid.org/0009-0004-0386-985X',
        label: 'orcid/0009-0004-0386-985X',
        shortLabel: 'ORCID',
        Icon: BookOpen,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-[#A6CE39]/40 hover:bg-[#A6CE39]/10',
        iconHover: 'group-hover:text-[#A6CE39]'
    },
    {
        id: 'email',
        url: 'mailto:ingleswapnil2004@gmail.com',
        label: 'ingleswapnil2004@gmail.com',
        shortLabel: 'Email',
        Icon: Mail,
        baseStyles: 'text-[#007acc] bg-[#007acc]/10 border-[#007acc]/20',
        hoverStyles: 'hover:bg-[#007acc]/20 hover:border-[#007acc]/40',
        iconHover: ''
    },
    {
        id: 'Steam',
        url: 'https://steamcommunity.com/id/codershubinc',
        label: 'steam/codershubinc',
        shortLabel: 'Steam',
        Icon: Command,
        baseStyles: 'text-[#888] bg-white/5 border-white/10',
        hoverStyles: 'hover:text-white hover:border-[#1b2838]/40 hover:bg-[#1b2838]/10',
        iconHover: 'group-hover:text-[#1b2838]'
    }
]