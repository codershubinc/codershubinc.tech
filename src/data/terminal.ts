import { siteConfig } from "@/data/site";

export const terminalData = {
    overview: {
        endpoint: "https://api.codershub.inc/v1/portfolio",
        response: {
            status: 200,
            message: "OK",
            data: {
                organization: "CodersHub Inc",
                type: "Open Source Collective",
                mission: "Building Developer Excellence",
                stack: ["Next.js", "TypeScript", "TailwindCSS", "Node.js"],
                maintainer: {
                    name: siteConfig.author.name,
                    github: siteConfig.author.github
                },
                projects: {
                    count: "10+",
                    status: "Active Development",
                    link: "/projects"
                }
            },
            timestamp: new Date().toISOString()
        }
    },
    stack: {
        endpoint: "https://api.codershub.inc/v1/stack",
        response: {
            status: 200,
            data: {
                frontend: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
                backend: ["Node.js", "Bun", "PostgreSQL", "Redis"],
                devops: ["Docker", "GitHub Actions", "Vercel", "AWS"],
                tools: ["VS Code", "Git", "Figma"]
            },
            timestamp: new Date().toISOString()
        }
    },
    languages: {
        endpoint: "https://api.codershub.inc/v1/languages",
        response: {
            status: 200,
            data: [
                { name: "TypeScript", proficiency: "Expert", usage: "90%" },
                { name: "Python", proficiency: "Advanced", usage: "75%" },
                { name: "Rust", proficiency: "Intermediate", usage: "40%" },
                { name: "Go", proficiency: "Intermediate", usage: "35%" }
            ],
            timestamp: new Date().toISOString()
        }
    },
    projects: {
        endpoint: "https://api.codershub.inc/v1/projects",
        response: {
            status: 200,
            data: [
                { id: 1, name: "VS Music", type: "VS Code Extension", stars: "1.2k+" },
                { id: 2, name: "GitHub New Tab", type: "Browser Addon", users: "5k+" },
                { id: 3, name: "Portfolio", type: "Web App", stack: "Next.js" }
            ],
            timestamp: new Date().toISOString()
        }
    },
    github: {
        endpoint: "https://api.github.com/users/codershubinc/stats",
        response: {
            status: 200,
            data: {
                mode: "daily",
                totalContributions: 1788,
                firstContribution: "2021-09-11",
                longestStreak: {
                    start: "2025-06-20",
                    end: "2025-11-21",
                    length: 155
                },
                currentStreak: {
                    start: "2025-06-20",
                    end: "2025-11-21",
                    length: 155
                },
                excludedDays: []
            },
            timestamp: new Date().toISOString()
        }
    }
};

export type TerminalData = typeof terminalData;
export type TerminalEndpoint = keyof TerminalData;
