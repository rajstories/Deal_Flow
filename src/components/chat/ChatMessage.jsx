import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ChatMessage({ message, isUser }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTimestamp = (date) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "flex gap-3 group",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* Avatar */}
            <div className={cn(
                "shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                isUser
                    ? "bg-gradient-to-br from-amber-400 to-orange-500"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600"
            )}>
                {isUser ? (
                    <User className="h-4 w-4 text-white" />
                ) : (
                    <Sparkles className="h-4 w-4 text-white" />
                )}
            </div>

            {/* Message Bubble */}
            <div className={cn(
                "flex flex-col gap-1 max-w-[75%]",
                isUser ? "items-end" : "items-start"
            )}>
                <div className={cn(
                    "px-4 py-3 rounded-2xl relative",
                    isUser
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-br-sm"
                        : "bg-slate-800/50 text-slate-100 rounded-bl-sm backdrop-blur-sm"
                )}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </p>

                    {/* Copy button (AI messages only) */}
                    {!isUser && (
                        <button
                            onClick={handleCopy}
                            className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-700 rounded"
                            title="Copy message"
                        >
                            {copied ? (
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                                <Copy className="h-3.5 w-3.5 text-slate-400" />
                            )}
                        </button>
                    )}
                </div>

                {/* Timestamp */}
                <span className="text-xs text-slate-500 px-1">
                    {formatTimestamp(message.timestamp)}
                </span>

                {/* Sources (AI messages only) */}
                {!isUser && message.sources && message.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1 px-1">
                        {message.sources.map((source, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full"
                            >
                                {source}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
