import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import DealCard from './DealCard';

export default function PipelineColumn({ id, title, deals, color }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="flex flex-col h-full bg-slate-50/50 rounded-xl border border-slate-200/60">
            <div className={`p-4 border-b border-slate-200/60 flex items-center justify-between ${color}`}>
                <h3 className="font-semibold text-sm">{title}</h3>
                <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-medium">{deals.length}</span>
            </div>
            <ScrollArea className="flex-1 p-3">
                <div ref={setNodeRef} className="min-h-[100px] space-y-3">
                    {deals.map((deal) => (
                        <DealCard key={deal.id} deal={deal} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
