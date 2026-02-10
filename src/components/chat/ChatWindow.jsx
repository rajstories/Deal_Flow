import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { createChatSession, sendChatMessage } from '@/services/gemini';
import { toast } from 'sonner';

const SUGGESTED_QUESTIONS = [
    "Why is the market score this value?",
    "Is the burn rate sustainable?",
    "How strong is the founding team?",
    "What are the main risks?"
];

export default function ChatWindow({ analysisData, onClose, onMinimize }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatSession, setChatSession] = useState(null);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Initialize chat session
    useEffect(() => {
        if (analysisData && !chatSession) {
            try {
                const session = createChatSession(analysisData);
                setChatSession(session);

                // Add welcome message
                setMessages([{
                    id: 'welcome',
                    role: 'assistant',
                    content: `Hi! I've analyzed the pitch deck for ${analysisData.companyName}. I can answer questions about the team, market, risks, or any other aspect of the analysis. What would you like to know?`,
                    timestamp: new Date(),
                    sources: []
                }]);
            } catch (err) {
                console.error('Failed to create chat session:', err);
                setError('Failed to initialize chat. Please try again.');
            }
        }
    }, [analysisData, chatSession]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (messageText) => {
        if (!chatSession) {
            toast.error('Chat session not initialized');
            return;
        }

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        setError(null);

        try {
            // Send to Gemini
            const response = await sendChatMessage(chatSession, messageText);

            // Add AI response
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
                sources: extractSources(response)
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setError('Failed to get response. Please try again.');
            toast.error('Failed to send message');

            // Add error message
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm sorry, I encountered an error processing your question. Please try again or rephrase your question.",
                timestamp: new Date(),
                sources: []
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestedQuestion = (question) => {
        handleSendMessage(question);
    };

    // Extract source references from response (simple implementation)
    const extractSources = (text) => {
        const sources = [];
        if (text.toLowerCase().includes('market')) sources.push('Market Analysis');
        if (text.toLowerCase().includes('team')) sources.push('Team Assessment');
        if (text.toLowerCase().includes('risk')) sources.push('Risk Factors');
        if (text.toLowerCase().includes('competitor')) sources.push('Competitive Landscape');
        return sources;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "fixed bottom-6 right-6 z-50",
                "w-[400px] h-[600px]",
                "md:w-[400px] md:h-[600px]",
                "max-md:w-screen max-md:h-screen max-md:bottom-0 max-md:right-0 max-md:rounded-none",
                "bg-slate-900/95 backdrop-blur-xl",
                "border border-slate-700/50 rounded-2xl",
                "shadow-2xl shadow-indigo-500/10",
                "flex flex-col overflow-hidden"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-100 text-sm">Analysis Q&A</h3>
                        <p className="text-xs text-slate-400">Powered by Gemini</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onMinimize}
                        className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors hidden md:block"
                        title="Minimize"
                    >
                        <Minimize2 className="h-4 w-4 text-slate-400" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                        title="Close"
                    >
                        <X className="h-4 w-4 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#475569 transparent'
                }}
            >
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        isUser={message.role === 'user'}
                    />
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <TypingIndicator />
                    </div>
                )}

                {/* Suggested Questions (show when no user messages yet) */}
                {messages.length === 1 && !isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span>Suggested questions:</span>
                        </div>
                        <div className="grid gap-2">
                            {SUGGESTED_QUESTIONS.map((question, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className="text-left px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput
                onSend={handleSendMessage}
                isLoading={isTyping}
                disabled={!chatSession || !!error}
            />
        </motion.div>
    );
}
