import React from 'react';
import {
    Clock, XCircle, Search, EyeOff, FileQuestion,
    Target, ShieldAlert, Users, FileText, MessageSquare,
    Upload, Cpu, BarChart3, AlertTriangle, AlertOctagon, CheckCircle
} from 'lucide-react';
import { Reveal, SectionWrapper } from './Common';

// --- Problem Section ---
export const ProblemSection = () => {
    return (
        <SectionWrapper id="problem" className="bg-slate-50 py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <Reveal direction="right">
                        <div>
                            <span className="text-gold-600 font-bold tracking-widest text-xs uppercase mb-4 block">The Problem</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                                Due Diligence Shouldn't Take <span className="text-slate-400 line-through decoration-slate-400/50">1,000 Hours</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Angel investors see 50+ pitch decks monthly. Each requires 20 hours of analysis. The math is impossible.
                                <br /><br />
                                The result? <span className="text-navy-900 font-bold">$150B wasted</span> on bad investments. 75% fail. Many were preventable.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Clock, text: "Rushing analysis or skipping deals entirely" },
                                    { icon: EyeOff, text: "Missing critical red flags hidden in data" },
                                    { icon: FileQuestion, text: "Unable to verify founder claims quickly" },
                                    { icon: Search, text: "No time for deep competitive research" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-slate-600 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                            <XCircle size={18} className="text-red-500" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="left" delay={200}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gold-200/50 to-transparent rounded-2xl blur-3xl"></div>
                            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
                                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                                    <h3 className="text-navy-900 font-semibold flex items-center gap-2">
                                        <BarChart3 size={18} className="text-slate-400" /> Monthly Deal Flow
                                    </h3>
                                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold font-mono">OVERLOADED</span>
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between text-sm text-slate-500 mb-2 font-medium">
                                            <span>Decks Received</span>
                                            <span className="text-navy-900">52</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                            <div className="w-full h-full bg-slate-400 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm text-slate-500 mb-2 font-medium">
                                            <span>Hours Available</span>
                                            <span className="text-navy-900">10</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                            <div className="w-[10%] h-full bg-red-500 rounded-full relative">
                                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm text-slate-500 mb-2 font-medium">
                                            <span>Decks Analyzed Properly</span>
                                            <span className="text-navy-900">2</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                            <div className="w-[4%] h-full bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-red-500">
                                        <ShieldAlert size={20} />
                                    </div>
                                    <div>
                                        <div className="text-red-900 font-bold text-sm">Opportunity Cost</div>
                                        <div className="text-red-700 text-sm mt-1">96% of deals are ignored or skimmed due to lack of time.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </SectionWrapper>
    );
};

// --- Solution Section ---
export const SolutionSection = () => {
    const features = [
        {
            icon: Target,
            color: "text-gold-600",
            bg: "bg-gold-50",
            title: "6-Category Scoring",
            desc: "Market, Team, Product, Traction, Business Model, Financials. Investment score 0-100."
        },
        {
            icon: ShieldAlert,
            color: "text-red-600",
            bg: "bg-red-50",
            title: "Red Flag Detector",
            desc: "Automatic cross-referencing against live data sources.",
            highlight: true
        },
        {
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            title: "Competitor Intel",
            desc: "Identifies 5-7 competitors, pulls funding data, maps positioning automatically."
        },
        {
            icon: FileText,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            title: "VC-Grade Reports",
            desc: "Generates 2000-word investment memos with executive summary, thesis, and risks."
        },
        {
            icon: MessageSquare,
            color: "text-purple-600",
            bg: "bg-purple-50",
            title: "Smart Chat",
            desc: "Ask anything. 'Why is burn rate concerning?' Cites specific data points."
        }
    ];

    return (
        <SectionWrapper id="solution" className="bg-white py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <Reveal>
                        <span className="text-gold-600 font-bold tracking-widest text-xs uppercase mb-4 block">The Solution</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">Institutional-Grade Analysis</h2>
                        <p className="text-xl text-slate-500">Not just faster. Smarter. The only AI engine trained on 10,000+ successful outcomes.</p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <Reveal key={i} delay={i * 100} className={f.highlight ? "md:col-span-2 lg:col-span-2" : ""}>
                            <div className={`h-full p-8 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg
                        ${f.highlight
                                    ? "bg-white border-slate-200 shadow-xl relative overflow-hidden ring-1 ring-gold-100"
                                    : "bg-white border-slate-200"
                                }`}
                            >
                                {f.highlight ? (
                                    <div className="flex flex-col md:flex-row gap-8 items-start h-full">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center`}>
                                                    <f.icon className={`w-6 h-6 ${f.color}`} />
                                                </div>
                                                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase">Critical Feature</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-navy-900 mb-3">{f.title}</h3>
                                            <p className="text-slate-600 leading-relaxed text-lg mb-6">{f.desc} Catches fraud humans miss by verifying LinkedIn, Crunchbase, and public records in real-time.</p>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> Detects resume embellishment</li>
                                                <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" /> Verifies market sizing math</li>
                                            </ul>
                                        </div>

                                        {/* Mock UI for Red Flag Card */}
                                        <div className="flex-1 w-full bg-slate-50 rounded-xl border border-slate-200 p-4 font-mono text-xs shadow-inner">
                                            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
                                                <span className="text-slate-500">Scan Results: <span className="text-navy-900 font-bold">AcmeCorp_Deck.pdf</span></span>
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                                    <span className="text-red-600 font-bold">2 RISKS FOUND</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="bg-white p-3 rounded border-l-4 border-red-500 shadow-sm">
                                                    <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
                                                        <AlertTriangle size={12} />
                                                        <span>Team Verification Failed</span>
                                                    </div>
                                                    <p className="text-slate-600">CEO claims "Ex-Google Lead" (2018-2020). LinkedIn shows "Freelance Consultant" for this period.</p>
                                                </div>
                                                <div className="bg-white p-3 rounded border-l-4 border-orange-400 shadow-sm">
                                                    <div className="flex items-center gap-2 text-orange-600 font-bold mb-1">
                                                        <AlertOctagon size={12} />
                                                        <span>Financial Discrepancy</span>
                                                    </div>
                                                    <p className="text-slate-600">Slide 12: Projected ARR ($5M) does not align with historical growth rate (15% YoY).</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <f.icon className={`w-6 h-6 ${f.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-navy-900 mb-3">{f.title}</h3>
                                        <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                                    </>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

// --- How It Works Section ---
export const HowItWorksSection = () => {
    return (
        <SectionWrapper id="how-it-works" className="bg-slate-50 py-32 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">From Upload to Decision in 3 Steps</h2>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {[
                            { step: "1", icon: Upload, title: "Upload Deck", desc: "Drag & drop PDF. Up to 100 pages." },
                            { step: "2", icon: Cpu, title: "Gemini 3 Analyzes", desc: "Multimodal processing & web verification." },
                            { step: "3", icon: BarChart3, title: "Get Report", desc: "Score, red flags, & investment memo." }
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 200}>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-8 relative z-10">
                                        <div className="w-20 h-20 rounded-full bg-gold-50 flex items-center justify-center">
                                            <item.icon className="text-gold-600 w-8 h-8" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 font-bold font-mono border-4 border-white">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
