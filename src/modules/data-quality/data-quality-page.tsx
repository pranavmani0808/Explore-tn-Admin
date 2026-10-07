import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DataQualityPage: React.FC = () => {
  const issues = [
    { id: 'dq-1', severity: 'LOW', title: 'Missing Thumbnail Cover Image', entity: 'Place', target: 'Muthupet Lagoon', suggestion: 'Upload 1200x800 webp photo' },
    { id: 'dq-2', severity: 'MEDIUM', title: 'Opening Timings Not Stated', entity: 'POI', target: 'Vattakottai Secret Pier', suggestion: 'Verify sunrise-sunset access' },
    { id: 'dq-3', severity: 'LOW', title: 'Short Description (< 40 words)', entity: 'Place', target: 'Semmedu Market', suggestion: 'Expand cultural context' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Data Quality & Integrity Center</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Automated health scanning for orphaned records, missing GPS coordinates, and thin editorial descriptions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Integrity Score</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">98.6%</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Critical Integrity Flags</p>
          <p className="text-2xl font-bold text-white mt-1">0</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Editorial Suggestions</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{issues.length}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0d121a] border border-zinc-800/80 p-5 space-y-4">
        <h2 className="text-sm font-bold text-white">Pending Editorial Optimizations</h2>
        <div className="divide-y divide-zinc-800/60">
          {issues.map((iss) => (
            <div key={iss.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {iss.severity}
                  </span>
                  <p className="text-xs font-semibold text-white">{iss.title}</p>
                </div>
                <p className="text-[10px] font-mono text-zinc-400 mt-1">
                  Entity: <span className="text-emerald-400">{iss.target}</span> · Fix: {iss.suggestion}
                </p>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Inspect
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
