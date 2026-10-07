import React, { useState } from 'react';
import { BarChart3, Users, Compass, Calendar, Eye } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30D');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Platform Analytics & Growth</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Aggregated traffic, place engagement, and trip planner metrics across Tamil Nadu.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
          {['7D', '30D', '90D', '1Y'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                timeframe === t ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Monthly Active Travelers</p>
          <p className="text-xl font-bold text-white mt-1">142,800</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Page Views (Tamil Nadu Catalog)</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">840,120</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Saved Itineraries</p>
          <p className="text-xl font-bold text-teal-400 mt-1">19,450</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Avg Engagement Time</p>
          <p className="text-xl font-bold text-cyan-400 mt-1">4m 28s</p>
        </div>
      </div>
    </div>
  );
};
