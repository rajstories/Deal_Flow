import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAgentActivity } from '@/services/api';
import { toast } from 'sonner';

export default function LiveAgentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getAgentActivity();
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch agent activity:", error);
        // toast.error("Failed to load agent activity"); // Optional: don't spam toasts on dash load
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Live Agent Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Live Agent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-sm text-slate-500 text-center">No recent activity</p>
            ) : (
              activities.map((activity, i) => (
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
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
