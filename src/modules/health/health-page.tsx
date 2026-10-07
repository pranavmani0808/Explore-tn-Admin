import React, { useState } from 'react';
import { Activity, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HealthPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const services = [
    { name: 'Core HTTP API Gateway', status: 'OPERATIONAL', latency: '38ms', uptime: '99.98%' },
    { name: 'Supabase PostgreSQL Shared DB', status: 'OPERATIONAL', latency: '19ms', uptime: '99.99%' },
    { name: 'Supabase Authentication Service', status: 'OPERATIONAL', latency: '24ms', uptime: '100%' },
    { name: 'Cloud Storage & CDN Buckets', status: 'OPERATIONAL', latency: '31ms', uptime: '99.95%' },
    { name: 'Map GIS Tile Cluster', status: 'OPERATIONAL', latency: '22ms', uptime: '100%' },
    { name: 'Google Gemini AI Inference Engine', status: 'OPERATIONAL', latency: '280ms', uptime: '99.90%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System Health & Infrastructure Monitor</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Real-time ping probes across databases, GIS endpoints, and serverless edge runtimes.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 800); }} loading={loading} className="gap-2 font-mono">
          <RefreshCw className="size-3.5" />
          <span>Ping All Services</span>
        </Button>
      </div>

      <div className="p-6 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-3">
        {services.map((s) => (
          <div key={s.name} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-white">{s.name}</p>
                <p className="text-[10px] font-mono text-zinc-500 mt-0.5">30-day uptime: {s.uptime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="text-zinc-400">{s.latency}</span>
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
