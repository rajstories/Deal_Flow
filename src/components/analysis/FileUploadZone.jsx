import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FileUploadZone() {
    return (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer dark:border-slate-700 dark:hover:bg-slate-900">
            <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Pitch Deck</h3>
            <p className="text-slate-500 mt-2 text-sm max-w-sm">
                Drag and drop your PDF pitch deck here, or click to browse.
                AI will automatically analyze the content.
            </p>
        </div>
    );
}
