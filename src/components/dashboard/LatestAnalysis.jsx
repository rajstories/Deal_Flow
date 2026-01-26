import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { TrendingUp, Building2, ExternalLink } from 'lucide-react';

export default function LatestAnalysis() {
    const score = 87;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <SpotlightCard className="p-6 h-full">
            {/* Header with External Link */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-slate-900">Latest Analysis</h3>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
            </div>

            <div className="flex items-start gap-5">
                {/* Circular Score Indicator - Thicker stroke */}
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="10"
                        />
                        {/* Progress circle with gradient */}
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                        </defs>
                        <motion.circle
                            cx="48"
                            cy="48"
                            r="40"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            className="text-2xl font-bold text-slate-900"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            {score}
                        </motion.span>
                        <span className="text-[11px] text-slate-400 font-medium">/ 100</span>
                    </div>
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                    {/* Company Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 text-[15px]">TechVenture AI</h4>
                            <p className="text-xs text-slate-500">AI/ML • Series A</p>
                        </div>
                    </div>

                    {/* Recommendation Badge - Below company name */}
                    <motion.div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                    >
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Strong Buy</span>
                    </motion.div>
                </div>
            </div>

            {/* Data Grid - Bottom section with light gray background */}
            <div className="grid grid-cols-2 gap-3 mt-5">
                <motion.div
                    className="p-3 bg-slate-50 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.3 }}
                >
                    <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">Ask</p>
                    <p className="text-lg font-semibold text-slate-900">$4.5M</p>
                </motion.div>
                <motion.div
                    className="p-3 bg-slate-50 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                >
                    <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">Market</p>
                    <p className="text-lg font-semibold text-slate-900">$12B</p>
                </motion.div>
            </div>
        </SpotlightCard>
    );
}