import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function FileUploadZone({ onFileSelect, isAnalyzing, fileName }) {
    const [dragActive, setDragActive] = useState(false);

    const handleFile = useCallback(async (file) => {
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        // Validate file size (20MB limit)
        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error('File size must be under 20MB');
            return;
        }

        console.log('Processing file:', file.name);

        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result.split(',')[1];
            console.log('Base64 conversion complete, length:', base64.length);
            onFileSelect?.(base64, file.name);
        };
        reader.onerror = () => {
            toast.error('Failed to read file');
        };
        reader.readAsDataURL(file);
    }, [onFileSelect]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleClick = () => {
        if (!isAnalyzing) {
            document.getElementById('pdf-upload')?.click();
        }
    };

    return (
        <div
            className={cn(
                "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all duration-200",
                dragActive
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20"
                    : "border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900",
                isAnalyzing && "opacity-50 cursor-not-allowed",
                !isAnalyzing && "cursor-pointer"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
        >
            <input
                id="pdf-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleChange}
                className="hidden"
                disabled={isAnalyzing}
            />

            {isAnalyzing ? (
                <>
                    <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Upload className="h-8 w-8 text-indigo-600 animate-bounce" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Analyzing Pitch Deck...
                    </h3>
                    <p className="text-slate-500 mt-2 text-sm max-w-sm">
                        Gemini is processing your deck with multimodal AI
                    </p>
                </>
            ) : fileName ? (
                <>
                    <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        File Ready
                    </h3>
                    <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <FileText className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {fileName}
                        </span>
                    </div>
                    <p className="text-slate-500 mt-3 text-xs">
                        Click to upload a different file
                    </p>
                </>
            ) : (
                <>
                    <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Upload Pitch Deck
                    </h3>
                    <p className="text-slate-500 mt-2 text-sm max-w-sm">
                        Drag and drop your PDF pitch deck here, or click to browse.
                        AI will automatically analyze the content.
                    </p>
                    <p className="text-slate-400 mt-3 text-xs">
                        PDF files only • Max 20MB
                    </p>
                </>
            )}
        </div>
    );
}

