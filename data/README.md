# Data Architecture

This directory contains all the data and configuration for the CodersHub Inc website in a modular, organized structure.

## Structure

```
data/
├── index.ts              # Main export file - re-exports everything
├── types.ts              # TypeScript type definitions
├── projects/             # Project-related data
│   ├── index.ts          # Detailed project data exports
│   ├── summaries.ts      # Simplified project data for listings
│   ├── github-newtab.ts  # GitHub NewTab project data
│   └── vs-music.ts       # VS Music project data
└── site/                 # Site configuration
    └── config.ts         # Site-wide configuration
```

## Usage

### Import from the main data module

```typescript
import {
  projectsData, // Simplified project data (legacy)
  projectSummaries, // Simplified project data (new)
  detailedProjects, // Full project data
  siteConfig, // Site configuration
  getProjectById, // Helper function
  getFeaturedProjects, // Helper function
  getAllProjectIds, // Helper function
} from "@/data";
```

### Import from lib/config (for backward compatibility)

```typescript
import { projectsData, siteConfig } from "@/lib/config";
```

## Data Types

### ProjectSummary

Simplified project data used for project listings and cards:

- `id`: Project identifier
- `name`: Project name
- `tagline`: Short description
- `description`: Longer description
- `icon`: Icon identifier
- `downloadLink`: Download URL
- `githubLink`: GitHub repository URL
- `featured`: Whether the project is featured

### ProjectData

Full project data used for individual project pages:

- All `ProjectSummary` fields plus:
- `features`: Array of key features
- `techStack`: Technologies used
- `links`: Object with download, GitHub, and README links
- `installationSteps`: Step-by-step installation guide
- `creator`: GitHub user information
- Optional: `screenshots`, `ideaBehindIt`, `futurePlans`, `contributors`

### SiteConfig

Site-wide configuration:

- `name`: Site name
- `tagline`: Site tagline
- `description`: Site description
- `url`: Site URL
- `author`: Author information
- `social`: Social media links

## Helper Functions

- `getProjectById(id)`: Get detailed project data by ID
- `getFeaturedProjects()`: Get all featured projects
- `getAllProjectIds()`: Get array of all project IDs

## Adding New Projects

1. Create a new project file in `data/projects/` (e.g., `new-project.ts`)
2. Follow the `ProjectData` interface structure
3. Import and add it to `data/projects/index.ts`
4. Update the helper functions in `data/projects/summaries.ts` if needed

## Migration Notes

- The old structure in `/app/projects/data/` has been moved to `/data/`
- `/lib/config.ts` now re-exports from the centralized data directory
- All imports have been updated to use the new structure
- Backward compatibility is maintained through re-exports
