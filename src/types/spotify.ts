export type SpotifyData = {
    artist: string;
    track: string;
    album: string;
    album_images: Array<{ url: string; height: number; width: number }>;
    is_playing: boolean;
    status: string;
    track_uri: string;
    raw: {
        progress_ms: number;
        item: {
            duration_ms: number;
        };
    };
};
