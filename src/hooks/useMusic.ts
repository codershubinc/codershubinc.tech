import { MusicData } from "@/types";
import { useEffect, useState } from "react";

export function useMusic() {
    const [musicData, setMusicData] = useState<MusicData>();
    const getMusicData = async () => {
        try {
            const res = await fetch('/api/music', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setMusicData(data);
                return data;
            }
        } catch (error) {
            console.error('Music error:', error);
        }
        return setMusicData(undefined);
    }

    useEffect(() => {
        getMusicData(); // Fetch immediately on mount
        const interval = setInterval(() => {
            getMusicData();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return { musicData, getMusicData };
}
