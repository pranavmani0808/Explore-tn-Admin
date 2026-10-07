import React, { useState } from 'react';
import { BookOpen, Plus, Eye, Edit } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';

export const GuidesPage: React.FC = () => {
  const [guides, setGuides] = useState([
    { id: 'gd-1', title: 'Complete Guide to Kodaikanal: Misty Trails & Colonial Legacy', district: 'Dindigul', words: 2840, status: 'PUBLISHED', date: '2026-10-04' },
    { id: 'gd-2', title: 'Living Chola Temples: Thanjavur, Gangaikonda & Darasuram', district: 'Thanjavur', words: 3400, status: 'PUBLISHED', date: '2026-09-28' },
    { id: 'gd-3', title: 'Road Tripping Tamil Nadu: 70 Hairpin Bends in Kolli Hills', district: 'Namakkal', words: 1950, status: 'PUBLISHED', date: '2026-09-15' },
  ]);

  const columns: Column<any>[] = [
    {
      key: 'title',
      header: 'Article / Travel Guide',
      render: (g) => (
        <div>
          <p className="font-bold text-white">{g.title}</p>
          <p className="text-[10px] font-mono text-emerald-400">{g.district} · {g.words} words</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Editorial Status',
      render: () => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          PUBLISHED
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Published Date',
      render: (g) => <span className="font-mono text-[11px] text-zinc-400">{g.date}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Articles & Travel Guides CMS</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Editorial curation, seasonal travel guide publishing, and deep district background essays.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={guides}
        totalCount={guides.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
      />
    </div>
  );
};
