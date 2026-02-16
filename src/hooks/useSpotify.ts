import { SpotifyData } from "@/constants/constantApis";
import { useEffect, useState } from "react";

export function useSpotify() {
    const [spotifyData, setSpotifyData] = useState<SpotifyData>();
    const getSpotifyData = async () => {
        try {
            const res = await fetch('/api/spotify', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setSpotifyData(data);
                return data;
            }
        } catch (error) {
            console.error('Spotify error:', error);
        }
        return setSpotifyData(undefined);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getSpotifyData();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return { spotifyData, getSpotifyData };
}