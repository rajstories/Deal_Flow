import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Sparkles,
    Mail,
    Calendar,
    Phone,
    MessageSquare,
    ExternalLink,
    Linkedin,
    Trophy,
    UserPlus,
    Send,
    Clock,
    Building2,
    TrendingUp,
    AlertCircle,
    Instagram
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const interactionHistory = [
    { type: 'email', date: '2 days ago', subject: 'Re: Series A Discussion', preview: 'Thanks for the update on the metrics...' },
    { type: 'meeting', date: '1 week ago', subject: 'Portfolio Review Call', preview: '45 min call discussing Q3 performance' },
    { type: 'email', date: '2 weeks ago', subject: 'Introduction - AI Startup', preview: 'Happy to make the intro to the founder...' },
    { type: 'call', date: '3 weeks ago', subject: 'Quick Sync', preview: '15 min catch-up on market conditions' },
];

const interactionIcons = {
    email: Mail,
    meeting: Calendar,
    call: Phone,
    message: MessageSquare,
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

export default function AgentDrawer({ contact, onClose }) {
    if (!contact) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-50"
                onClick={onClose}
            />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 z-50 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-sm font-medium text-white">
                            {contact.avatar}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-[15px] font-semibold text-slate-900">{contact.name}</h2>
                                {/* Social Actions */}
                                <div className="flex items-center gap-1.5">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <a
                                                    href={contact.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-slate-400 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all duration-300 ease-in-out"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>LinkedIn</TooltipContent>
                                        </Tooltip>

                                        {contact.whatsapp && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <a
                                                        href={`https://wa.me/${contact.whatsapp}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-slate-400 border border-slate-200 hover:bg-green-50 hover:text-[#25D366] hover:border-[#25D366] transition-all duration-300 ease-in-out"
                                                    >
                                                        <WhatsAppIcon className="w-4 h-4" />
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>Chat on WhatsApp</TooltipContent>
                                            </Tooltip>
                                        )}

                                        {contact.instagram && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <a
                                                        href={`https://instagram.com/${contact.instagram}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-slate-400 border border-slate-200 hover:bg-pink-50 hover:text-[#E1306C] hover:border-[#E1306C] transition-all duration-300 ease-in-out"
                                                    >
                                                        <Instagram className="w-4 h-4" />
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>View Profile</TooltipContent>
                                            </Tooltip>
                                        )}
                                    </TooltipProvider>
                                </div>
                            </div>
                            <p className="text-[12px] text-slate-500">{contact.role} @ {contact.entity}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Gemini Dossier */}
                    <div className="p-5 border-b border-slate-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                            </div>
                            <h3 className="text-[13px] font-semibold text-slate-900">AI Dossier</h3>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Auto-generated</span>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600 leading-relaxed space-y-2">
                            <p>
                                <strong className="text-slate-800">{contact.name}</strong> is a {contact.role} at {contact.entity},
                                known for leading investments in enterprise SaaS and AI infrastructure.
                            </p>
                            <p>
                                Recent activity: Spoke at TechCrunch Disrupt about AI governance.
                                Led $50M Series B for DataMesh (announced 2 weeks ago).
                            </p>
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 mt-2">
                                <span className="flex items-center gap-1 text-[11px] text-emerald-600">
                                    <TrendingUp className="w-3 h-3" />
                                    High influence
                                </span>
                                <span className="flex items-center gap-1 text-[11px] text-blue-600">
                                    <Building2 className="w-3 h-3" />
                                    142 connections
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Interaction History */}
                    <div className="p-5 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-[13px] font-semibold text-slate-900">Interaction History</h3>
                            <button className="text-[11px] text-blue-600 hover:text-blue-700 font-medium">View All</button>
                        </div>
                        <div className="space-y-2">
                            {interactionHistory.map((item, index) => {
                                const Icon = interactionIcons[item.type];
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                                    >
                                        <div className="p-1.5 bg-slate-100 rounded-md mt-0.5">
                                            <Icon className="w-3.5 h-3.5 text-slate-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[12px] font-medium text-slate-800 truncate">{item.subject}</span>
                                                <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.date}</span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.preview}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Suggested Actions */}
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <h3 className="text-[13px] font-semibold text-slate-900">Suggested Actions</h3>
                        </div>
                        <div className="space-y-2">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full flex items-start gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-colors text-left"
                            >
                                <div className="p-1.5 bg-amber-100 rounded-md">
                                    <Trophy className="w-4 h-4 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[12px] font-medium text-slate-800 block">
                                        Congratulate on recent IPO
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        Detected: Portfolio company DataMesh went public yesterday
                                    </span>
                                </div>
                                <Send className="w-4 h-4 text-slate-400" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full flex items-start gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors text-left"
                            >
                                <div className="p-1.5 bg-blue-100 rounded-md">
                                    <UserPlus className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[12px] font-medium text-slate-800 block">
                                        Ask for intro to Marcus Chen
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        Founder of NeuralMind - 2nd degree connection
                                    </span>
                                </div>
                                <Send className="w-4 h-4 text-slate-400" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left"
                            >
                                <div className="p-1.5 bg-slate-100 rounded-md">
                                    <Calendar className="w-4 h-4 text-slate-600" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[12px] font-medium text-slate-800 block">
                                        Schedule quarterly check-in
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        Last meeting was 45 days ago
                                    </span>
                                </div>
                                <Send className="w-4 h-4 text-slate-400" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="flex-1 h-9 text-[12px]">
                            <Mail className="w-3.5 h-3.5 mr-1.5" />
                            Send Email
                        </Button>
                        <Button className="flex-1 h-9 text-[12px] bg-slate-900 hover:bg-slate-800">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            Schedule Meeting
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}