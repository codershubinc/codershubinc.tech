// Generate static params for static generation
import { getAllProjectIds } from "@/data";

export async function generateStaticParams() {
    return getAllProjectIds().map((projectName) => ({
        projectName,
    }));
}

export default generateStaticParams;