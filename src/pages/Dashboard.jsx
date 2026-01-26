import React from 'react';
import { Wallet, Target, Brain, Zap } from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed';
import LatestAnalysis from '@/components/dashboard/LatestAnalysis';

export default function Dashboard() {
    const metrics = [
        {
            title: 'Portfolio Value',
            value: '$95.2M',
            change: '+12.3%',
            changeType: 'positive',
            icon: Wallet,
            iconBg: 'bg-emerald-500',
        },
        {
            title: 'Active Deals',
            value: '12',
            change: '3 new this week',
            changeType: 'neutral',
            icon: Target,
            iconBg: 'bg-purple-500',
        },
        {
            title: 'AI Score Avg',
            value: '84.2',
            change: '+2.4',
            changeType: 'positive',
            icon: Brain,
            iconBg: 'bg-emerald-500',
        },
        {
            title: 'Agent Actions',
            value: '1,247',
            change: 'Last 24h',
            changeType: 'neutral',
            icon: Zap,
            iconBg: 'bg-orange-500',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                    Good morning, Prince.
                </h1>
                <p className="text-slate-500 mt-1">
                    Your agent analyzed <span className="font-medium text-indigo-600">47 decks</span> overnight.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {metrics.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <PortfolioChart />
                </div>
            </div>

            {/* Additional Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LatestAnalysis />
                <LiveActivityFeed />
            </div>
        </div>
    );
}