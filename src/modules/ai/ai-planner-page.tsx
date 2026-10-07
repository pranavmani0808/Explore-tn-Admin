import React, { useState } from 'react';
import { Bot, Activity, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AIPlannerPage: React.FC = () => {
  const stats = {
    totalRequests: 48920,
    successRate: '99.4%',
    avgLatency: '280ms',
    activeModel: 'Google Gemini 1.5 Pro',
    failedRequests: 12,
  };

  const queries = [
    { query: '3-day family temple tour starting in Madurai with car', timestamp: '2 mins ago', status: 'SUCCESS', tokens: 840 },
    { query: 'Offbeat waterfalls near Tenkasi for weekend drive', timestamp: '8 mins ago', status: 'SUCCESS', tokens: 620 },
    { query: 'Kodaikanal 2-day budget itinerary with scenic walks', timestamp: '14 mins ago', status: 'SUCCESS', tokens: 910 },
    { query: 'East coast road cafe and beach trail from Chennai', timestamp: '21 mins ago', status: 'SUCCESS', tokens: 730 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Planner Operations & Telemetry</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Real-time inference monitor for Gemini-powered multimodal itinerary planners.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Total Itineraries Generated</p>
          <p className="text-lg font-bold text-white mt-1">{stats.totalRequests.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Success Rate</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">{stats.successRate}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Average Latency</p>
          <p className="text-lg font-bold text-teal-400 mt-1">{stats.avgLatency}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Active AI Model</p>
          <p className="text-xs font-mono text-zinc-300 mt-2 font-bold">{stats.activeModel}</p>
        </div>
      </div>

      {/* Recent Queries Table */}
      <div className="rounded-2xl bg-[#0d121a] border border-zinc-800/80 p-5 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Bot className="size-4 text-emerald-400" />
          <span>Recent Itinerary Plan Executions</span>
        </h2>

        <div className="divide-y divide-zinc-800/60">
          {queries.map((q, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-200">"{q.query}"</p>
                <p className="text-[10px] font-mono text-zinc-500">{q.timestamp} · {q.tokens} prompt tokens</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {q.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
