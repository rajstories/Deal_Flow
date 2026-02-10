import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export default function FilterDialog({ open, onOpenChange, filters, onApplyFilters }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const toggleSentiment = (sentiment) => {
        setLocalFilters(prev => ({
            ...prev,
            sentiment: prev.sentiment.includes(sentiment)
                ? prev.sentiment.filter(s => s !== sentiment)
                : [...prev.sentiment, sentiment]
        }));
    };

    const handleApply = () => {
        onApplyFilters(localFilters);
        onOpenChange(false);
    };

    const handleReset = () => {
        const resetFilters = {
            sentiment: [],
            strengthMin: 0,
            strengthMax: 100
        };
        setLocalFilters(resetFilters);
        onApplyFilters(resetFilters);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Filter Contacts</DialogTitle>
                    <DialogDescription>
                        Refine your contact list with advanced filters
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Sentiment Filter */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700">Sentiment</Label>
                        <div className="flex flex-wrap gap-2">
                            {['Champion', 'Interested', 'Neutral', 'Skeptical', 'Detractor', 'Cold'].map(sentiment => (
                                <button
                                    key={sentiment}
                                    onClick={() => toggleSentiment(sentiment)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${localFilters.sentiment.includes(sentiment)
                                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {sentiment}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Relationship Strength Filter */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700">
                            Relationship Strength: {localFilters.strengthMin} - {localFilters.strengthMax}
                        </Label>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 w-12">Min</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={localFilters.strengthMin}
                                    onChange={(e) => setLocalFilters(prev => ({
                                        ...prev,
                                        strengthMin: parseInt(e.target.value)
                                    }))}
                                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <span className="text-xs font-medium text-slate-700 w-8">{localFilters.strengthMin}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 w-12">Max</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={localFilters.strengthMax}
                                    onChange={(e) => setLocalFilters(prev => ({
                                        ...prev,
                                        strengthMax: parseInt(e.target.value)
                                    }))}
                                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <span className="text-xs font-medium text-slate-700 w-8">{localFilters.strengthMax}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="bg-slate-900 hover:bg-slate-800"
                        onClick={handleApply}
                    >
                        Apply Filters
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
