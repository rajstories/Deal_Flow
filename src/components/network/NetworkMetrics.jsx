import React from 'react';
import { motion } from 'framer-motion';
import { Users, GitBranch, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const metrics = [
    {
        label: 'Network Reach',
        value: '12,405',
        subtext: 'founders reachable',
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        trend: '+284 this month'
    },
    {
        label: 'Warm Paths',
        value: '84',
        subtext: 'intros available',
        icon: GitBranch,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        trend: 'via portfolio founders'
    },
    {
        label: 'Decay Alert',
        value: '3',
        subtext: 'Key LPs at risk',
        icon: AlertTriangle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        isAlert: true,
        trend: 'No contact 30+ days'
    }
];

export default function NetworkMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                        'relative p-4 rounded-lg border bg-white',
                        metric.isAlert ? 'border-red-200' : 'border-slate-200'
                    )}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                {metric.label}
                            </p>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className={cn('text-2xl font-semibold', metric.isAlert ? 'text-red-600' : 'text-slate-900')}>
                                    {metric.value}
                                </span>
                                <span className="text-[13px] text-slate-500">{metric.subtext}</span>
                            </div>
                            <p className={cn(
                                'text-[11px] mt-1.5',
                                metric.isAlert ? 'text-red-500' : 'text-slate-400'
                            )}>
                                {metric.trend}
                            </p>
                        </div>
                        <div className={cn('p-2 rounded-md', metric.bgColor)}>
                            <metric.icon className={cn('w-4 h-4', metric.color)} />
                        </div>
                    </div>
                    {metric.isAlert && (
                        <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-red-300 pointer-events-none"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
}