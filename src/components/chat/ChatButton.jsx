import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ChatButton({ onClick, isOpen, hasNewMessage }) {
    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClick}
                    className={cn(
                        "fixed bottom-6 right-6 z-50",
                        "flex items-center gap-3 px-5 py-3",
                        "bg-gradient-to-r from-indigo-600 to-purple-600",
                        "text-white font-semibold rounded-full shadow-2xl",
                        "hover:shadow-indigo-500/50 transition-all duration-300",
                        "group"
                    )}
                >
                    <div className="relative">
                        <MessageCircle className="h-5 w-5" />
                        {hasNewMessage && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-amber-400 rounded-full animate-pulse" />
                        )}
                    </div>
                    <span className="text-sm">Ask AI</span>
                    <Sparkles className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
