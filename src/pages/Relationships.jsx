import React, { useState } from 'react';
import NetworkMetrics from '@/components/network/NetworkMetrics';
import RelationshipTable from '@/components/network/RelationshipTable';
import AgentDrawer from '@/components/network/AgentDrawer';
import AddContactDialog from '@/components/network/AddContactDialog';
import FilterDialog from '@/components/network/FilterDialog';
import { Button } from '@/components/ui/button';
import { Plus, Download, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Relationships() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'pipeline'
    const [showAddContactDialog, setShowAddContactDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [filters, setFilters] = useState({
        sentiment: [],
        strengthMin: 0,
        strengthMax: 100
    });

    const searchInputRef = React.useRef(null);

    // Keyboard shortcut for search
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Contact state management
    const [contacts, setContacts] = useState([
        {
            id: '1',
            name: 'Sarah Chen',
            avatar: 'SC',
            linkedin: 'https://linkedin.com',
            whatsapp: '1234567890',
            role: 'Partner',
            entity: 'Sequoia Capital',
            relationshipScore: 92,
            lastInteractionDays: 2,
            lastInteractionType: 'Email',
            lastInteractionContext: 'Series A discussion',
            sentiment: 'Champion',
            nextAction: 'draft'
        },
        {
            id: '2',
            name: 'Marcus Johnson',
            avatar: 'MJ',
            linkedin: 'https://linkedin.com',
            whatsapp: '0987654321',
            role: 'CEO',
            entity: 'TechFlow AI',
            relationshipScore: 78,
            lastInteractionDays: 5,
            lastInteractionType: 'Meeting',
            lastInteractionContext: 'Portfolio review',
            sentiment: 'Interested',
            nextAction: 'schedule'
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            avatar: 'ER',
            linkedin: 'https://linkedin.com',
            role: 'LP',
            entity: 'Stanford Endowment',
            relationshipScore: 45,
            lastInteractionDays: 32,
            lastInteractionType: 'Email',
            lastInteractionContext: 'Q3 report follow-up',
            sentiment: 'Skeptical',
            nextAction: 'draft'
        },
        {
            id: '4',
            name: 'David Park',
            avatar: 'DP',
            linkedin: 'https://linkedin.com',
            role: 'Founder',
            entity: 'NeuralMind',
            relationshipScore: 88,
            lastInteractionDays: 1,
            lastInteractionType: 'Call',
            lastInteractionContext: 'Term sheet review',
            sentiment: 'Champion',
            nextAction: 'schedule'
        },
    ]);

    // Add new contact handler
    const handleAddContact = (newContact) => {
        try {
            // Create initials safely
            const nameParts = (newContact.name || 'Unknown').split(' ');
            const initials = nameParts.map(n => n[0] || '').join('').toUpperCase() || 'UN';

            const contactToAdd = {
                id: Date.now().toString(),
                name: newContact.name || 'Unknown',
                avatar: initials,
                linkedin: 'https://linkedin.com',
                whatsapp: newContact.phone || '',
                role: newContact.role || '',
                entity: newContact.entity || '',
                relationshipScore: newContact.strength || 50,
                lastInteractionDays: 0,
                lastInteractionType: 'Email',
                lastInteractionContext: 'Initial contact',
                sentiment: newContact.sentiment || 'Neutral',
                nextAction: 'draft',
                email: newContact.email || '',
                phone: newContact.phone || '',
                notes: newContact.notes || ''
            };

            console.log('Adding contact:', contactToAdd);
            setContacts(prev => [contactToAdd, ...prev]);
            setShowAddContactDialog(false);
            toast.success(`${contactToAdd.name} added to your network`);
        } catch (error) {
            console.error('Error adding contact:', error);
            toast.error(`Error adding contact: ${error.message}`);
        }
    };


    // Export contacts to PDF
    const handleExport = async () => {
        try {
            // Dynamically import jsPDF
            const jsPDF = (await import('jspdf')).default;
            const autoTable = (await import('jspdf-autotable')).default;

            const doc = new jsPDF();

            // Add title
            doc.setFontSize(20);
            doc.setTextColor(15, 23, 42); // slate-900
            doc.text('DealFlow AI - Contact Network', 14, 20);

            // Add subtitle
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139); // slate-500
            const dateStr = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            doc.text(`Generated on ${dateStr}`, 14, 28);

            // Add summary stats
            doc.setFontSize(9);
            doc.text(`Total Contacts: ${contacts.length}`, 14, 34);

            // Prepare table data
            const tableData = contacts.map(contact => [
                contact.name || 'N/A',
                contact.role || 'N/A',
                contact.entity || 'N/A',
                String(contact.relationshipScore || 0),
                contact.sentiment || 'N/A',
                `${contact.lastInteractionDays || 0}d ago`
            ]);

            // Add table using autoTable
            doc.autoTable({
                startY: 40,
                head: [['Name', 'Role', 'Entity', 'Strength', 'Sentiment', 'Last Touch']],
                body: tableData,
                theme: 'striped',
                headStyles: {
                    fillColor: [15, 23, 42], // slate-900
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    fontSize: 10
                },
                bodyStyles: {
                    fontSize: 9,
                    textColor: [51, 65, 85] // slate-700
                },
                alternateRowStyles: {
                    fillColor: [248, 250, 252] // slate-50
                },
                columnStyles: {
                    0: { cellWidth: 35 }, // Name
                    1: { cellWidth: 30 }, // Role
                    2: { cellWidth: 40 }, // Entity
                    3: { cellWidth: 20, halign: 'center' }, // Strength
                    4: { cellWidth: 25 }, // Sentiment
                    5: { cellWidth: 25 }  // Last Touch
                },
                margin: { top: 40, left: 14, right: 14 }
            });

            // Add footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(148, 163, 184); // slate-400
                doc.text(
                    `Page ${i} of ${pageCount} | DealFlow AI`,
                    doc.internal.pageSize.getWidth() / 2,
                    doc.internal.pageSize.getHeight() - 10,
                    { align: 'center' }
                );
            }

            // Save the PDF
            const filename = `dealflow-contacts-${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(filename);

        } catch (error) {
            console.error('Error generating PDF:', error);
            // Fallback to CSV if PDF fails
            const headers = ['Name', 'Role', 'Entity', 'Strength', 'Sentiment', 'Last Touch'];
            const csvContent = [
                headers.join(','),
                ...contacts.map(c => `"${c.name}","${c.role}","${c.entity}",${c.relationshipScore},"${c.sentiment}","${c.lastInteractionDays}d ago"`)
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `dealflow-contacts-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.warning('PDF generation failed. Downloaded as CSV instead.');
        }
    };

    // Filter contacts based on search and filters
    const filteredContacts = contacts.filter(contact => {
        // Search filter
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery ||
            contact.name?.toLowerCase().includes(searchLower) ||
            contact.role?.toLowerCase().includes(searchLower) ||
            contact.entity?.toLowerCase().includes(searchLower) ||
            contact.email?.toLowerCase().includes(searchLower);

        // Sentiment filter
        const matchesSentiment = filters.sentiment.length === 0 ||
            filters.sentiment.includes(contact.sentiment);

        // Strength filter
        const matchesStrength = contact.relationshipScore >= filters.strengthMin &&
            contact.relationshipScore <= filters.strengthMax;

        return matchesSearch && matchesSentiment && matchesStrength;
    });

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Relationships</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your network and track relationship health</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-9 text-sm"
                        onClick={handleExport}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button
                        className="h-9 text-sm bg-slate-900 hover:bg-slate-800"
                        onClick={() => setShowAddContactDialog(true)}
                    >
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
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search network..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9"
                            onClick={() => setShowFilterDialog(true)}
                        >
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            Filter
                            {(filters.sentiment.length > 0 || filters.strengthMin > 0 || filters.strengthMax < 100) && (
                                <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                                    {filters.sentiment.length + (filters.strengthMin > 0 || filters.strengthMax < 100 ? 1 : 0)}
                                </span>
                            )}
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
                {viewMode === 'table' ? (
                    <RelationshipTable
                        contacts={filteredContacts}
                        onSelectContact={setSelectedContact}
                        selectedContact={selectedContact}
                    />
                ) : (
                    <div className="bg-white rounded-lg border border-slate-200 p-8">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Pipeline View</h3>
                            <p className="text-slate-500 mb-4">Visualize your contacts in a pipeline format</p>
                            <div className="grid grid-cols-4 gap-4">
                                {['Champion', 'Interested', 'Neutral', 'Skeptical'].map(sentiment => {
                                    const sentimentContacts = filteredContacts.filter(c => c.sentiment === sentiment);
                                    return (
                                        <div key={sentiment} className="bg-slate-50 rounded-lg p-4">
                                            <h4 className="font-medium text-sm text-slate-700 mb-3">{sentiment}</h4>
                                            <div className="text-2xl font-bold text-slate-900 mb-2">{sentimentContacts.length}</div>
                                            <div className="space-y-2">
                                                {sentimentContacts.slice(0, 3).map(contact => (
                                                    <div
                                                        key={contact.id}
                                                        onClick={() => setSelectedContact(contact)}
                                                        className="bg-white p-2 rounded border border-slate-200 cursor-pointer hover:border-blue-500 transition-colors"
                                                    >
                                                        <div className="text-xs font-medium text-slate-900">{contact.name}</div>
                                                        <div className="text-[10px] text-slate-500">{contact.entity}</div>
                                                    </div>
                                                ))}
                                                {sentimentContacts.length > 3 && (
                                                    <div className="text-xs text-slate-400 text-center">
                                                        +{sentimentContacts.length - 3} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Drawer */}
            <AgentDrawer
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
            />

            {/* Add Contact Dialog */}
            {showAddContactDialog && (
                <AddContactDialog
                    open={showAddContactDialog}
                    onOpenChange={setShowAddContactDialog}
                    onAddContact={handleAddContact}
                />
            )}

            {/* Filter Dialog */}
            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={filters}
                onApplyFilters={setFilters}
            />
        </div>
    );
}