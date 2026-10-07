import React from 'react';
import { FileSpreadsheet, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Weekly Digest & Performance Reports</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Operational summaries on user growth, itinerary generations, and moderation velocity.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="size-4 text-emerald-400" />
          <span>Current Week (Week 41, 2026) Highlights</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-500">New Users</div>
            <div className="text-lg font-bold text-white mt-1">+1,248</div>
          </div>
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-500">Places Verified</div>
            <div className="text-lg font-bold text-emerald-400 mt-1">+34</div>
          </div>
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-500">Event Registrations</div>
            <div className="text-lg font-bold text-teal-400 mt-1">192</div>
          </div>
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-500">Avg AI Response</div>
            <div className="text-lg font-bold text-cyan-400 mt-1">280ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};
