import React, { useEffect, useState } from 'react';
import { Wallet, Target, Brain, Zap } from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed';
import LatestAnalysis from '@/components/dashboard/LatestAnalysis';
import { getDashboardMetrics } from '@/services/api';

export default function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // If API is not available, this throws
                const data = await getDashboardMetrics();
                // If data is weird, log it
                console.log('API returned:', data);
                if (Array.isArray(data)) {
                    setMetrics(data);
                } else {
                    console.warn('API returned non-array data, using fallback');
                    throw new Error('Non-array data');
                }
            } catch (error) {
                console.error("Failed to fetch dashboard metrics:", error);
                // Use mock data fallback for demo purposes
                const mockMetrics = [
                    {
                        title: 'Portfolio Value',
                        value: '$95.2M',
                        change: '+12.5%',
                        trend: 'up',
                        icon: 'Wallet',
                        color: 'blue'
                    },
                    {
                        title: 'Active Deals',
                        value: '23',
                        change: '+3 this week',
                        trend: 'up',
                        icon: 'Target',
                        iconName: 'Target',
                        color: 'emerald'
                    },
                    {
                        title: 'AI Analyses',
                        value: '47',
                        change: '+8 today',
                        trend: 'up',
                        icon: 'Brain',
                        iconName: 'Brain',
                        color: 'purple'
                    },
                    {
                        title: 'Conversion Rate',
                        value: '18.2%',
                        change: '+2.4%',
                        trend: 'up',
                        icon: 'Zap',
                        iconName: 'Zap',
                        color: 'amber'
                    }
                ];
                setMetrics(mockMetrics);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    const iconMap = {
        'Wallet': Wallet,
        'Target': Target,
        'Brain': Brain,
        'Zap': Zap
    };

    const colorMap = {
        'Wallet': 'bg-emerald-500',
        'Target': 'bg-purple-500',
        'Brain': 'bg-emerald-500',
        'Zap': 'bg-orange-500'
    };

    // Robust mapping
    const processedMetrics = Array.isArray(metrics) ? metrics.map(m => {
        const iconKey = m.iconName || m.icon;
        const IconComponent = iconMap[iconKey] || Wallet;
        const bgClass = colorMap[iconKey] || 'bg-blue-500';
        return {
            ...m,
            icon: IconComponent,
            iconBg: bgClass
        };
    }) : [];

    // Log processed metrics to help debug
    console.log('Processed metrics:', processedMetrics);

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
                {loading ? (
                    // Simple Skeleton for metrics
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-32 bg-white rounded-xl animate-pulse shadow-sm border border-slate-100"></div>
                    ))
                ) : (
                    processedMetrics.map((metric, idx) => (
                        <MetricCard key={metric.title || idx} {...metric} />
                    ))
                )}
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