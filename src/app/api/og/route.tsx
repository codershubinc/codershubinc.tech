import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Get the slug from query params
        const slug = searchParams.get("slug");

        // Find the project, default to a fallback layout if not found
        const project = projects.find((p) => p.slug === slug);

        const isHome = slug === "home" || !slug;

        const title = isHome ? "CodersHubInc | Swapnil Ingle" : (project?.title || "My Projects");
        const description = isHome
            ? "Backend Developer & Linux Enthusiast. Building high-performance systems and open-source tools."
            : (project?.description || "A complete archive of my open-source work, active projects, tools, and experiments.");
        const techStack = isHome
            ? ["Go", "TypeScript", "Node.js", "Linux", "Open Source"]
            : (project?.techStack || ["Portfolio", "Projects", "Open Source"]);

        return new ImageResponse(
            (
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: "#0a0a0a",
                        backgroundImage: "radial-gradient(circle at 50% 50%, #111111 0%, #000000 100%)",
                        color: "#ffffff",
                        fontFamily: "sans-serif",
                    }}
                >
                    {/* Subtle Ambient Glow */}
                    <div
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "800px",
                            height: "400px",
                            background: "rgba(0, 122, 204, 0.15)",
                            filter: "blur(150px)",
                            borderRadius: "50%",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            width: "1000px",
                            padding: "80px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "24px",
                            background: "linear-gradient(135deg, rgba(20,20,20,0.9), rgba(10,10,10,0.8))",
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* Terminal Top Bar Output */}
                        <div
                            style={{
                                display: "flex",
                                color: "#007acc",
                                fontSize: 28,
                                marginBottom: 20,
                                alignItems: "center",
                                fontFamily: "monospace",
                            }}
                        >
                            <span style={{ marginRight: 8 }}>{">"}</span>
                            <span style={{ color: "#a0a0a0" }}>~/</span>
                            {isHome ? null : <span style={{ color: "#a0a0a0" }}>projects/</span>}
                            <span style={{ color: "#ffffff", fontWeight: "bold" }}>{isHome ? "" : (slug || "all")}</span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                fontSize: 72,
                                fontWeight: "bolder",
                                letterSpacing: "-2px",
                                marginBottom: 24,
                                lineHeight: 1.1,
                            }}
                        >
                            {title}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                fontSize: 32,
                                color: "#888888",
                                marginBottom: 60,
                                lineHeight: 1.4,
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {description}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                            }}
                        >
                            {techStack.map((tech: string) => (
                                <div
                                    key={tech}
                                    style={{
                                        display: "flex",
                                        padding: "8px 20px",
                                        background: "rgba(255,255,255,0.05)",
                                        color: "#d4d4d4",
                                        fontSize: 24,
                                        borderRadius: "100px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "40px",
                                right: "40px",
                                display: "flex",
                                alignItems: "center",
                                fontSize: 24,
                                color: "#666",
                                fontFamily: "monospace",
                            }}
                        >
                            CodersHubInc.com
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        return new Response("Failed to generate image", { status: 500 });
    }
}