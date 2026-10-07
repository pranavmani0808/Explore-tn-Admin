import React, { useState } from 'react';
import { Image, Upload, Eye, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MediaPage: React.FC = () => {
  const assets = [
    { id: 'med-1', name: 'kodaikanal-mist-lake.webp', size: '240 KB', type: 'WEBP', usage: 'Cover / Hero', date: '2026-10-06' },
    { id: 'med-2', name: 'meenakshi-temple-gopuram.webp', size: '480 KB', type: 'WEBP', usage: 'Catalog POI', date: '2026-10-05' },
    { id: 'med-3', name: 'kolli-hills-hairpin-road.webp', size: '320 KB', type: 'WEBP', usage: 'Route Hero', date: '2026-10-04' },
    { id: 'med-4', name: 'dhanushkodi-ocean-view.webp', size: '190 KB', type: 'WEBP', usage: 'Destination Cover', date: '2026-10-03' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Media Asset Library</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Global CDN imagery storage across Tamil Nadu destinations, places, routes, and events.
          </p>
        </div>

        <Button size="sm" className="gap-2">
          <Upload className="size-3.5" />
          <span>Upload Image</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((a) => (
          <div key={a.id} className="p-3.5 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-3">
            <div className="h-32 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
              <Image className="size-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-white truncate">{a.name}</p>
              <p className="text-[10px] font-mono text-emerald-400 mt-0.5">{a.type} · {a.size}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
              <span>{a.usage}</span>
              <span>{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
