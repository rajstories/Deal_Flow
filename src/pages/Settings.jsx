import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Key, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const SETTINGS_KEY = 'dealflow_settings';

// Load saved settings from localStorage
const loadSettings = () => {
    try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
};

const defaultSettings = {
    name: 'John Doe',
    email: 'john@dealflow.ai',
    role: 'General Partner',
    fund: 'Ventures Capital',
    newDealAlerts: true,
    agentAlerts: true,
    weeklyDigest: false,
    portfolioUpdates: true,
    criteria: 'SaaS, B2B, AI/ML, FinTech',
    minCheck: '500,000',
    maxCheck: '5,000,000',
    geography: 'North America, Europe',
    geminiApiKey: '',
};

const SettingsCard = ({ title, description, children, className }) => (
    <div className={cn(
        "bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300 ease-out",
        "hover:-translate-y-[2px] hover:shadow-md hover:border-indigo-200",
        className
    )}>
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        {children}
    </div>
);

const ToggleRow = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
        <div className="space-y-0.5">
            <Label className="text-base font-medium text-slate-900">{label}</Label>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onChange} />
    </div>
);

export default function Settings() {
    const [settings, setSettings] = useState(() => loadSettings() || defaultSettings);
    const [saved, setSaved] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);

    // Update a single field
    const updateField = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    // Save to localStorage
    const handleSave = () => {
        try {
            console.log('[Settings] Saving settings:', settings);
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

            // If user provided a Gemini API key, store it. If empty, remove it (to allow fallback to env var)
            if (settings.geminiApiKey && settings.geminiApiKey.trim() !== '') {
                const trimmedKey = settings.geminiApiKey.trim();
                console.log('[Settings] Saving Gemini API key to localStorage:', trimmedKey.substring(0, 10) + '...');
                localStorage.setItem('gemini_api_key', trimmedKey);
                console.log('[Settings] Verification - Key in localStorage:', localStorage.getItem('gemini_api_key')?.substring(0, 10) + '...');
            } else {
                console.log('[Settings] Removing Gemini API key from localStorage (empty field)');
                localStorage.removeItem('gemini_api_key');
            }

            setSaved(true);
            toast.success('Settings saved successfully! API key is ready to use.');
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('[Settings] Save error:', error);
            toast.error('Failed to save settings');
        }
    };

    return (
        <div className="max-w-[800px] mx-auto space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-2">Manage your account preferences and AI configurations.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Card */}
                <SettingsCard title="Profile Information" description="Update your personal details and fund information.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={settings.name}
                                onChange={e => updateField('name', e.target.value)}
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={settings.email}
                                onChange={e => updateField('email', e.target.value)}
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                value={settings.role}
                                onChange={e => updateField('role', e.target.value)}
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fund">Fund Name</Label>
                            <Input
                                id="fund"
                                value={settings.fund}
                                onChange={e => updateField('fund', e.target.value)}
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </SettingsCard>

                {/* Gemini API Key Card */}
                <SettingsCard
                    title="Gemini API Key"
                    description="Required for AI pitch deck analysis, red flag detection, and investment memo generation."
                    className="border-indigo-100"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="gemini-key" className="flex items-center gap-2">
                                <Key className="h-4 w-4 text-indigo-500" />
                                API Key
                            </Label>
                            <div className="relative">
                                <Input
                                    id="gemini-key"
                                    type={showApiKey ? 'text' : 'password'}
                                    value={settings.geminiApiKey}
                                    onChange={e => updateField('geminiApiKey', e.target.value)}
                                    placeholder="Enter your Gemini API Key (AIza...)"
                                    className="pr-10 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 font-mono text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-slate-400">
                                Get your key from{' '}
                                <a
                                    href="https://aistudio.google.com/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-500 hover:text-indigo-600 underline"
                                >
                                    Google AI Studio
                                </a>
                                . Your key is stored locally and never sent to our servers.
                            </p>
                        </div>
                    </div>
                </SettingsCard>

                {/* Notifications Card */}
                <SettingsCard title="Notifications" description="Configure how you receive alerts and updates.">
                    <div className="space-y-2 divide-y divide-slate-100">
                        <ToggleRow
                            label="New Deal Alerts"
                            description="Receive emails when new deals are discovered."
                            checked={settings.newDealAlerts}
                            onChange={v => updateField('newDealAlerts', v)}
                        />
                        <ToggleRow
                            label="Agent Alerts"
                            description="Get notified when AI agents complete tasks."
                            checked={settings.agentAlerts}
                            onChange={v => updateField('agentAlerts', v)}
                        />
                        <ToggleRow
                            label="Weekly Digest"
                            description="Summary of portfolio performance and deal flow."
                            checked={settings.weeklyDigest}
                            onChange={v => updateField('weeklyDigest', v)}
                        />
                        <ToggleRow
                            label="Portfolio Updates"
                            description="Alerts for significant changes in portfolio companies."
                            checked={settings.portfolioUpdates}
                            onChange={v => updateField('portfolioUpdates', v)}
                        />
                    </div>
                </SettingsCard>

                {/* AI Agent Config Card */}
                <SettingsCard title="AI Agent Configuration" description="Customize your AI analyst behavior and screening criteria.">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="criteria">Investment Criteria</Label>
                            <Input
                                id="criteria"
                                value={settings.criteria}
                                onChange={e => updateField('criteria', e.target.value)}
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="min-check">Min Check Size</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                    <Input
                                        id="min-check"
                                        value={settings.minCheck}
                                        onChange={e => updateField('minCheck', e.target.value)}
                                        className="pl-7 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max-check">Max Check Size</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                    <Input
                                        id="max-check"
                                        value={settings.maxCheck}
                                        onChange={e => updateField('maxCheck', e.target.value)}
                                        className="pl-7 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="geography">Target Geographies</Label>
                            <Input
                                id="geography"
                                value={settings.geography}
                                onChange={e => updateField('geography', e.target.value)}
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </SettingsCard>

                {/* Security Card */}
                <SettingsCard title="Security" description="Manage your password and account security.">
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => toast.info('Password change would be handled via auth provider')}>
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => toast.info('2FA setup would be handled via auth provider')}>
                                Enable 2FA
                            </Button>
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                            <Button
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 -ml-4"
                                onClick={() => toast.error('Account deletion would require confirmation via auth provider')}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </SettingsCard>
            </div>

            {/* Footer / Save Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={handleSave}
                    className={cn(
                        "shadow-lg hover:shadow-xl transition-all duration-300 px-8 h-12 rounded-full text-base font-medium",
                        saved
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-[#6366f1] hover:bg-[#5558dd]"
                    )}
                >
                    {saved ? (
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            Saved!
                        </span>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>
        </div>
    );
}