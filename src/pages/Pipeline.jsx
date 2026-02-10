import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import PipelineColumn from '@/components/pipeline/PipelineColumn';
import DealCard from '@/components/pipeline/DealCard';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

const initialDeals = [
    { id: '1', company: 'SolarX Energy', sector: 'CleanTech', amount: '$2M', score: 85, stage: 'discovered', description: 'Next-gen solar panel efficiency coating.' },
    { id: '2', company: 'FinFlow AI', sector: 'FinTech', amount: '$1.5M', score: 92, stage: 'screening', description: 'Automated financial planning for Gen Z.' },
    { id: '3', company: 'MediBot', sector: 'HealthTech', amount: '$5M', score: 78, stage: 'due_diligence', description: 'Surgical robotics assistant.' },
    { id: '4', company: 'CyberGuard', sector: 'CyberSec', amount: '$3M', score: 88, stage: 'negotiation', description: 'Enterprise zero-trust architecture.' },
    { id: '5', company: 'AgriSense', sector: 'AgTech', amount: '$1.2M', score: 82, stage: 'discovered', description: 'IoT sensors for crop monitoring.' },
];

const columns = [
    { id: 'discovered', title: 'Discovered', color: 'bg-blue-50 text-blue-700' },
    { id: 'screening', title: 'Screening', color: 'bg-purple-50 text-purple-700' },
    { id: 'due_diligence', title: 'Due Diligence', color: 'bg-orange-50 text-orange-700' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-emerald-50 text-emerald-700' },
];

export default function Pipeline() {
    const [deals, setDeals] = useState(initialDeals);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setDeals((items) => {
                const activeIndex = items.findIndex((i) => i.id === active.id);
                const activeItem = items[activeIndex];

                // If dropped over a column
                if (columns.find(c => c.id === over.id)) {
                    return items.map(item =>
                        item.id === active.id ? { ...item, stage: over.id } : item
                    );
                }
                return items;
            });
        }
        setActiveId(null);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Deal Pipeline</h1>
                    <p className="text-slate-500">Manage and track your deal flow.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="mr-2 h-4 w-4" />
                        New Deal
                    </Button>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">
                    {columns.map((col) => (
                        <PipelineColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            color={col.color}
                            deals={deals.filter(d => d.stage === col.id)}
                        />
                    ))}
                </div>
                <DragOverlay>
                    {activeId ? (
                        <DealCard deal={deals.find(d => d.id === activeId)} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
