import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { cn } from '@/lib/utils';

// Data
const irrData = [
    { year: '2019', value: 12 },
    { year: '2020', value: 18 },
    { year: '2021', value: 15 },
    { year: '2022', value: 25 },
    { year: '2023', value: 32 },
    { year: '2024', value: 45 },
];

const sectorData = [
    { name: 'AI/ML', value: 35 },
    { name: 'FinTech', value: 25 },
    { name: 'CleanTech', value: 20 },
    { name: 'Health', value: 15 },
    { name: 'Other', value: 5 },
];

const dealFlowData = [
    { month: 'Jan', reviewed: 120, invested: 4 },
    { month: 'Feb', reviewed: 145, invested: 6 },
    { month: 'Mar', reviewed: 132, invested: 5 },
    { month: 'Apr', reviewed: 160, invested: 8 },
    { month: 'May', reviewed: 185, invested: 7 },
    { month: 'Jun', reviewed: 210, invested: 10 },
];

const SECTOR_COLORS = ['#6366f1', '#818cf8', '#2dd4bf', '#fbbf24', '#94a3b8'];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg">
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs text-slate-500">
                        {entry.name}: <span className="font-medium text-slate-900">{entry.value}%</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Analytics() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analytics Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Fund performance and deal flow metrics.</p>
            </div>

            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[400px]">
                {/* IRR Performance - 60% */}
                <Card className="lg:col-span-3 hover:shadow-[0_4px_20px_-2px_rgba(99,102,241,0.15)] hover:border-indigo-100 transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-900">IRR Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={irrData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="url(#colorGradient)"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
                                />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#4ade80" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Sector Allocation - 40% */}
                <Card className="lg:col-span-2 hover:shadow-[0_4px_20px_-2px_rgba(99,102,241,0.15)] hover:border-indigo-100 transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-900">Sector Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sectorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="80%"
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value, entry) => (
                                        <span className="text-sm text-slate-600 ml-2">{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row - Deal Flow */}
            <Card className="hover:shadow-[0_4px_20px_-2px_rgba(99,102,241,0.15)] hover:border-indigo-100 transition-all duration-300 cursor-pointer group">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Deal Flow (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dealFlowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(99,102,241,0.05)' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="reviewed" name="Reviewed" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={30} />
                            <Bar dataKey="invested" name="Invested" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}