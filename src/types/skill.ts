export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'tools' | 'other';
    icon?: string; // Path to icon or icon component name
}
