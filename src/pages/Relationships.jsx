import React, { useState } from 'react';
import NetworkMetrics from '@/components/network/NetworkMetrics';
import RelationshipTable from '@/components/network/RelationshipTable';
import AgentDrawer from '@/components/network/AgentDrawer';
import { Button } from '@/components/ui/button';
import { Plus, Download, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Relationships() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'pipeline'

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Relationships</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your network and track relationship health</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-9 text-sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button className="h-9 text-sm bg-slate-900 hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contact
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <NetworkMetrics />

            {/* Main Content Area */}
            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search network..."
                                className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            Filter
                        </Button>
                    </div>

                    <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('table')}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                viewMode === 'table' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            Table
                        </button>
                        <button
                            onClick={() => setViewMode('pipeline')}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                viewMode === 'pipeline' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            Pipeline
                        </button>
                    </div>
                </div>

                {/* Data Grid */}
                <RelationshipTable
                    onSelectContact={setSelectedContact}
                    selectedContact={selectedContact}
                />
            </div>

            {/* Profile Drawer */}
            <AgentDrawer
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
            />
        </div>
    );
}