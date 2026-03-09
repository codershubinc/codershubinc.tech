import { Star, Zap, Coffee } from "lucide-react";

export const SPONSORS: {
    tier: "gold" | "silver" | "bronze";
    name: string;
    url?: string;
    avatar?: string;
    description?: string;
}[] = [
    ];

export const FEATURED_SPONSORS: {
    id: string;
    name: string;
    handle?: string;
    tier: "gold" | "silver" | "bronze";
    description: string;
    quote?: string;
    images: string[];
    url?: string;
    joinedDate: string;
    spooredAmount: string | number;
    currency: string;
    sponsoredProjects: string[];

}[] = [
        {
            id: "ra",
            name: "Rahul Arjun",
            handle: "@rand",
            tier: "gold",
            description:
                "One of the earliest believers in this project. Rahul jumped on board before the road map was even clear — a true early adopter whose support directly funded the infrastructure, tooling, and late-night coffee that keeps the open-source work alive. Grateful doesn't begin to cover it.",
            quote: "Keep building — the community needs more people like you.",
            images: [
                "/assets/sponcers/rh/IMG20260309190605.jpg",
                "/assets/sponcers/rh/IMG20260309190633.jpg",
                "/assets/sponcers/rh/IMG20260309190638.jpg",
                "/assets/sponcers/rh/IMG20260309190645.jpg",
            ],
            joinedDate: "9 th March 2026",
            spooredAmount: "*40 - 15 = 25",
            currency: "INR",
            sponsoredProjects: ["Aaxion"],
        },
    ];

export const SPONSOR_TIERS = [
    {
        id: "gold",
        label: "Gold",
        icon: Star,
        color: "#FFD700",
        glow: "rgba(255,215,0,0.15)",
        border: "rgba(255,215,0,0.3)",
        bg: "rgba(255,215,0,0.05)",
        price: "$50 / month",
        perks: [
            "Name & logo on README and website",
            "Shout-out in release notes",
            "Priority issue responses",
            "Direct Discord access",
        ],
    },
    {
        id: "silver",
        label: "Silver",
        icon: Zap,
        color: "#C0C0C0",
        glow: "rgba(192,192,192,0.15)",
        border: "rgba(192,192,192,0.3)",
        bg: "rgba(192,192,192,0.05)",
        price: "$20 / month",
        perks: [
            "Name on README and website",
            "Shout-out in release notes",
            "Priority issue responses",
        ],
    },
    {
        id: "bronze",
        label: "Bronze",
        icon: Coffee,
        color: "#CD7F32",
        glow: "rgba(205,127,50,0.15)",
        border: "rgba(205,127,50,0.3)",
        bg: "rgba(205,127,50,0.05)",
        price: "$5 / month",
        perks: [
            "Name in the sponsors list",
            "A big thank you from the maintainer",
        ],
    },
] as const;

export type Tier = (typeof SPONSOR_TIERS)[number];
export type SponsorEntry = (typeof SPONSORS)[number];
export type FeaturedSponsor = (typeof FEATURED_SPONSORS)[number];
