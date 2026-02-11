import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './Common';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Solutions', href: '#solution' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Documentation', href: '#' },
        { name: 'Resources', href: '#' },
    ];

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/30">
                        <Shield className="text-navy-900 w-5 h-5" fill="currentColor" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-navy-900">
                        DealFlow <span className="text-gold-600">AI</span>
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA & Login */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={handleGetStarted} className="text-sm font-medium text-navy-900 hover:text-gold-600">Login</button>
                    <Button variant="primary" size="sm" onClick={handleGetStarted}>Get Started Free</Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-navy-900"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 md:hidden flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-slate-600 hover:text-navy-900 py-2 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    <button onClick={handleGetStarted} className="text-navy-900 py-2 font-medium text-left">Login</button>
                    <Button variant="primary" className="w-full" onClick={handleGetStarted}>Get Started Free</Button>
                </div>
            )}
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-navy-950 pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded bg-gold-500 flex items-center justify-center">
                                <Shield className="text-navy-900 w-4 h-4" fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                DealFlow <span className="text-gold-500">AI</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Institutional-grade due diligence for modern investors. Stop guessing, start investing with certainty.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-gold-500">Features</a></li>
                            <li><a href="#" className="hover:text-gold-500">Pricing</a></li>
                            <li><a href="#" className="hover:text-gold-500">Demo</a></li>
                            <li><a href="#" className="hover:text-gold-500">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-gold-500">Documentation</a></li>
                            <li><a href="#" className="hover:text-gold-500">API Docs</a></li>
                            <li><a href="#" className="hover:text-gold-500">Blog</a></li>
                            <li><a href="#" className="hover:text-gold-500">Case Studies</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-gold-500">About Us</a></li>
                            <li><a href="#" className="hover:text-gold-500">Careers</a></li>
                            <li><a href="#" className="hover:text-gold-500">Contact</a></li>
                            <li><a href="#" className="hover:text-gold-500">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2026 DealFlow AI. All rights reserved.</p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span>Built with Gemini 3</span>
                        <span className="text-gold-500">🚀</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
