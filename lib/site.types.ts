// Site configuration types

export interface Author {
    name: string;
    url: string;
    twitter: string;
}

export interface SocialLinks {
    github: string;
    twitter: string;
    portfolio: string;
    email: string;
}

export interface SiteConfig {
    name: string;
    tagline: string;
    description: string;
    url: string;
    author: Author;
    social: SocialLinks;
}