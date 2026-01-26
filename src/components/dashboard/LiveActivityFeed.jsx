import React from 'react';
import { FileText, Search, Users, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
    {
        id: 1,
        icon: FileText,
        text: "Starting deep analysis: BlockChain Solutions",
        time: "Just now",
        color: "text-purple-600",
        bg: "bg-purple-50",
        badge: "NEW"
    },
    {
        id: 2,
        icon: Search,
        text: "New deck received: QuantumLeap ($3M raise)",
        time: "1 min ago",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        id: 3,
        icon: Users,
        text: "Founder background check: DataSync CEO verified",
        time: "2 min ago",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        id: 4,
        icon: TrendingUp,
        text: "Updated metrics for 12 portfolio companies",
        time: "5 min ago",
        color: "text-teal-600",
        bg: "bg-teal-50"
    },
    {
        id: 5,
        icon: Sparkles,
        text: "GPT analysis complete: Market validation passed",
        time: "12 min ago",
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        id: 6,
        icon: CheckCircle2,
        text: "Due diligence report ready: HealthFirst",
        time: "15 min ago",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    }
];

import SpotlightCard from '@/components/ui/SpotlightCard';

export default function LiveActivityFeed() {
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
                {activities.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start group">
                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors", item.bg)}>
                            <item.icon className={cn("h-4 w-4", item.color)} />
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
                ))}
            </div>
        </SpotlightCard>
    );
}
