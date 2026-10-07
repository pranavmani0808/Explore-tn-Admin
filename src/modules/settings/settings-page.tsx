import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SettingsPage: React.FC = () => {
  const [platformName, setPlatformName] = useState('ExploreTN Travel Intelligence Platform');
  const [supportEmail, setSupportEmail] = useState('admin@exploretn.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System & Platform Settings</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          High-level operational configuration reserved for SUPER_ADMIN & SYSTEM_ADMIN roles.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-4">
        <div>
          <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
            Platform Brand Title
          </label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
            System Escalation Email
          </label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="size-4" />
              Settings updated successfully.
            </span>
          )}
          <Button type="submit" size="sm" className="ml-auto">
            Save System Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
