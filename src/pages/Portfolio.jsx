import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ExternalLink, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const portfolioCompanies = [
    {
        name: 'SolarX Energy',
        sector: 'CleanTech',
        invested: '$2.0M',
        currentVal: '$3.5M',
        multiple: '1.75x',
        trend: 'up',
        status: 'Series B',
        statusColor: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
        name: 'FinFlow AI',
        sector: 'FinTech',
        invested: '$1.5M',
        currentVal: '$1.8M',
        multiple: '1.20x',
        trend: 'up',
        status: 'Growing',
        statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    {
        name: 'MediBot',
        sector: 'HealthTech',
        invested: '$5.0M',
        currentVal: '$4.8M',
        multiple: '0.96x',
        trend: 'down',
        status: 'Underperforming',
        statusColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
        name: 'CyberGuard',
        sector: 'CyberSec',
        invested: '$3.0M',
        currentVal: '$4.5M',
        multiple: '1.50x',
        trend: 'up',
        status: 'Series A',
        statusColor: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
        name: 'DataMesh',
        sector: 'Infrastructure',
        invested: '$4.2M',
        currentVal: '$12.6M',
        multiple: '3.00x',
        trend: 'up',
        status: 'Breakout',
        statusColor: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
        name: 'NeuralMind',
        sector: 'AI/ML',
        invested: '$1.8M',
        currentVal: '$5.4M',
        multiple: '3.00x',
        trend: 'up',
        status: 'Seed',
        statusColor: 'bg-slate-100 text-slate-700 border-slate-200'
    },
];

const KPICard = ({ title, value, subtext, valueColor = "text-slate-900" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-full">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
            <span className={cn("text-3xl font-bold tracking-tight", valueColor)}>
                {value}
            </span>
        </div>
    </div>
);

export default function Portfolio() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
            {/* Header Section */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Portfolio Performance</h1>
                    <p className="text-slate-500 text-sm mt-1">Real-time tracking of fund investments and valuations.</p>
                </div>

                {/* Summary Header - KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KPICard
                        title="Total Invested"
                        value="$24.0M"
                    />
                    <KPICard
                        title="Current Value"
                        value="$95.2M"
                        valueColor="text-emerald-600"
                    />
                    <KPICard
                        title="Avg Multiple"
                        value="2.8x"
                    />
                </div>
            </div>

            {/* Investment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioCompanies.map((company) => (
                    <div
                        key={company.name}
                        className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="p-5 border-b border-slate-50 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    {company.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {company.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">{company.sector}</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                        </div>

                        {/* Data Table */}
                        <div className="p-5 space-y-3 flex-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Invested</span>
                                <span className="font-mono font-medium text-slate-900">{company.invested}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Valuation</span>
                                <span className="font-mono font-medium text-slate-900">{company.currentVal}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Multiple</span>
                                <div className="flex items-center gap-1.5">
                                    {company.trend === 'up' && (
                                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                                    )}
                                    <span className={cn(
                                        "font-mono font-bold",
                                        company.trend === 'up' ? "text-emerald-600" : "text-slate-600"
                                    )}>
                                        {company.multiple}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 mt-auto">
                            <span className={cn(
                                "inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                                company.statusColor
                            )}>
                                {company.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}