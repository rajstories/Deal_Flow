import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ChatInput({ onSend, isLoading, disabled }) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const maxLength = 500;

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 96) + 'px';
        }
    }, [message]);

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!message.trim() || isLoading || disabled) return;

        onSend(message.trim());
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const remainingChars = maxLength - message.length;
    const isNearLimit = remainingChars < 50;

    return (
        <form onSubmit={handleSubmit} className="border-t border-slate-700/50 p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about this analysis..."
                    disabled={isLoading || disabled}
                    rows={1}
                    className={cn(
                        "w-full resize-none rounded-xl px-4 py-3 pr-12",
                        "bg-slate-800/50 border border-slate-700",
                        "text-slate-100 placeholder:text-slate-500",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-all duration-200"
                    )}
                    style={{ maxHeight: '96px' }}
                />

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={!message.trim() || isLoading || disabled}
                    className={cn(
                        "absolute right-2 bottom-2 p-2 rounded-lg",
                        "transition-all duration-200",
                        message.trim() && !isLoading && !disabled
                            ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                            : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* Character count */}
            {isNearLimit && (
                <div className={cn(
                    "text-xs mt-1 text-right transition-colors",
                    remainingChars < 20 ? "text-amber-400" : "text-slate-500"
                )}>
                    {remainingChars} characters remaining
                </div>
            )}

            {/* Hint */}
            <div className="text-xs text-slate-500 mt-2">
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">Enter</kbd> to send,
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 ml-1">Shift+Enter</kbd> for new line
            </div>
        </form>
    );
}
