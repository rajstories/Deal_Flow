import React from 'react';
import { Navbar, Footer } from '../components/landing/LandingLayout';
import { Hero } from '../components/landing/Hero';
import { ProblemSection, SolutionSection, HowItWorksSection } from '../components/landing/ContentSections';
import { SocialProof, Testimonials, DemoCTA, Pricing, FAQ, FinalCTA } from '../components/landing/SocialAndPricing';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-navy-900 font-sans selection:bg-gold-500 selection:text-navy-900">
            <Navbar />

            <main>
                <Hero />
                <SocialProof />
                <ProblemSection />
                <SolutionSection />
                <HowItWorksSection />
                <Testimonials />
                <DemoCTA />
                <Pricing />
                <FAQ />
                <FinalCTA />
            </main>

            <Footer />
        </div>
    );
}
