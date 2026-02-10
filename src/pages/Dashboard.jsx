import React, { useEffect, useState } from 'react';
import { Wallet, Target, Brain, Zap } from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed';
import LatestAnalysis from '@/components/dashboard/LatestAnalysis';
import { getDashboardMetrics } from '@/services/api';
import { toast } from 'sonner';

export default function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await getDashboardMetrics();
                setMetrics(data);
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
                        color: 'emerald'
                    },
                    {
                        title: 'AI Analyses',
                        value: '47',
                        change: '+8 today',
                        trend: 'up',
                        icon: 'Brain',
                        color: 'purple'
                    },
                    {
                        title: 'Conversion Rate',
                        value: '18.2%',
                        change: '+2.4%',
                        trend: 'up',
                        icon: 'Zap',
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

    // Default metrics structure for skeleton or initial render if you want
    // But since we are replacing hardcoded, we should rely on API

    // Mapping icons string to components if backend sends string names
    // Or just re-construct the array with data values

    // Simulating mapping if backend returns { portfolioValue: '$95.2M', ... }
    // For now, let's assume the backend aligns with this structure or we just use the data directly.
    // However, icons are React components, so we MUST map them here.

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

    // If data is just raw values, we can merge with static config
    // Let's assume backend returns array: [{ title: 'Portfolio Value', value: '...', change: '...', changeType: '...', iconName: 'Wallet' }]

    const processedMetrics = metrics.map(m => ({
        ...m,
        icon: iconMap[m.iconName] || Wallet, // Fallback
        iconBg: colorMap[m.iconName] || 'bg-blue-500'
    }));

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
                    processedMetrics.map((metric) => (
                        <MetricCard key={metric.title} {...metric} />
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