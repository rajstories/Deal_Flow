import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, FileText, Building2, User, TrendingUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearch({ open, onOpenChange, searchQuery, setSearchQuery }) {
    const [results, setResults] = useState({ deals: [], companies: [], contacts: [] });
    const navigate = useNavigate();

    // Mock data - in production, this would come from your API/database
    const mockDeals = [
        { id: 1, name: 'TechFlow AI Series A', company: 'TechFlow AI', stage: 'Series A', amount: '$5M' },
        { id: 2, name: 'NeuralMind Seed Round', company: 'NeuralMind', stage: 'Seed', amount: '$2M' },
        { id: 3, name: 'CloudScale Series B', company: 'CloudScale', stage: 'Series B', amount: '$15M' },
    ];

    const mockCompanies = [
        { id: 1, name: 'TechFlow AI', industry: 'AI/ML', stage: 'Series A' },
        { id: 2, name: 'NeuralMind', industry: 'Healthcare Tech', stage: 'Seed' },
        { id: 3, name: 'CloudScale', industry: 'Cloud Infrastructure', stage: 'Series B' },
        { id: 4, name: 'Sequoia Capital', industry: 'Venture Capital', stage: 'Investor' },
    ];

    const mockContacts = [
        { id: 1, name: 'Sarah Chen', role: 'Partner', company: 'Sequoia Capital' },
        { id: 2, name: 'Marcus Johnson', role: 'CEO', company: 'TechFlow AI' },
        { id: 3, name: 'David Park', role: 'Founder', company: 'NeuralMind' },
    ];

    useEffect(() => {
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();

            const filteredDeals = mockDeals.filter(deal =>
                deal.name.toLowerCase().includes(query) ||
                deal.company.toLowerCase().includes(query)
            );

            const filteredCompanies = mockCompanies.filter(company =>
                company.name.toLowerCase().includes(query) ||
                company.industry.toLowerCase().includes(query)
            );

            const filteredContacts = mockContacts.filter(contact =>
                contact.name.toLowerCase().includes(query) ||
                contact.company.toLowerCase().includes(query) ||
                contact.role.toLowerCase().includes(query)
            );

            setResults({
                deals: filteredDeals,
                companies: filteredCompanies,
                contacts: filteredContacts
            });
        } else {
            setResults({ deals: [], companies: [], contacts: [] });
        }
    }, [searchQuery]);

    const handleResultClick = (type, item) => {
        onOpenChange(false);
        setSearchQuery('');

        // Navigate based on type
        if (type === 'deal') {
            navigate('/analysis');
        } else if (type === 'company') {
            navigate('/portfolio');
        } else if (type === 'contact') {
            navigate('/relationships');
        }
    };

    const totalResults = results.deals.length + results.companies.length + results.contacts.length;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] p-0 gap-0 max-h-[600px] overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-5 border-b border-slate-200 bg-white sticky top-0 z-10">
                    <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search deals, companies, contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        className="flex-1 text-base outline-none placeholder:text-slate-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                        >
                            <X className="h-4 w-4 text-slate-400" />
                        </button>
                    )}
                </div>

                {/* Results */}
                <div className="overflow-y-auto" style={{ maxHeight: '480px' }}>
                    {!searchQuery ? (
                        <div className="p-12 text-center text-slate-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <Search className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600 mb-1">Search DealFlow AI</p>
                            <p className="text-xs text-slate-500">Find deals, companies, and contacts instantly</p>
                        </div>
                    ) : totalResults === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <Search className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600 mb-1">No results found</p>
                            <p className="text-xs text-slate-500">Try searching for something else</p>
                        </div>
                    ) : (
                        <div className="py-2">
                            {/* Deals */}
                            {results.deals.length > 0 && (
                                <div className="mb-1">
                                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Deals ({results.deals.length})
                                    </div>
                                    <div className="space-y-0.5">
                                        {results.deals.map(deal => (
                                            <button
                                                key={deal.id}
                                                onClick={() => handleResultClick('deal', deal)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                                    <FileText className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-900 truncate mb-0.5">{deal.name}</p>
                                                    <p className="text-xs text-slate-500">{deal.company} • {deal.stage} • {deal.amount}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Companies */}
                            {results.companies.length > 0 && (
                                <div className="mb-1">
                                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Companies ({results.companies.length})
                                    </div>
                                    <div className="space-y-0.5">
                                        {results.companies.map(company => (
                                            <button
                                                key={company.id}
                                                onClick={() => handleResultClick('company', company)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                                    <Building2 className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-900 truncate mb-0.5">{company.name}</p>
                                                    <p className="text-xs text-slate-500">{company.industry} • {company.stage}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Contacts */}
                            {results.contacts.length > 0 && (
                                <div className="mb-1">
                                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Contacts ({results.contacts.length})
                                    </div>
                                    <div className="space-y-0.5">
                                        {results.contacts.map(contact => (
                                            <button
                                                key={contact.id}
                                                onClick={() => handleResultClick('contact', contact)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                                                    <User className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-900 truncate mb-0.5">{contact.name}</p>
                                                    <p className="text-xs text-slate-500">{contact.role} @ {contact.company}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {totalResults > 0 && (
                    <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 sticky bottom-0">
                        <p className="text-xs text-slate-500 text-center">
                            Found <span className="font-semibold text-slate-700">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for "<span className="font-medium text-slate-700">{searchQuery}</span>"
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
