import React, { useState, useEffect } from 'react';
import { X, User, Mail, Shield, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => Promise<void> | void;
  initialData?: any | null;
  mode?: 'user' | 'staff';
}

const STAFF_ROLES = [
  { value: 'SUPER_ADMIN', label: 'Super Admin (Full System Control)' },
  { value: 'ADMIN', label: 'Platform Admin' },
  { value: 'CONTENT_MANAGER', label: 'Content Manager (Places, Guides, Media)' },
  { value: 'EVENT_MODERATOR', label: 'Event & Festival Moderator' },
  { value: 'COMMUNITY_MODERATOR', label: 'Community & Review Moderator' },
  { value: 'ORGANIZER_MANAGER', label: 'Event Organizer Manager' },
  { value: 'AI_ADMIN', label: 'AI Operations & Prompts Admin' },
  { value: 'ANALYST', label: 'Data & Search Analyst' },
  { value: 'SUPPORT_AGENT', label: 'Helpdesk & Support Agent' },
  { value: 'SYSTEM_ADMIN', label: 'System Health & Security Admin' },
];

const USER_ROLES = [
  { value: 'EXPLORER', label: 'Registered Traveler (Explorer)' },
  { value: 'SCOUT', label: 'Local Scout / Contributor' },
  { value: 'ORGANIZER', label: 'Verified Event Organizer' },
];

export const UserEditorModal: React.FC<UserEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode = 'user',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: mode === 'staff' ? 'ADMIN' : 'EXPLORER',
    status: 'ACTIVE',
    department: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        password: '',
        role: initialData.role || (mode === 'staff' ? 'ADMIN' : 'EXPLORER'),
        status: initialData.status || 'ACTIVE',
        department: initialData.department || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: mode === 'staff' ? 'ADMIN' : 'EXPLORER',
        status: 'ACTIVE',
        department: '',
      });
    }
    setError(null);
  }, [initialData, isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide full name and email address.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await onSave({
        ...formData,
        id: initialData?.id || `usr-${Date.now()}`,
        created_at: initialData?.created_at || new Date().toISOString(),
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save account details.');
    } finally {
      setLoading(false);
    }
  };

  const rolesList = mode === 'staff' ? STAFF_ROLES : USER_ROLES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0d121a] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <User className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {initialData
                  ? `Edit ${mode === 'staff' ? 'Staff Member' : 'User'} Account`
                  : `Add New ${mode === 'staff' ? 'Staff Member' : 'User'}`}
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                {mode === 'staff' ? 'Internal Operations RBAC Profile' : 'ExploreTN Platform Identity'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-2.5 size-4 text-zinc-500" />
              <input
                type="text"
                required
                placeholder="e.g. Santhosh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-2.5 size-4 text-zinc-500" />
              <input
                type="email"
                required
                disabled={Boolean(initialData)}
                placeholder={mode === 'staff' ? 'staff@exploretn.com' : 'traveler@gmail.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
              />
            </div>
            {initialData && (
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                Primary auth email cannot be changed once registered in Supabase.
              </span>
            )}
          </div>

          {!initialData && (
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Initial Temporary Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-2.5 size-4 text-zinc-500" />
                <input
                  type="password"
                  placeholder="Min 6 characters (e.g. StaffSecure@2026)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Account Privilege & Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {rolesList.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Account Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ACTIVE">Active (Unrestricted)</option>
                <option value="SUSPENDED">Suspended (Blocked Access)</option>
                <option value="PENDING">Pending Verification</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" size="sm" loading={loading} className="font-bold gap-1.5">
              <CheckCircle2 className="size-3.5" />
              <span>{initialData ? 'Update Account' : 'Save Account'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
