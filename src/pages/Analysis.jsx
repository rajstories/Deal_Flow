import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FileUploadZone from '@/components/analysis/FileUploadZone';
import AgentIntelligence from '@/components/analysis/AgentIntelligence';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    FileText, Users, Globe, ShieldAlert, Loader2, Building2,
    TrendingUp, AlertCircle, Flag, FileSignature, Download,
    CheckCircle2, XCircle, AlertTriangle, Search
} from 'lucide-react';
import {
    analyzePitchDeck, getCompetitorIntelligence,
    detectRedFlags, generateInvestmentMemo
} from '@/services/gemini';
import { toast } from 'sonner';

export default function Analysis() {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [loadingCompetitors, setLoadingCompetitors] = useState(false);
    const [competitors, setCompetitors] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);

    // Red Flag state
    const [redFlags, setRedFlags] = useState(null);
    const [loadingRedFlags, setLoadingRedFlags] = useState(false);

    // Investment Memo state
    const [memo, setMemo] = useState(null);
    const [loadingMemo, setLoadingMemo] = useState(false);

    const handleFileSelect = useCallback(async (base64Data, name) => {
        setFileName(name);
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setCompetitors(null);
        setRedFlags(null);
        setMemo(null);

        try {
            toast.info(`Analyzing ${name} with Gemini AI...`);

            // Call Gemini multimodal analysis
            const result = await analyzePitchDeck(base64Data);
            console.log('Analysis result:', result);

            setAnalysisResult(result);
            toast.success('Analysis complete!');

            // Automatically fetch competitor intelligence
            if (result.companyName && result.sector) {
                setLoadingCompetitors(true);
                try {
                    const competitorData = await getCompetitorIntelligence(result.companyName, result.sector);
                    setCompetitors(competitorData);
                } catch (error) {
                    console.error('Competitor intelligence failed:', error);
                } finally {
                    setLoadingCompetitors(false);
                }
            }

            // Automatically run Red Flag detection
            setLoadingRedFlags(true);
            try {
                const flagData = await detectRedFlags(result);
                setRedFlags(flagData);
                if (flagData?.redFlags?.length > 0) {
                    toast.warning(`${flagData.redFlags.length} red flag(s) detected!`);
                } else {
                    toast.success('No critical red flags detected.');
                }
            } catch (error) {
                console.error('Red flag detection failed:', error);
            } finally {
                setLoadingRedFlags(false);
            }

        } catch (error) {
            console.error('Analysis failed:', error);

            const errorMessage = error.message || '';

            if (errorMessage.includes('API Key is missing') || errorMessage.includes('API key not valid')) {
                toast.error("Gemini API Key Missing or Invalid", {
                    description: "Please set your Gemini API key in Settings or use the provided test key.",
                    action: {
                        label: "Go to Settings",
                        onClick: () => window.location.href = '/settings'
                    },
                    duration: 10000,
                });
            } else if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota')) {
                toast.error("Gemini API Quota Exceeded", {
                    description: "The API key being used has reached its request limit. Please try a different key in Settings.",
                    action: {
                        label: "Change Key",
                        onClick: () => window.location.href = '/settings'
                    },
                    duration: 10000,
                });
            } else {
                toast.error(`Analysis failed: ${errorMessage}`);
            }
        } finally {
            setIsAnalyzing(false);
        }
    }, []);

    // Generate Investment Memo on demand
    const handleGenerateMemo = async () => {
        if (!analysisResult) return;
        setLoadingMemo(true);
        try {
            toast.info('Generating investment memo...');
            const memoText = await generateInvestmentMemo(analysisResult, competitors, redFlags);
            setMemo(memoText);
            toast.success('Investment memo generated!');
        } catch (error) {
            console.error('Memo generation failed:', error);
            toast.error(`Memo generation failed: ${error.message}`);
        } finally {
            setLoadingMemo(false);
        }
    };

    // Download memo as text
    const handleDownloadMemo = () => {
        if (!memo) return;
        const blob = new Blob([memo], { type: 'text/markdown;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `investment-memo-${analysisResult?.companyName?.replace(/\s+/g, '-').toLowerCase() || 'analysis'}-${new Date().toISOString().split('T')[0]}.md`;
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Memo downloaded!');
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
            default: return 'text-slate-600 bg-slate-50 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 pb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Deal Analysis</h1>
                <p className="text-slate-500">AI-powered pitch deck analysis powered by Gemini.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <FileUploadZone
                        onFileSelect={handleFileSelect}
                        isAnalyzing={isAnalyzing}
                        fileName={fileName}
                    />

                    {analysisResult && (
                        <Card className="w-full">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-2xl">Analysis Results</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={
                                            analysisResult.recommendation === 'Strong Buy' ? 'default' :
                                                analysisResult.recommendation === 'Buy' ? 'secondary' :
                                                    analysisResult.recommendation === 'Hold' ? 'outline' : 'destructive'
                                        }>
                                            {analysisResult.recommendation}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Tabs defaultValue="summary" className="w-full">
                                    <div className="px-6 border-b border-slate-200 dark:border-slate-700">
                                        <TabsList>
                                            <TabsTrigger value="summary">Summary</TabsTrigger>
                                            <TabsTrigger value="team">Team</TabsTrigger>
                                            <TabsTrigger value="market">Market</TabsTrigger>
                                            <TabsTrigger value="risks">Risks</TabsTrigger>
                                            <TabsTrigger value="redflags" className="relative">
                                                <Flag className="h-3.5 w-3.5 mr-1" />
                                                Red Flags
                                                {redFlags?.redFlags?.length > 0 && (
                                                    <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                                                        {redFlags.redFlags.length}
                                                    </span>
                                                )}
                                            </TabsTrigger>
                                            <TabsTrigger value="competitors">Competitors</TabsTrigger>
                                            <TabsTrigger value="memo">
                                                <FileSignature className="h-3.5 w-3.5 mr-1" />
                                                Memo
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <div className="p-6">
                                        {/* Summary Tab */}
                                        <TabsContent value="summary" className="mt-0 space-y-6">
                                            {/* Company Header Card */}
                                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-indigo-100 dark:border-slate-700">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                                        <Building2 className="h-8 w-8 text-indigo-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                                            {analysisResult.companyName}
                                                        </h2>
                                                        <div className="flex gap-2 mb-3 flex-wrap">
                                                            <Badge variant="secondary" className="bg-white/80 dark:bg-slate-700">
                                                                {analysisResult.sector}
                                                            </Badge>
                                                            <Badge variant="secondary" className="bg-white/80 dark:bg-slate-700">
                                                                {analysisResult.stage}
                                                            </Badge>
                                                            <Badge variant="secondary" className="bg-white/80 dark:bg-slate-700">
                                                                {analysisResult.askAmount}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <div>
                                                                <div className="text-sm text-slate-600 dark:text-slate-400">Investment Score</div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <span className="text-3xl font-bold text-indigo-600">
                                                                        {analysisResult.investmentScore}
                                                                    </span>
                                                                    <span className="text-slate-500">/100</span>
                                                                </div>
                                                            </div>
                                                            <div className="h-12 w-px bg-slate-300 dark:bg-slate-600"></div>
                                                            <div>
                                                                <div className="text-sm text-slate-600 dark:text-slate-400">Recommendation</div>
                                                                <div className="text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                                                                    {analysisResult.recommendation}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Executive Summary Section */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 w-1 rounded-full bg-indigo-600"></div>
                                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                        Executive Summary
                                                    </h3>
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                                                    {analysisResult.executiveSummary}
                                                </p>
                                            </div>

                                            {/* Key Highlights Section */}
                                            {analysisResult.teamAnalysis?.highlights?.length > 0 && (
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1 w-1 rounded-full bg-emerald-600"></div>
                                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                            Key Highlights
                                                        </h3>
                                                    </div>
                                                    <div className="grid gap-3 pl-3">
                                                        {analysisResult.teamAnalysis.highlights.map((highlight, idx) => (
                                                            <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900">
                                                                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                                    {highlight}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </TabsContent>

                                        {/* Team Tab */}
                                        <TabsContent value="team" className="mt-0">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                    <div className="text-center">
                                                        <div className="text-4xl font-bold text-indigo-600">
                                                            {analysisResult.teamAnalysis?.score || 'N/A'}
                                                        </div>
                                                        <div className="text-xs text-slate-500">Team Score</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold mb-2">Team Assessment</h4>
                                                        <div className="space-y-1">
                                                            {analysisResult.teamAnalysis?.highlights?.slice(0, 2).map((h, i) => (
                                                                <div key={i} className="flex items-start gap-2 text-sm">
                                                                    <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                                                    <span className="text-slate-600 dark:text-slate-400">{h}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {analysisResult.teamAnalysis?.keyPeople?.map((person, idx) => (
                                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                                                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                                            {person.name?.split(' ').map(n => n[0]).join('') || '?'}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">{person.name}</h4>
                                                            <p className="text-sm text-slate-500">{person.role}</p>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{person.background}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {analysisResult.teamAnalysis?.concerns?.length > 0 && (
                                                    <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                                                        <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                                                            <AlertCircle className="h-4 w-4" />
                                                            Concerns
                                                        </h4>
                                                        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                                                            {analysisResult.teamAnalysis.concerns.map((concern, idx) => (
                                                                <li key={idx}>• {concern}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </TabsContent>

                                        {/* Market Tab */}
                                        <TabsContent value="market" className="mt-0">
                                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                                <h3>Market Opportunity</h3>
                                                <div className="grid grid-cols-2 gap-4 not-prose mb-4">
                                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                        <div className="text-xs text-slate-500 mb-1">TAM</div>
                                                        <div className="text-xl font-bold">{analysisResult.marketAnalysis?.tam || 'N/A'}</div>
                                                    </div>
                                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                        <div className="text-xs text-slate-500 mb-1">Growth Rate</div>
                                                        <div className="text-xl font-bold">{analysisResult.marketAnalysis?.growth || 'N/A'}</div>
                                                    </div>
                                                </div>

                                                <h4>Competitive Advantage</h4>
                                                <p>{analysisResult.marketAnalysis?.competitiveAdvantage}</p>

                                                {analysisResult.marketAnalysis?.marketTrends?.length > 0 && (
                                                    <>
                                                        <h4>Market Trends</h4>
                                                        <ul>
                                                            {analysisResult.marketAnalysis.marketTrends.map((trend, idx) => (
                                                                <li key={idx}>{trend}</li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </div>
                                        </TabsContent>

                                        {/* Risks Tab */}
                                        <TabsContent value="risks" className="mt-0 space-y-3">
                                            {analysisResult.riskFactors?.map((risk, idx) => (
                                                <div key={idx} className={`p-4 rounded-lg border ${risk.severity === 'Critical' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' :
                                                    risk.severity === 'High' ? 'border-orange-200 bg-orange-50 dark:bg-orange-950/20' :
                                                        risk.severity === 'Medium' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' :
                                                            'border-slate-200 bg-slate-50 dark:bg-slate-900'
                                                    }`}>
                                                    <div className="flex items-start gap-3">
                                                        <ShieldAlert className={`h-5 w-5 mt-0.5 ${risk.severity === 'Critical' ? 'text-red-600' :
                                                            risk.severity === 'High' ? 'text-orange-600' :
                                                                risk.severity === 'Medium' ? 'text-amber-600' :
                                                                    'text-slate-600'
                                                            }`} />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h4 className="font-semibold">{risk.risk}</h4>
                                                                <Badge variant={
                                                                    risk.severity === 'Critical' ? 'destructive' :
                                                                        risk.severity === 'High' ? 'default' : 'secondary'
                                                                }>{risk.severity}</Badge>
                                                            </div>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                                <strong>Mitigation:</strong> {risk.mitigation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {(!analysisResult.riskFactors || analysisResult.riskFactors.length === 0) && (
                                                <div className="text-center py-8 text-slate-500">
                                                    <ShieldAlert className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p>No significant risks identified</p>
                                                </div>
                                            )}
                                        </TabsContent>

                                        {/* 🚩 RED FLAGS TAB - NEW */}
                                        <TabsContent value="redflags" className="mt-0 space-y-4">
                                            {loadingRedFlags ? (
                                                <div className="flex items-center justify-center py-12">
                                                    <div className="text-center">
                                                        <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-2" />
                                                        <p className="text-sm text-slate-500">Running Red Flag Detection...</p>
                                                        <p className="text-xs text-slate-400 mt-1">Cross-referencing claims against public data</p>
                                                    </div>
                                                </div>
                                            ) : redFlags ? (
                                                <div className="space-y-4">
                                                    {/* Summary Banner */}
                                                    <div className={`p-4 rounded-lg border ${redFlags.redFlags?.length > 0
                                                        ? 'border-red-200 bg-red-50/50'
                                                        : 'border-emerald-200 bg-emerald-50/50'
                                                        }`}>
                                                        <div className="flex items-center gap-3">
                                                            {redFlags.redFlags?.length > 0 ? (
                                                                <AlertTriangle className="h-6 w-6 text-red-600" />
                                                            ) : (
                                                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                                            )}
                                                            <div>
                                                                <h3 className="font-semibold text-slate-900">
                                                                    {redFlags.redFlags?.length > 0
                                                                        ? `${redFlags.redFlags.length} Red Flag${redFlags.redFlags.length > 1 ? 's' : ''} Detected`
                                                                        : 'No Critical Red Flags'
                                                                    }
                                                                </h3>
                                                                <p className="text-xs text-slate-500 mt-0.5">
                                                                    Claims were cross-referenced using Gemini function calling
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Individual Red Flags */}
                                                    {redFlags.redFlags?.map((flag, idx) => (
                                                        <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-white">
                                                            <div className="flex items-start gap-3">
                                                                <div className={`p-1.5 rounded-full ${flag.verification?.verified
                                                                    ? 'bg-emerald-100' : 'bg-red-100'
                                                                    }`}>
                                                                    {flag.verification?.verified ? (
                                                                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                                                    ) : (
                                                                        <XCircle className="h-4 w-4 text-red-600" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <p className="font-medium text-sm text-slate-900">{flag.claim}</p>
                                                                        <Badge variant={flag.verification?.verified ? 'secondary' : 'destructive'} className="text-[10px]">
                                                                            {flag.verification?.verified ? 'Verified' : 'Unverified'}
                                                                        </Badge>
                                                                    </div>
                                                                    <p className="text-xs text-slate-500">
                                                                        Confidence: {flag.verification?.confidence || 0}%
                                                                    </p>
                                                                    {flag.verification?.evidence && (
                                                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                                                            <Search className="h-3 w-3" />
                                                                            {flag.verification.evidence}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* AI Summary */}
                                                    {redFlags.summary && (
                                                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                                            <h4 className="font-semibold text-sm text-slate-900 mb-2">AI Analysis Summary</h4>
                                                            <div className="prose prose-sm max-w-none text-slate-600">
                                                                <div className="whitespace-pre-wrap text-sm">{redFlags.summary}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 text-slate-500">
                                                    <Flag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p>Red flag analysis will run automatically after deck analysis</p>
                                                </div>
                                            )}
                                        </TabsContent>

                                        {/* Competitors Tab */}
                                        <TabsContent value="competitors" className="mt-0">
                                            {loadingCompetitors ? (
                                                <div className="flex items-center justify-center py-12">
                                                    <div className="text-center">
                                                        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
                                                        <p className="text-sm text-slate-500">Researching competitors with Google Search...</p>
                                                    </div>
                                                </div>
                                            ) : competitors ? (
                                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                                    <div className="whitespace-pre-wrap">{competitors}</div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 text-slate-500">
                                                    <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p>No competitor data available</p>
                                                </div>
                                            )}
                                        </TabsContent>

                                        {/* 📝 INVESTMENT MEMO TAB - NEW */}
                                        <TabsContent value="memo" className="mt-0 space-y-4">
                                            {!memo && !loadingMemo && (
                                                <div className="text-center py-12">
                                                    <FileSignature className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                        AI Investment Memo
                                                    </h3>
                                                    <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                                                        Generate a VC-grade, partner-ready investment memo from the analysis results.
                                                        Includes executive summary, thesis, risks, and recommendation.
                                                    </p>
                                                    <Button
                                                        onClick={handleGenerateMemo}
                                                        className="bg-indigo-600 hover:bg-indigo-700"
                                                    >
                                                        <FileSignature className="h-4 w-4 mr-2" />
                                                        Generate Investment Memo
                                                    </Button>
                                                </div>
                                            )}

                                            {loadingMemo && (
                                                <div className="flex items-center justify-center py-12">
                                                    <div className="text-center">
                                                        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
                                                        <p className="text-sm text-slate-500">Generating investment memo...</p>
                                                        <p className="text-xs text-slate-400 mt-1">This may take 15-30 seconds</p>
                                                    </div>
                                                </div>
                                            )}

                                            {memo && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-slate-900">Investment Memo</h3>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={handleDownloadMemo}
                                                            >
                                                                <Download className="h-4 w-4 mr-1" />
                                                                Download
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={handleGenerateMemo}
                                                            >
                                                                Regenerate
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="prose prose-sm max-w-none dark:prose-invert bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                                                        <div className="whitespace-pre-wrap">{memo}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </CardContent>
                        </Card>
                    )}

                    {!analysisResult && !isAnalyzing && (
                        <Card className="flex-1 flex items-center justify-center">
                            <CardContent className="text-center py-12">
                                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                    No Analysis Yet
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    Upload a pitch deck PDF to see AI-powered analysis
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="sticky top-6 space-y-6">
                        <AgentIntelligence analysisResult={analysisResult} isAnalyzing={isAnalyzing} />
                    </div>
                </div>
            </div>

            {/* Chat Interface */}
            {analysisResult && (
                <>
                    <ChatButton
                        onClick={() => setChatOpen(true)}
                        isOpen={chatOpen}
                        hasNewMessage={false}
                    />
                    {chatOpen && (
                        <ChatWindow
                            analysisData={analysisResult}
                            onClose={() => setChatOpen(false)}
                            onMinimize={() => setChatOpen(false)}
                        />
                    )}
                </>
            )}
        </div>
    );
}
