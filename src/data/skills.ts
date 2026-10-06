import { CodingLanguages, SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    category: "Backend & Systems",
    items: ["Go (Golang)", "Node.js", "C#", "System Architecture"]
  },
  {
    category: "DevOps & Linux",
    items: ["Arch Linux", "Ubuntu Server", "Docker", "Bash/Zsh"]
  },
  {
    category: "Frontend & Tools",
    items: ["TypeScript", "Next.js", "Tailwind CSS", "Git", "VS Code API"]
  }
];

export const langs: CodingLanguages[] = [
  {
    category: "Programming Languages",
    items: ["Go (Golang)", "TypeScript", "C#", "Python", "JavaScript"]
  }, {
    category: "Web Technologies",
    items: ["HTML", "CSS", "SASS", "Tailwind CSS", "React", "Next.js"]
  }
];