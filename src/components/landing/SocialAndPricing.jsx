import React, { useState } from 'react';
import { Check, Star, Plus, Minus, ArrowRight, Play, ShieldCheck } from 'lucide-react';
import { SectionWrapper, Reveal, Button, CountUp } from './Common';
import { useNavigate } from 'react-router-dom';

export const SocialProof = () => {
    return (
        <SectionWrapper className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-400 text-sm font-bold tracking-widest mb-10 uppercase">Trusted by investors from</p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale mb-16 items-center">
                    {/* Text Placeholders for Logos */}
                    <span className="text-2xl font-bold font-serif text-navy-900">SEQUOIA</span>
                    <span className="text-2xl font-bold font-sans text-navy-900 tracking-tighter">a16z</span>
                    <span className="text-2xl font-bold font-mono text-navy-900">Y Combinator</span>
                    <span className="text-2xl font-bold font-serif text-navy-900 italic">Benchmark</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="p-6">
                        <div className="text-4xl md:text-5xl font-mono font-bold text-gold-500 mb-2">
                            <CountUp end={240} suffix="x" />
                        </div>
                        <div className="text-slate-600 font-medium">Faster Due Diligence</div>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl md:text-5xl font-mono font-bold text-gold-500 mb-2">
                            <CountUp end={94} suffix="%" />
                        </div>
                        <div className="text-slate-600 font-medium">Accuracy Rate</div>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl md:text-5xl font-mono font-bold text-gold-500 mb-2">
                            $<CountUp end={7} suffix=".5M" prefix="" />
                        </div>
                        <div className="text-slate-600 font-medium">Value Created Per Investor</div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export const Testimonials = () => {
    return (
        <SectionWrapper className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-navy-900 mb-16">Tested by Real Investors</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "This would legitimately save me 40 hours per week. The red flag detection found a discrepancy I completely missed in a SaaS deck.",
                            author: "Sarah Chen",
                            role: "Angel Investor",
                            portfolio: "15+ Portfolio Companies"
                        },
                        {
                            quote: "I was skeptical about AI for due diligence, but the 'Smart Chat' feature lets me drill down into financials like I'm talking to a CFO.",
                            author: "Marcus Thorne",
                            role: "Partner, Apex Ventures",
                            portfolio: "$50M AUM"
                        },
                        {
                            quote: "The automated investment memos are 90% ready for our partnership meetings. It's a massive productivity unlock for our associates.",
                            author: "Elena Rodriguez",
                            role: "Principal",
                            portfolio: "Techstars Mentor"
                        }
                    ].map((t, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="bg-white border border-slate-200 p-8 rounded-2xl h-full flex flex-col relative shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute -top-3 left-8 text-6xl text-gold-200 font-serif">"</div>
                                <div className="flex gap-1 mb-6 text-gold-400">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-lg text-slate-700 italic mb-8 flex-1 relative z-10">{t.quote}</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                    <div>
                                        <div className="text-navy-900 font-bold">{t.author}</div>
                                        <div className="text-sm text-slate-500">{t.role}</div>
                                        <div className="text-xs text-gold-600 font-medium mt-1">{t.portfolio}</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

export const DemoCTA = () => {
    return (
        <SectionWrapper className="py-32 relative overflow-hidden bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                <Reveal>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">See It In Action</h2>
                    <p className="text-xl text-slate-500 mb-12">Watch a real pitch deck get analyzed in under 3 minutes</p>

                    <div className="relative aspect-video bg-navy-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 mb-12 group cursor-pointer max-w-4xl mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/50">
                                    <Play size={24} className="text-navy-900 ml-1" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                        {/* Placeholder for video thumb */}
                        <div className="w-full h-full bg-navy-900 opacity-90"></div>
                        <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded text-white text-sm font-mono">02:14</div>
                    </div>

                    <Button variant="navy" size="xl" className="shadow-xl">
                        Try Your Own Deck <ArrowRight className="ml-2" />
                    </Button>
                </Reveal>
            </div>
        </SectionWrapper>
    )
}

export const Pricing = () => {
    const navigate = useNavigate();

    return (
        <SectionWrapper id="pricing" className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-navy-900 mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-slate-500 text-lg">All plans include Gemini 3 powered analysis</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free */}
                    <Reveal delay={0}>
                        <div className="p-8 rounded-2xl border border-slate-200 bg-white h-full flex flex-col shadow-sm">
                            <div className="text-sm font-bold text-slate-500 tracking-wider mb-2">STARTER</div>
                            <div className="mb-6"><span className="text-4xl font-bold text-navy-900">$0</span><span className="text-slate-400">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {['3 analyses/month', 'Basic scoring', 'Email support'].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <Check size={18} className="text-slate-400" /> {feat}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>Get Started</Button>
                        </div>
                    </Reveal>

                    {/* Pro */}
                    <Reveal delay={100} className="md:-mt-8">
                        <div className="relative p-8 rounded-2xl border-2 border-gold-500 bg-white h-full flex flex-col shadow-2xl scale-105 z-10">
                            <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                                <span className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
                            </div>
                            <div className="text-sm font-bold text-gold-600 tracking-wider mb-2">PRO INVESTOR</div>
                            <div className="mb-6"><span className="text-4xl font-bold text-navy-900">$299</span><span className="text-slate-400">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {['Unlimited analyses', 'Red flag detection', 'Competitor intel', 'AI Memo Writer', 'Priority Support'].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-navy-900 font-medium">
                                        <Check size={18} className="text-gold-500" /> {feat}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="primary" className="w-full" onClick={() => navigate('/dashboard')}>Start Free Trial</Button>
                        </div>
                    </Reveal>

                    {/* Team */}
                    <Reveal delay={200}>
                        <div className="p-8 rounded-2xl border border-slate-200 bg-white h-full flex flex-col shadow-sm">
                            <div className="text-sm font-bold text-slate-500 tracking-wider mb-2">FOR FIRMS</div>
                            <div className="mb-6"><span className="text-4xl font-bold text-navy-900">$999</span><span className="text-slate-400">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {['Everything in Pro', 'Collaborative Deal Rooms', 'Portfolio tracking', 'White-label reports', 'Dedicated Success Mgr'].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <Check size={18} className="text-slate-400" /> {feat}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" className="w-full">Contact Sales</Button>
                        </div>
                    </Reveal>
                </div>
            </div>
        </SectionWrapper>
    )
}

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { q: "How accurate is the red flag detection?", a: "87% detection rate in testing across 50+ real decks, including verified fraud cases. We cross-reference claims against live data sources." },
        { q: "What file formats are supported?", a: "Currently PDF only. We support documents up to 100+ pages containing text, images, charts, and financial tables." },
        { q: "How long does analysis take?", a: "4-5 minutes average. Extremely complex decks (100+ pages) may take up to 8 minutes." },
        { q: "Is my data secure?", a: "Yes. We use Enterprise-grade encryption (AES-256). We never share your data or use it to train our public models without explicit consent." }
    ];

    return (
        <SectionWrapper id="faq" className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                            <button
                                className="w-full flex items-center justify-between p-6 text-left"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <span className="font-medium text-navy-900 text-lg">{item.q}</span>
                                {openIndex === i ? <Minus className="text-gold-500" /> : <Plus className="text-slate-400" />}
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

export const FinalCTA = () => {
    const navigate = useNavigate();

    return (
        <SectionWrapper className="py-32 bg-navy-950 text-center relative overflow-hidden">
            {/* Abstract background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />

            <Reveal>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Transform Your Deal Flow?</h2>
                    <p className="text-2xl text-slate-400 mb-10">Join 2,500+ investors making smarter decisions with AI</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="primary" size="xl" className="w-full sm:w-auto shadow-glow" onClick={() => navigate('/dashboard')}>
                            Start Analyzing Now
                        </Button>
                        <Button variant="outline" size="xl" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:text-white hover:border-white">
                            Book a Demo
                        </Button>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-6 text-slate-500 text-sm">
                        <span className="flex items-center gap-2"><ShieldCheck size={16} /> SOC 2 Compliant</span>
                        <span className="flex items-center gap-2"><Check size={16} /> Cancel anytime</span>
                    </div>
                </div>
            </Reveal>
        </SectionWrapper>
    )
}
