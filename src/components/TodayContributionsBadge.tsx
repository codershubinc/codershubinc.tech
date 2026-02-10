import { GitCommit } from 'lucide-react';
import { getTodayContributions } from '@/lib/githubContributions';

export default async function TodayContributionsBadge() {
    const count = await getTodayContributions();

    const interval = setInterval(async () => {
        const newCount = await getTodayContributions();
        if (newCount !== count) {
            clearInterval(interval);
            window.location.reload();
        }
    }, 5000);


    return (
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-zinc-800/80 to-zinc-900/80 border border-white/10 text-xs font-mono font-bold text-zinc-300 shadow-md backdrop-blur-sm">
            <GitCommit size={12} className="text-zinc-400" />
            <span className="text-white">{count}</span>
            <span className="text-zinc-500">contributions  today </span>
        </div>
    );
}
