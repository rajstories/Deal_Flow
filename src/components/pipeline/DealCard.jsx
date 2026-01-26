import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DealCard({ deal }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: deal.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="mb-3 cursor-grab active:cursor-grabbing touch-none">
            <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs font-normal">{deal.sector}</Badge>
                        <span className="text-xs font-bold text-emerald-600">{deal.score}% Match</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">{deal.company}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{deal.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-[10px] bg-indigo-100 text-indigo-700">JD</AvatarFallback>
                            </Avatar>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{deal.amount}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
