import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function UserNotRegisteredError() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-center p-4">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
            <p className="text-slate-500 max-w-md mb-6">
                Your account is not registered in the DealFlow AI system. Please contact your administrator to request access.
            </p>
            <Button>Contact Support</Button>
        </div>
    );
}
