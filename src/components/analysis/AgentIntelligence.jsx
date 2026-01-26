import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function AgentIntelligence() {
    return (
        <Card className="h-full border-l-4 border-l-indigo-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🤖</span> Agent Intelligence
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Analysis Confidence</span>
                        <span className="text-indigo-600 font-bold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-slate-900">Key Findings</h4>

                    <div className="flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Strong Team Background</p>
                            <p className="text-xs text-slate-500">Founders have 2 prior exits.</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Market Validation</p>
                            <p className="text-xs text-slate-500">Growing market, 15% CAGR.</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Competition Risk</p>
                            <p className="text-xs text-slate-500">High competition in US market.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
