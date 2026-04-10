# 🚀 Upcoming Features & Roadmap

This document keeps track of the pending ideas and feature suggestions to further upgrade the portfolio.

## 1. 📟 Interactive Terminal / Live Guestbook

- **Concept:** A retro, interactive CLI on the home page (or a dedicated `/terminal` route).
- **Features:**
  - Users can type commands like `help`, `about`, `projects`, etc.
  - A `sign` or `echo` command that lets visitors leave a message.
  - Connect to a lightweight database (like Supabase, Firebase, or Vercel Postgres) to save and display "Live System Logs" (Guestbook entries) from other users.

## 2. 📋 Code Block "Copy" Button

- **Concept:** Enhance the custom Markdown renderer we built.
- **Features:**
  - Add a small `Copy` icon on the top right of the code blocks (`pre` tags) in the project detail pages.
  - Animated checkmark `✓` when clicked, using Framer Motion.
- **Status:** Done

## 3. 🔍 Project Filtering & Search

- **Concept:** Upgrade the `/projects` listing page.
- **Features:**
  - Add a search bar to filter projects by title or description.
  - Add pill-shaped category toggles (e.g., `TypeScript`, `Next.js`, `Python`, `VS Code Extension`) to sort the project grid dynamically with smooth Framer Motion layout transitions.

## 4. 🌐 Dynamic SEO & OpenGraph Images

- **Concept:** Better link sharing previews for social media (Twitter, LinkedIn, Discord).
- **Features:**
  - Use Next.js `generateMetadata` for dynamic `/projects/[slug]` SEO.
  - Implement `@vercel/og` to generate custom preview images on the fly that display the project's title, tech stack, and a cool terminal background.

## 5. 📧 Advanced Contact Form

- **Concept:** Allow recruiters to reach out directly from the UI without opening an email client.
- **Features:**
  - A sleek, terminal-window style form.
  - Integrated with Resend, EmailJS, or NodeMailer to send emails directly to your inbox.
  - Rate limiting and validation using Zod.

---

_Created by Copilot to track portfolio enhancements._
