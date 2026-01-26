import React from 'react';
import { motion } from 'framer-motion';
import FileUploadZone from '@/components/analysis/FileUploadZone';
import AgentIntelligence from '@/components/analysis/AgentIntelligence';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Users, Globe, ShieldAlert } from 'lucide-react';

export default function Analysis() {
    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Deal Analysis</h1>
                <p className="text-slate-500">AI-powered pitch deck analysis and due diligence.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                <div className="col-span-8 flex flex-col gap-6 h-full overflow-hidden">
                    <FileUploadZone />

                    <Card className="flex-1 flex flex-col min-h-0">
                        <CardHeader className="pb-2">
                            <CardTitle>Analysis Results</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0 p-0">
                            <Tabs defaultValue="summary" className="h-full flex flex-col">
                                <div className="px-6">
                                    <TabsList>
                                        <TabsTrigger value="summary">Summary</TabsTrigger>
                                        <TabsTrigger value="team">Team</TabsTrigger>
                                        <TabsTrigger value="market">Market</TabsTrigger>
                                        <TabsTrigger value="risks">Risks</TabsTrigger>
                                    </TabsList>
                                </div>
                                <ScrollArea className="flex-1 p-6">
                                    <TabsContent value="summary" className="mt-0 space-y-4">
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <h3>Executive Summary</h3>
                                            <p>
                                                SolarX Energy presents a compelling opportunity in the renewable energy sector with their proprietary coating technology.
                                                The solution addresses a critical pain point in solar efficiency (dust accumulation) with a scalable, low-cost application.
                                            </p>
                                            <h3>Deal Highlights</h3>
                                            <ul>
                                                <li><strong>Proprietary Tech:</strong> Patent-pending nano-coating.</li>
                                                <li><strong>Market Size:</strong> $50B TAM by 2030.</li>
                                                <li><strong>Traction:</strong> 3 pilot programs with major utility providers.</li>
                                            </ul>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="team" className="mt-0">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">JD</div>
                                                <div>
                                                    <h4 className="font-semibold">John Doe (CEO)</h4>
                                                    <p className="text-sm text-slate-500">Ex-Tesla Engineer, 2nd time founder.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">JS</div>
                                                <div>
                                                    <h4 className="font-semibold">Jane Smith (CTO)</h4>
                                                    <p className="text-sm text-slate-500">PhD in Material Science from MIT.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    {/* Add other tabs content as needed */}
                                </ScrollArea>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-4 h-full overflow-hidden">
                    <AgentIntelligence />
                </div>
            </div>
        </div>
    );
}
