export type MusicData = {
    all_songs: number;
    device_numbers: number;
    last_playing_song: {
        device_id: string;
        device_name: string;
        title: string;
        artists: string[];
        artist: string;
        album: string;
        playback_status: string;
        current_seconds: number;
        duration_ms: number;
        artwork_url: string;
        source: string;
        last_updated: string;
    } | null;
    todays_play_count: number;
    todays_total_listening_time_sec: number;
    total_listening_time_sec: number;
    total_play_count: number;
    tracked_from?: string;
};
