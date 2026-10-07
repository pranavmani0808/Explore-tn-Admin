import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const alerts = [
    { id: 'nt-1', title: 'New Place Suggestion: Muthupet Mangrove', time: '15 mins ago', type: 'MODERATION', read: false },
    { id: 'nt-2', title: 'AI Planner Daily Latency Report: Nominal (280ms)', time: '2 hours ago', type: 'SYSTEM', read: true },
    { id: 'nt-3', title: 'High Registration Velocity: Kodaikanal Weekend Escape', time: '5 hours ago', type: 'EVENTS', read: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Staff Notifications Center</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Centralized notifications for moderation flags, system alerts, and staff ticket queues.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">{a.title}</p>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5">{a.type} · {a.time}</p>
            </div>
            <span className={`size-2 rounded-full ${a.read ? 'bg-zinc-700' : 'bg-emerald-500'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
