import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { cn } from '@/lib/utils';

export default function MetricCard({ title, value, change, changeType, icon: Icon, iconBg }) {
    return (
        <SpotlightCard className="p-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">{value}</h3>
                {change && (
                    <div className="flex items-center pt-1">
                        <span
                            className={cn(
                                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                                changeType === 'positive' && 'bg-emerald-50 text-emerald-700',
                                changeType === 'negative' && 'bg-red-50 text-red-700',
                                changeType === 'neutral' && 'bg-gray-100 text-slate-600'
                            )}
                        >
                            {change}
                        </span>
                    </div>
                )}
            </div>
        </SpotlightCard>
    );
}