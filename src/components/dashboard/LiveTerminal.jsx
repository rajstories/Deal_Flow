import React, { useEffect, useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const logs = [
    { type: 'info', message: 'Initializing DealFlow AI v2.0...' },
    { type: 'success', message: 'Connected to Base44 Neural Network' },
    { type: 'info', message: 'Syncing portfolio data...' },
    { type: 'warning', message: 'New deal detected: SolarX Energy' },
    { type: 'info', message: 'Analyzing pitch deck for SolarX...' },
    { type: 'success', message: 'Analysis complete. Score: 85/100' },
    { type: 'info', message: 'Updating CRM records...' },
];

export default function LiveTerminal() {
    const [lines, setLines] = useState(logs);
    const scrollRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = logs[Math.floor(Math.random() * logs.length)];
            setLines(prev => [...prev.slice(-20), { ...newLog, timestamp: new Date().toLocaleTimeString() }]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 shadow-inner">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="ml-2 text-slate-500">terminal@dealflow-ai:~</span>
            </div>
            <ScrollArea className="h-[200px]" ref={scrollRef}>
                <div className="space-y-1">
                    {lines.map((line, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="text-slate-600">[{line.timestamp || '10:00:00'}]</span>
                            <span className={cn(
                                line.type === 'success' && "text-emerald-400",
                                line.type === 'warning' && "text-yellow-400",
                                line.type === 'error' && "text-red-400",
                                line.type === 'info' && "text-blue-400"
                            )}>
                                {line.type === 'success' && '✓'}
                                {line.type === 'warning' && '⚠'}
                                {line.type === 'info' && 'ℹ'}
                                {line.type === 'error' && '✕'}
                            </span>
                            <span>{line.message}</span>
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </ScrollArea>
        </div>
    );
}
