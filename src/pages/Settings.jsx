import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

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

const ToggleRow = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
        <div className="space-y-0.5">
            <Label className="text-base font-medium text-slate-900">{label}</Label>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <Switch defaultChecked={defaultChecked} />
    </div>
);

export default function Settings() {
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
                                defaultValue="John Doe"
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                defaultValue="john@dealflow.ai"
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                defaultValue="General Partner"
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fund">Fund Name</Label>
                            <Input
                                id="fund"
                                defaultValue="Ventures Capital"
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </SettingsCard>

                {/* Notifications Card */}
                <SettingsCard title="Notifications" description="Configure how you receive alerts and updates.">
                    <div className="space-y-2 divide-y divide-slate-100">
                        <ToggleRow
                            label="New Deal Alerts"
                            description="Receive emails when new deals are discovered."
                            defaultChecked={true}
                        />
                        <ToggleRow
                            label="Agent Alerts"
                            description="Get notified when AI agents complete tasks."
                            defaultChecked={true}
                        />
                        <ToggleRow
                            label="Weekly Digest"
                            description="Summary of portfolio performance and deal flow."
                            defaultChecked={false}
                        />
                        <ToggleRow
                            label="Portfolio Updates"
                            description="Alerts for significant changes in portfolio companies."
                            defaultChecked={true}
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
                                defaultValue="SaaS, B2B, AI/ML, FinTech"
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
                                        defaultValue="500,000"
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
                                        defaultValue="5,000,000"
                                        className="pl-7 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="geography">Target Geographies</Label>
                            <Input
                                id="geography"
                                defaultValue="North America, Europe"
                                className="focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </SettingsCard>

                {/* Security Card */}
                <SettingsCard title="Security" description="Manage your password and account security.">
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                            <Button variant="outline" className="w-full sm:w-auto">Enable 2FA</Button>
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 -ml-4">
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </SettingsCard>
            </div>

            {/* Footer / Save Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button className="bg-[#6366f1] hover:bg-[#5558dd] shadow-lg hover:shadow-xl transition-all duration-300 px-8 h-12 rounded-full text-base font-medium">
                    Save Changes
                </Button>
            </div>
        </div>
    );
}