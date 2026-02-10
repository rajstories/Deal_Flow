import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function AgentIntelligence({ analysisResult, isAnalyzing }) {
    if (isAnalyzing) {
        return (
            <Card className="h-full border-l-4 border-l-indigo-500 flex items-center justify-center">
                <CardContent className="text-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Gemini AI Analyzing...
                    </h3>
                    <p className="text-sm text-slate-500">
                        Using multimodal analysis with thinking mode
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (!analysisResult) {
        return (
            <Card className="h-full border-l-4 border-l-slate-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-xl">🤖</span> Agent Intelligence
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <p className="text-sm text-slate-500">
                        Upload a pitch deck to see AI insights
                    </p>
                </CardContent>
            </Card>
        );
    }

    // Calculate confidence based on investment score
    const confidence = analysisResult.investmentScore || 0;

    // Extract key findings from analysis
    const positiveFindings = analysisResult.teamAnalysis?.highlights?.slice(0, 2) || [];
    const riskFindings = analysisResult.riskFactors
        ?.filter(r => r.severity === 'High' || r.severity === 'Critical')
        ?.slice(0, 2) || [];

    return (
        <Card className="h-full border-l-4 border-l-indigo-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    Agent Intelligence
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Analysis Confidence</span>
                        <span className="text-indigo-600 font-bold">{confidence}%</span>
                    </div>
                    <Progress value={confidence} className="h-2" />
                    <p className="text-xs text-slate-500">
                        Based on Gemini multimodal analysis
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-slate-900">Key Findings</h4>

                    {positiveFindings.length > 0 && (
                        <div className="space-y-3">
                            {positiveFindings.map((finding, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">{finding.split(':')[0]}</p>
                                        <p className="text-xs text-slate-500">
                                            {finding.split(':').slice(1).join(':') || finding}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {riskFindings.length > 0 && (
                        <div className="space-y-3 pt-3 border-t border-slate-100">
                            {riskFindings.map((risk, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${risk.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'
                                        }`} />
                                    <div>
                                        <p className="text-sm font-medium">{risk.risk}</p>
                                        <p className="text-xs text-slate-500">{risk.severity} risk</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {positiveFindings.length === 0 && riskFindings.length === 0 && (
                        <p className="text-sm text-slate-500">
                            No critical findings to highlight
                        </p>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500 space-y-1">
                        <p>• Multimodal PDF analysis</p>
                        <p>• Structured output parsing</p>
                        <p>• Thinking mode enabled</p>
                        {analysisResult.companyName && <p>• Competitor research active</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

