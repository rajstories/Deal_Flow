import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FileUploadZone from '@/components/analysis/FileUploadZone';
import AgentIntelligence from '@/components/analysis/AgentIntelligence';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Users, Globe, ShieldAlert, Loader2, Building2, TrendingUp, AlertCircle } from 'lucide-react';
import { analyzePitchDeck, getCompetitorIntelligence } from '@/services/gemini';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function Analysis() {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [loadingCompetitors, setLoadingCompetitors] = useState(false);
    const [competitors, setCompetitors] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);

    const handleFileSelect = useCallback(async (base64Data, name) => {
        setFileName(name);
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setCompetitors(null);

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
                    // Don't show error toast, just fail silently
                } finally {
                    setLoadingCompetitors(false);
                }
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            toast.error(`Analysis failed: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    }, []);

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Deal Analysis</h1>
                <p className="text-slate-500">AI-powered pitch deck analysis powered by Gemini.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                <div className="col-span-8 flex flex-col gap-6 h-full overflow-hidden">
                    <FileUploadZone
                        onFileSelect={handleFileSelect}
                        isAnalyzing={isAnalyzing}
                        fileName={fileName}
                    />

                    {analysisResult && (
                        <Card className="flex-1 flex flex-col min-h-0">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle>Analysis Results</CardTitle>
                                    <Badge variant={
                                        analysisResult.recommendation === 'Strong Buy' ? 'default' :
                                            analysisResult.recommendation === 'Buy' ? 'secondary' :
                                                analysisResult.recommendation === 'Hold' ? 'outline' : 'destructive'
                                    }>
                                        {analysisResult.recommendation}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-0 p-0">
                                <Tabs defaultValue="summary" className="h-full flex flex-col">
                                    <div className="px-6">
                                        <TabsList>
                                            <TabsTrigger value="summary">Summary</TabsTrigger>
                                            <TabsTrigger value="team">Team</TabsTrigger>
                                            <TabsTrigger value="market">Market</TabsTrigger>
                                            <TabsTrigger value="risks">Risks</TabsTrigger>
                                            <TabsTrigger value="competitors">Competitors</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <ScrollArea className="flex-1 p-6">
                                        {/* Summary Tab */}
                                        <TabsContent value="summary" className="mt-0 space-y-4">
                                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
                                                    <Building2 className="h-8 w-8 text-indigo-600 mt-1" />
                                                    <div className="flex-1">
                                                        <h2 className="text-xl font-bold mt-0 mb-1">{analysisResult.companyName}</h2>
                                                        <div className="flex gap-2 mb-2">
                                                            <Badge variant="outline">{analysisResult.sector}</Badge>
                                                            <Badge variant="outline">{analysisResult.stage}</Badge>
                                                            <Badge variant="outline">{analysisResult.askAmount}</Badge>
                                                        </div>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                                                            Investment Score: <span className="font-bold text-indigo-600">{analysisResult.investmentScore}/100</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <h3>Executive Summary</h3>
                                                <p>{analysisResult.executiveSummary}</p>

                                                <h3>Key Highlights</h3>
                                                <ul>
                                                    {analysisResult.teamAnalysis?.highlights?.map((highlight, idx) => (
                                                        <li key={idx}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            </div>
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
                                    </ScrollArea>
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

                <div className="col-span-4 h-full overflow-hidden">
                    <AgentIntelligence analysisResult={analysisResult} isAnalyzing={isAnalyzing} />
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

