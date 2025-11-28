# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Project Detail Tabs**: Introduced a tabbed interface on the project detail page to organize content better.
  - **README**: Displays the project's `README.md`.
  - **Roadmap**: Displays `ROADMAP.md` if available.
  - **Contributing**: Displays `CONTRIBUTING.md` if available.
  - **Files**: Shows the repository file structure.
- **Animated Tags**: Added `AnimatedTags` component using Framer Motion for staggered entrance animations and hover effects on language/tech tags.
- **GitHub API Enhancements**:
  - Implemented parallel fetching for multiple project files (README, ROADMAP, CONTRIBUTING, file tree).
  - Added strong caching (24 hours) to GitHub API requests to prevent rate limiting.
  - Added `roadmap`, `contributing`, and `fileTree` fields to the `Project` type.
- **Markdown Styling**: Improved Markdown rendering styles to support both light and dark modes properly, mimicking GitHub's appearance.

### Changed

- **Project Detail Page**: Refactored `src/app/projects/[slug]/page.tsx` to use the new `ProjectTabs` and `AnimatedTags` components.
- **GitHub API Client**: Updated `fetchProjectBySlug` in `src/lib/api/github.ts` to handle the new data requirements and caching strategy.
- **Theme Utilities**: Updated `getGitHubThemeStyles` in `src/lib/utils.ts` to provide better light/dark mode support for rendered Markdown content.

### Fixed

- Addressed TypeScript errors related to Framer Motion variants and type predicates.
- Fixed linting issues in `page.tsx` and `github.ts`.
