import React from 'react';
import { Search, TrendingUp, AlertCircle } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const topSearches = [
    { query: 'Kodaikanal lake timing', count: 4892, change: '+18%' },
    { query: 'Chithirai festival Madurai', count: 3410, change: '+32%' },
    { query: 'Kolli hills 70 hairpin route', count: 2980, change: '+12%' },
    { query: 'Marina beach sunrise cleanup', count: 1820, change: '+5%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Search Operations & Zero-Result Analytics</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Monitor traveler search queries and identify unfulfilled place or festival searches.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-4">
        <h2 className="text-sm font-bold text-white">Top Search Inquiries This Month</h2>
        <div className="divide-y divide-zinc-800/60 font-mono text-xs">
          {topSearches.map((s, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <span className="text-zinc-200">"{s.query}"</span>
              <div className="flex items-center gap-3">
                <span className="text-zinc-400">{s.count.toLocaleString()} searches</span>
                <span className="text-emerald-400 font-bold">{s.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
