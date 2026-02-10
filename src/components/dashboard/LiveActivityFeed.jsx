import React, { useEffect, useState } from 'react';
import { FileText, Search, Users, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAgentActivity } from '@/services/api';
import SpotlightCard from '@/components/ui/SpotlightCard';

const ICON_MAP = {
    FileText: { icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    Search: { icon: Search, color: "text-blue-600", bg: "bg-blue-50" },
    Users: { icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    TrendingUp: { icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
    Sparkles: { icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
    CheckCircle2: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
};

export default function LiveActivityFeed() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Ensure api.js exports getAgentActivity. 
                // The backend /api/activity returns array of { id, type, text, time, badge }
                const data = await getAgentActivity();
                setActivities(data);
            } catch (error) {
                console.error("Failed to fetch activity feed:", error);
            }
        };

        fetchActivities();
    }, []);

    const renderActivityItem = (item) => {
        // Fallback if type not found
        const config = ICON_MAP[item.type] || ICON_MAP.FileText;
        const Icon = config.icon;

        return (
            <div key={item.id} className="flex gap-3 items-start group">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-slate-700 font-medium leading-snug group-hover:text-slate-900 transition-colors">
                            {item.text}
                        </p>
                        {item.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 shrink-0">
                                {item.badge}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
            </div>
        );
    };

    return (
        <SpotlightCard className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 font-semibold">Live Agent Activity</h3>
                <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">Live</span>
                </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {activities.length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-slate-400 text-sm">
                        Loading activity...
                    </div>
                ) : (
                    activities.map(renderActivityItem)
                )}
            </div>
        </SpotlightCard>
    );
}
