// Import server components from utils directory
import generateMetadata from "./utils/generateMetadata";
import generateStaticParams from "./utils/generateStaticParams";
import ProjectDataProvider from "./utils/ProjectDataProvider";

// Re-export functions for use in page.tsx
export { generateMetadata, generateStaticParams, ProjectDataProvider };