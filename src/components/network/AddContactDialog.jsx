import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, User, Briefcase, Building2, Mail, Phone, TrendingUp, FileText } from 'lucide-react';

export default function AddContactDialog({ open, onOpenChange, onAddContact }) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        email: '',
        phone: '',
        sentiment: 'Neutral',
        strength: 50,
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the parent handler to add contact
        if (onAddContact) {
            onAddContact({
                name: formData.name,
                role: formData.role,
                entity: formData.company,
                email: formData.email,
                phone: formData.phone,
                sentiment: formData.sentiment,
                strength: formData.strength,
                notes: formData.notes
            });
        }

        // Reset form
        setFormData({
            name: '',
            role: '',
            company: '',
            email: '',
            phone: '',
            sentiment: 'Neutral',
            strength: 50,
            notes: ''
        });
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New Contact</DialogTitle>
                    <DialogDescription>
                        Add a new contact to your network. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Sarah Chen"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required
                                    className="h-10"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role / Title</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="role"
                                        placeholder="e.g., Partner"
                                        value={formData.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="pl-10 h-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company / Entity</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="company"
                                        placeholder="e.g., Sequoia Capital"
                                        value={formData.company}
                                        onChange={(e) => handleChange('company', e.target.value)}
                                        className="pl-10 h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Contact Details
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="sarah@sequoia.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="pl-10 h-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="pl-10 h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Relationship Metrics */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Relationship Metrics
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sentiment">Sentiment</Label>
                                <Select value={formData.sentiment} onValueChange={(value) => handleChange('sentiment', value)}>
                                    <SelectTrigger id="sentiment" className="h-10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Champion">🎯 Champion</SelectItem>
                                        <SelectItem value="Interested">👍 Interested</SelectItem>
                                        <SelectItem value="Neutral">😐 Neutral</SelectItem>
                                        <SelectItem value="Skeptical">🤔 Skeptical</SelectItem>
                                        <SelectItem value="Detractor">👎 Detractor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="strength">
                                    Relationship Strength: {formData.strength}
                                </Label>
                                <input
                                    id="strength"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.strength}
                                    onChange={(e) => handleChange('strength', parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Weak</span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any additional notes about this contact..."
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            rows={3}
                            className="resize-none"
                        />
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800"
                        >
                            Add Contact
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
