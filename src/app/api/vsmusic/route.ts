import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://vsmusic.codershubinc.com/api/capsule-info", {
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({ installs: "500+" }, { status: res.status });
    } catch (error) {
        console.error("Failed to fetch VS Music stats:", error);
        return NextResponse.json({ installs: "500+" }, { status: 500 });
    }
}
