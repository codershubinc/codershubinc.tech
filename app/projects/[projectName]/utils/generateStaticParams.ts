// Generate static params for static generation
// import removed: getAllProjectIds

export async function generateStaticParams() {
    const res = await fetch("https://api.codershubinc.tech/projects/list/all", {
        next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const projectList: string[] = await res.json();
    return projectList.map((projectName) => ({ projectName }));
}

export default generateStaticParams;