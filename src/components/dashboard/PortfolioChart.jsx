import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { cn } from '@/lib/utils';

const chartData = {
    '1W': [
        { name: 'Mon', value: 92500 },
        { name: 'Tue', value: 93200 },
        { name: 'Wed', value: 94100 },
        { name: 'Thu', value: 93800 },
        { name: 'Fri', value: 95200 },
        { name: 'Sat', value: 95800 },
        { name: 'Sun', value: 96100 },
    ],
    '1M': [
        { name: 'Week 1', value: 88000 },
        { name: 'Week 2', value: 91000 },
        { name: 'Week 3', value: 93500 },
        { name: 'Week 4', value: 95200 },
    ],
    '3M': [
        { name: 'Oct', value: 82000 },
        { name: 'Nov', value: 88000 },
        { name: 'Dec', value: 95200 },
    ],
    '1Y': [
        { name: 'Jan', value: 65000 },
        { name: 'Feb', value: 68000 },
        { name: 'Mar', value: 72000 },
        { name: 'Apr', value: 70000 },
        { name: 'May', value: 76000 },
        { name: 'Jun', value: 82000 },
        { name: 'Jul', value: 78000 },
        { name: 'Aug', value: 85000 },
        { name: 'Sep', value: 88000 },
        { name: 'Oct', value: 92000 },
        { name: 'Nov', value: 90000 },
        { name: 'Dec', value: 95200 },
    ],
    'ALL': [
        { name: '2021', value: 12000 },
        { name: '2022', value: 45000 },
        { name: '2023', value: 78000 },
        { name: '2024', value: 95200 },
    ]
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg">
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-lg font-bold text-slate-900">
                    ${(payload[0].value / 1000).toFixed(1)}k
                </p>
            </div>
        );
    }
    return null;
};

export default function PortfolioChart() {
    const [timeRange, setTimeRange] = useState('1Y');
    const data = chartData[timeRange];

    return (
        <SpotlightCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Portfolio Growth</h3>
                    <p className="text-sm text-slate-500">Asset value over time</p>
                </div>

                {/* Time Period Filters */}
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    {['1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={cn(
                                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                                timeRange === range
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4338ca" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value / 1000}k`}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4338ca"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </SpotlightCard>
    );
}