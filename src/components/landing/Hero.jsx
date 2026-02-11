import React from 'react';
import { PlayCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button, Reveal } from './Common';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
            {/* Subtle Background Gradients - Gold/Warm theme */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-50 via-white to-white pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                <Reveal delay={0} direction="down">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 border border-gold-100 text-gold-700 text-sm font-medium mb-8 hover:border-gold-200 transition-colors cursor-pointer">
                        <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse"></span>
                        <span>New: Gemini 3 Integration Live</span>
                        <ChevronRight size={14} className="text-gold-500" />
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy-900 mb-8 leading-tight">
                        Stop Guessing What Succeeds.<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600">Know Before You Invest.</span>
                    </h1>
                </Reveal>

                <Reveal delay={200}>
                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The AI workspace that predicts success, identifies red flags,
                        and turns angel investing from gambling into strategy.
                    </p>
                </Reveal>

                <Reveal delay={300}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Button
                            size="xl"
                            variant="primary"
                            className="w-full sm:w-auto px-12 py-6 text-lg"
                            onClick={() => navigate('/dashboard')}
                        >
                            Analyze Your First Deck <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                        {/* Optional secondary button */}
                        <Button size="xl" variant="outline" className="w-full sm:w-auto px-12 py-6 text-lg">
                            View Demo Report
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-8 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" /> No credit card required
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" /> 14-day free trial
                        </div>
                    </div>
                </Reveal>

                {/* Abstract graphical element at bottom to ground the page */}
                <div className="mt-20 relative h-20 w-full max-w-2xl mx-auto opacity-50">
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-20 bg-gradient-to-t from-gold-200 to-transparent"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent"></div>
                </div>

            </div>
        </div>
    );
};
