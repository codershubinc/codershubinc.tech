import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "openapi",
    title: "Open-API",
    slug: "open-api",
    description: "An open-source API toolkit featuring a versioned routing architecture that provides developers with instant mock data, secure cryptographic tools, and server-side proxies to bypass client-side CORS.",
    techStack: ["TypeScript", "Node.js", "Express", "REST API"],
    liveUrl: "[https://api.codershubinc.tech](https://api.codershubinc.tech)",
    githubUrl: "[https://github.com/codershubinc/open-api](https://github.com/codershubinc/open-api)",
    featured: true,
  },
  {
    id: "aaxion",
    title: "Aaxion",
    slug: "aaxion",
    description: "A high-performance, self-hosted cloud storage and media streaming server. Utilizes Go goroutines for concurrent video delivery and WebSockets for real-time state synchronization.",
    techStack: ["Go", "SQLite", "WebSockets", "Concurrency"],
    liveUrl: "[https://github.com/codershubinc/aaxion](https://github.com/codershubinc/aaxion)",
    githubUrl: "[https://github.com/codershubinc/aaxion](https://github.com/codershubinc/aaxion)",
    featured: true,
  },
  {
    id: "quazaar",
    title: "Quazaar",
    slug: "quazaar",
    description: "A system telemetry and productivity platform featuring a Go-based background agent that streams live OS metrics to a unified React Native developer dashboard.",
    techStack: ["Go", "React Native", "WebSockets", "System Telemetry"],
    liveUrl: "[https://github.com/codershubinc/quazaar](https://github.com/codershubinc/quazaar)",
    githubUrl: "[https://github.com/codershubinc/quazaar](https://github.com/codershubinc/quazaar)",
    featured: true,
  },
  {
    id: "vsmusic",
    title: "VS Music",
    slug: "vs-music",
    description: "A cross-platform VS Code extension bridging the editor's Webview API with native OS media controls via custom Node.js and C# background services. 550+ active installations.",
    techStack: ["TypeScript", "Node.js", "C#", "VS Code API"],
    liveUrl: "[https://marketplace.visualstudio.com/items?itemName=codershubinc.vs-music](https://marketplace.visualstudio.com/items?itemName=codershubinc.vs-music)",
    githubUrl: "[https://github.com/codershubinc/vs-music](https://github.com/codershubinc/vs-music)",
    featured: true,
  }
];
