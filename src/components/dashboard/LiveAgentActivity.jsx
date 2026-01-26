import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
    { agent: 'Scout Agent', action: 'Discovered new startup', target: 'FinTech AI', time: '2m ago' },
    { agent: 'Analyst Agent', action: 'Completed due diligence', target: 'GreenEnergy Co', time: '15m ago' },
    { agent: 'Network Agent', action: 'Found warm intro', target: 'Sarah Chen', time: '1h ago' },
    { agent: 'Portfolio Agent', action: 'Updated valuation', target: 'TechFlow', time: '2h ago' },
];

export default function LiveAgentActivity() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Live Agent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                        {activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">AI</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.agent}</p>
                                    <p className="text-xs text-slate-500">
                                        {activity.action}: <span className="font-medium text-slate-900">{activity.target}</span>
                                    </p>
                                </div>
                                <div className="ml-auto text-xs text-slate-400">{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
