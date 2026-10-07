import React, { useState } from 'react';
import { Bike, Plus, Edit, Trash2 } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';

export const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState([
    { id: 'act-1', name: 'Scuba Diving at Rameswaram Pamban', destination: 'Rameswaram', category: 'Watersports', difficulty: 'Easy', duration: '2–3 Hours', status: 'ACTIVE' },
    { id: 'act-2', name: 'Tandem Paragliding at Yelagiri Hills', destination: 'Yelagiri', category: 'Aviation', difficulty: 'Moderate', duration: '1–2 Hours', status: 'ACTIVE' },
    { id: 'act-3', name: 'Off-Road Ghat Drive: Kolli Hills 70 Bends', destination: 'Kolli Hills', category: 'Adventure Drive', difficulty: 'Challenging', duration: 'Full Day', status: 'ACTIVE' },
    { id: 'act-4', name: 'Agasthiyar Falls Wilderness Trek', destination: 'Tirunelveli', category: 'Trekking', difficulty: 'Moderate', duration: '4 Hours', status: 'ACTIVE' },
    { id: 'act-5', name: 'Rock Climbing at Gingee Fort Ramparts', destination: 'Villupuram', category: 'Climbing', difficulty: 'Challenging', duration: '3 Hours', status: 'ACTIVE' },
  ]);

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Adventure Activity',
      render: (a) => (
        <div>
          <p className="font-bold text-white">{a.name}</p>
          <p className="text-[10px] font-mono text-emerald-400">{a.destination} · {a.category}</p>
        </div>
      ),
    },
    {
      key: 'difficulty',
      header: 'Difficulty',
      render: (a) => (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
          {a.difficulty}
        </span>
      ),
    },
    {
      key: 'duration',
      header: 'Estimated Duration',
      render: (a) => <span className="font-mono text-[11px] text-zinc-400">{a.duration}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ACTIVE
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Activities & Adventures</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Catalog outdoor pursuits: paragliding, surfing, wilderness safaris, and rock climbing routes.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={activities}
        totalCount={activities.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
        searchPlaceholder="Search activities by name or destination..."
      />
    </div>
  );
};
