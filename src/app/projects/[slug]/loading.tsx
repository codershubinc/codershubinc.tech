
export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#09090b]">
            <div className="relative bg-[#0c0c0c] border-b border-white/10 overflow-hidden h-[400px]">
                <div className="container mx-auto px-6 py-16 relative z-10">
                    <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-8"></div>
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse"></div>
                            <div className="h-12 w-64 bg-white/10 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-full bg-white/10 rounded animate-pulse"></div>
                        <div className="h-6 w-2/3 bg-white/10 rounded animate-pulse"></div>
                        <div className="flex gap-2 pt-2">
                            <div className="h-8 w-20 bg-white/10 rounded-full animate-pulse"></div>
                            <div className="h-8 w-20 bg-white/10 rounded-full animate-pulse"></div>
                            <div className="h-8 w-20 bg-white/10 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-[#18181b] rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm h-[600px] animate-pulse"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#18181b] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm h-[300px] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
