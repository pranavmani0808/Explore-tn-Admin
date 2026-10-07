import React, { useState } from 'react';
import { History, ShieldCheck } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';

export const AuditPage: React.FC = () => {
  const [logs] = useState([
    { id: 'aud-1', time: '2026-10-07 18:35:10', staff: 'admin@exploretn.com', role: 'SUPER_ADMIN', action: 'EVENT_PUBLISHED', target: 'Kodaikanal Weekend Escape' },
    { id: 'aud-2', time: '2026-10-07 17:12:04', staff: 'santhosh@exploretn.com', role: 'CONTENT_MANAGER', action: 'PLACE_VERIFIED', target: 'Muthupet Mangrove' },
    { id: 'aud-3', time: '2026-10-06 21:05:44', staff: 'admin@exploretn.com', role: 'SUPER_ADMIN', action: 'SYSTEM_SETTINGS_UPDATE', target: 'AI Gemini Prompt' },
  ]);

  const columns: Column<any>[] = [
    {
      key: 'time',
      header: 'Timestamp',
      render: (l) => <span className="font-mono text-zinc-400">{l.time}</span>,
    },
    {
      key: 'staff',
      header: 'Staff Member',
      render: (l) => (
        <div>
          <p className="font-bold text-white">{l.staff}</p>
          <p className="text-[10px] font-mono text-zinc-500">{l.role}</p>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Operation',
      render: (l) => (
        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {l.action}
        </span>
      ),
    },
    {
      key: 'target',
      header: 'Target Entity',
      render: (l) => <span className="text-zinc-300 font-medium">{l.target}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Administrative Audit Logs</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Immutable compliance record of all administrative decisions, moderation actions, and setting modifications.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        totalCount={logs.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
      />
    </div>
  );
};
