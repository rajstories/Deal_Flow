import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const deals = [
    { company: 'SolarX', stage: 'Due Diligence', amount: '$2M' },
    { company: 'FinFlow', stage: 'Screening', amount: '$1.5M' },
];

export default function DealKanban() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {deals.map((deal) => (
                    <div key={deal.company} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                        <div>
                            <p className="font-medium text-sm">{deal.company}</p>
                            <p className="text-xs text-slate-500">{deal.amount}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{deal.stage}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
