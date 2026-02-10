<div align="center">

# 🚀 codershubinc.com

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Personal portfolio showcasing projects, live coding stats, and what I'm currently listening to**

[Visit Site](https://codershubinc.com) · [Report Bug](https://github.com/codershubinc/codershubinc.tech/issues) · [Request Feature](https://github.com/codershubinc/codershubinc.tech/issues)

</div>

---

## 👋 About

Welcome to my corner of the internet! This is my personal portfolio website where I share:

- 🎯 **My Projects** - Cool things I've built, from deployment monitoring tools to VS Code extensions
- 📊 **Coding Activity** - Real-time stats showing my GitHub contributions, coding streaks, and favorite programming languages
- 🎵 **Music I'm Listening To** - What's playing on my Spotify right now (because good code needs good music!)
- 💼 **Professional Presence** - Easy access to my GitHub, LinkedIn, and other professional profiles

The site updates automatically to show live data, so you can always see what I'm working on and what technologies I'm using. Whether you're here to check out my work, looking for collaboration opportunities, or just curious about what I do - feel free to explore!

---

## ✨ Features

### 🎯 Core Functionality

- **Project Showcase** - Featured projects with custom cards (Orbit, VS Music, Quazaar)
- **GitHub Integration** - Real-time stats, contribution graphs, streak tracking, and language breakdown
- **Spotify Widget** - Live "now playing" display with album artwork and playback status
- **Markdown Rendering** - Server-side README conversion with syntax highlighting
- **Responsive Design** - Mobile-first, fully responsive layout with smooth animations

### 🛠️ Technical Highlights

- **Server Components** - Optimized data fetching with Next.js App Router
- **API Routes** - Custom endpoints for Spotify, GitHub, and README proxying
- **Type Safety** - Full TypeScript coverage with strict mode
- **Performance** - Image optimization, font loading, and strategic caching
- **Modern UI** - Framer Motion animations, Lucide icons, and dark theme

---

## 🏗️ Tech Stack

| Category              | Technologies                               |
| --------------------- | ------------------------------------------ |
| **Framework**         | Next.js 16 (App Router), React 19          |
| **Language**          | TypeScript 5                               |
| **Styling**           | TailwindCSS 4, Tailwind Typography         |
| **UI Components**     | Radix UI, Framer Motion, Lucide Icons      |
| **Markdown**          | Marked, React Markdown, Rehype, Remark GFM |
| **Code Highlighting** | Highlight.js, Rehype Highlight             |
| **Testing**           | Vitest                                     |
| **Linting**           | ESLint 9                                   |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ or Bun
- pnpm (recommended), npm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/codershubinc/codershubinc.tech.git
   cd codershubinc.tech
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or: npm install
   # or: bun install
   ```

3. **Set up environment variables** (optional)

   ```bash
   cp .env.example .env.local
   ```

   Add your tokens:

   ```env
   GITHUB_TOKEN=ghp_your_github_token_here
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   ```

4. **Run development server**

   ```bash
   pnpm dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

### Run Tests

```bash
pnpm test
```

---

## 📁 Project Structure

```
codershubinc.com/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx         # Home page with all widgets
│   │   ├── layout.tsx       # Root layout
│   │   └── api/             # API routes
│   │       └── spotify/     # Spotify integration endpoint
│   ├── components/          # React components
│   │   ├── GitHubContributions.tsx
│   │   ├── GitHubStatsCard.tsx
│   │   ├── GitHubStreakMini.tsx
│   │   ├── SpotifyWidget.tsx
│   │   ├── TopLanguagesCard.tsx
│   │   └── projects/        # Project-specific cards
│   │       ├── OrbitCard.tsx
│   │       ├── QuazaarCard.tsx
│   │       └── VSMusicCard.tsx
│   ├── constants/           # API endpoints & constants
│   ├── data/               # Static data (projects, skills)
│   ├── lib/                # Utilities & helpers
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── docs/                   # Documentation
└── [config files]
```

---

## 🔌 API Routes

### Spotify Endpoint

```
GET /api/spotify
```

Returns current playback status, track info, and album artwork.

**Response Example:**

```json
{
  "artist": "Artist Name",
  "track": "Song Title",
  "album": "Album Name",
  "is_playing": true,
  "album_images": [{ "url": "...", "height": 640, "width": 640 }],
  "track_uri": "spotify:track:..."
}
```

---

## ⚙️ Environment Variables

| Variable                | Description                                                | Required                    |
| ----------------------- | ---------------------------------------------------------- | --------------------------- |
| `GITHUB_TOKEN`          | GitHub Personal Access Token for increased API rate limits | Optional                    |
| `SPOTIFY_CLIENT_ID`     | Spotify App Client ID                                      | Required for Spotify widget |
| `SPOTIFY_CLIENT_SECRET` | Spotify App Client Secret                                  | Required for Spotify widget |
| `SPOTIFY_REFRESH_TOKEN` | Spotify User Refresh Token                                 | Required for Spotify widget |

### Getting Spotify Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:3000/api/spotify/callback` to redirect URIs
4. Get your Client ID and Secret
5. Follow [this guide](https://github.com/codershubinc/spotify-refresh-token) to get your refresh token

---

## 🎨 Key Components

### GitHub Integrations

- **GitHubContributions** - Contribution graph with hover details
- **GitHubStatsCard** - Total stars, commits, and rank
- **GitHubStreakMini** - Current & longest streak display
- **TopLanguagesCard** - Top 3 languages with percentages

### Spotify Integration

- **SpotifyWidget** - Full now-playing card with album art
- **CurrentlyListeningMini** - Compact version for sidebar

### Project Cards

- **OrbitCard** - Self-hosted deployment monitoring
- **VSMusicCard** - VS Code music extension
- **QuazaarCard** - Cross-platform media control

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codershubinc/codershubinc.tech)

1. Click the button above
2. Configure environment variables
3. Deploy!

### Manual Deployment

```bash
pnpm build
```

The output will be in the `.next` folder. Configure your hosting provider to serve this directory.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feat/amazing-feature`
5. **Open** a Pull Request

Please ensure:

- Code follows existing style conventions
- All tests pass (`pnpm test`)
- ESLint shows no errors (`pnpm lint`)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Swapnil Ingle** ([@codershubinc](https://github.com/codershubinc))

- Website: [codershubinc.com](https://codershubinc.com)
- GitHub: [@codershubinc](https://github.com/codershubinc)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting & Deployment
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Music integration
- [GitHub API](https://docs.github.com/en/rest) - Stats & data

---

<div align="center">

**If you find this project useful, please consider giving it a ⭐!**

Made with ❤️ and ☕ by [Swapnil Ingle](https://github.com/codershubinc)

</div>
