import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpDown,
    Linkedin,
    Mail,
    Calendar,
    MessageSquare,
    ChevronUp,
    ChevronDown,
    Phone,
    FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const contactsData = [
    {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'SC',
        linkedin: 'https://linkedin.com',
        whatsapp: '1234567890',
        instagram: 'sarahchen_vc',
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
    {
        id: '5',
        name: 'Lisa Wang',
        avatar: 'LW',
        linkedin: 'https://linkedin.com',
        role: 'Managing Director',
        entity: 'Goldman Sachs',
        relationshipScore: 61,
        lastInteractionDays: 14,
        lastInteractionType: 'Meeting',
        lastInteractionContext: 'Co-investment opportunity',
        sentiment: 'Interested',
        nextAction: 'draft'
    },
    {
        id: '6',
        name: 'James Miller',
        avatar: 'JM',
        linkedin: 'https://linkedin.com',
        role: 'CTO',
        entity: 'CloudScale',
        relationshipScore: 71,
        lastInteractionDays: 8,
        lastInteractionType: 'Email',
        lastInteractionContext: 'Technical due diligence',
        sentiment: 'Interested',
        nextAction: 'schedule'
    },
    {
        id: '7',
        name: 'Anna Kim',
        avatar: 'AK',
        linkedin: 'https://linkedin.com',
        role: 'VP Engineering',
        entity: 'Stripe',
        relationshipScore: 34,
        lastInteractionDays: 45,
        lastInteractionType: 'LinkedIn',
        lastInteractionContext: 'Initial outreach',
        sentiment: 'Cold',
        nextAction: 'draft'
    },
    {
        id: '8',
        name: 'Robert Lee',
        avatar: 'RL',
        linkedin: 'https://linkedin.com',
        role: 'Partner',
        entity: 'a16z',
        relationshipScore: 85,
        lastInteractionDays: 3,
        lastInteractionType: 'Meeting',
        lastInteractionContext: 'Deal syndication',
        sentiment: 'Champion',
        nextAction: 'draft'
    },
];

const sentimentConfig = {
    'Champion': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    'Interested': { color: 'bg-blue-100 text-blue-700 border-blue-200' },
    'Skeptical': { color: 'bg-amber-100 text-amber-700 border-amber-200' },
    'Cold': { color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const RelationshipBar = ({ score, lastDays, type }) => {
    const getColor = (score) => {
        if (score >= 75) return 'bg-emerald-500';
        if (score >= 50) return 'bg-amber-500';
        return 'bg-slate-300';
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-default">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className={cn('h-full rounded-full', getColor(score))}
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </div>
                        <span className="text-[12px] font-medium text-slate-600 w-6">{score}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                    <p>Last interaction {lastDays} days ago via {type}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const WhatsAppIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

export default function RelationshipTable({ onSelectContact, selectedContact }) {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = useMemo(() => {
        if (!sortField) return contactsData;
        return [...contactsData].sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];
            if (typeof aVal === 'number') {
                return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return sortDirection === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
    }, [sortField, sortDirection]);

    const SortHeader = ({ field, children }) => (
        <button
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700"
            onClick={() => handleSort(field)}
        >
            {children}
            {sortField === field ? (
                sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
            ) : (
                <ArrowUpDown className="w-3 h-3 opacity-50" />
            )}
        </button>
    );

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="px-4 py-2.5 text-left">
                                <SortHeader field="name">Name</SortHeader>
                            </th>
                            <th className="px-4 py-2.5 text-left">
                                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role / Entity</span>
                            </th>
                            <th className="px-4 py-2.5 text-left">
                                <SortHeader field="relationshipScore">Strength</SortHeader>
                            </th>
                            <th className="px-4 py-2.5 text-left">
                                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sentiment</span>
                            </th>
                            <th className="px-4 py-2.5 text-left">
                                <SortHeader field="lastInteractionDays">Last Touch</SortHeader>
                            </th>
                            <th className="px-4 py-2.5 text-left">
                                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((contact, index) => {
                            const Icon = contact.lastInteractionType === 'Email' ? Mail :
                                contact.lastInteractionType === 'Meeting' ? Calendar :
                                    contact.lastInteractionType === 'Call' ? Phone : MessageSquare;
                            const config = sentimentConfig[contact.sentiment];
                            const isActive = selectedContact?.id === contact.id;

                            return (
                                <motion.tr
                                    key={contact.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => onSelectContact?.(contact)}
                                    className={cn(
                                        "border-b border-slate-50 cursor-pointer transition-all duration-200 ease-in-out group relative",
                                        "hover:bg-slate-50 hover:shadow-sm hover:z-10 hover:scale-[1.002]",
                                        isActive ? "bg-blue-50/50" : "bg-white"
                                    )}
                                >
                                    <td className="px-4 py-2.5 relative">
                                        {/* Intent Indicator */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-[10px] font-medium text-white">
                                                {contact.avatar}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[13px] font-medium text-slate-900">{contact.name}</span>
                                                <a
                                                    href={contact.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-blue-600 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Linkedin className="w-3.5 h-3.5" />
                                                </a>
                                                {contact.whatsapp && (
                                                    <a
                                                        href={`https://wa.me/${contact.whatsapp}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-[#25D366] transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <WhatsAppIcon className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <div className="text-[13px]">
                                            <span className="text-slate-600">{contact.role}</span>
                                            <span className="text-slate-400"> @ </span>
                                            <span className="text-slate-900 font-medium">{contact.entity}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <RelationshipBar
                                            score={contact.relationshipScore}
                                            lastDays={contact.lastInteractionDays}
                                            type={contact.lastInteractionType}
                                        />
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <span className={cn(
                                            'inline-flex px-2 py-0.5 rounded text-[11px] font-medium border',
                                            config.color
                                        )}>
                                            {contact.sentiment}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-3.5 h-3.5 text-slate-400" />
                                            <div>
                                                <span className={cn(
                                                    'text-[12px] font-medium',
                                                    contact.lastInteractionDays > 30 ? 'text-red-600' : 'text-slate-600'
                                                )}>
                                                    {contact.lastInteractionDays}d ago
                                                </span>
                                                <p className="text-[11px] text-slate-400 truncate max-w-[120px]">
                                                    {contact.lastInteractionContext}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className={cn(
                                                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors',
                                                contact.nextAction === 'draft'
                                                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                            )}
                                        >
                                            {contact.nextAction === 'draft' ? (
                                                <>
                                                    <FileText className="w-3 h-3" />
                                                    Draft Follow-up
                                                </>
                                            ) : (
                                                <>
                                                    <Calendar className="w-3 h-3" />
                                                    Schedule Call
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}