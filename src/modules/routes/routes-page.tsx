import React, { useState } from 'react';
import { Compass, Plus, Eye, Trash2, MapPin } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';

export const RoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState([
    {
      id: 'rt-1',
      title: 'Kolli Hills 70 Hairpin Ghats Expedition',
      origin: 'Namakkal',
      destination: 'Semmedu (Kolli Hills)',
      distanceKm: 55,
      duration: '3.5 Hours',
      stops: 6,
      status: 'PUBLISHED',
    },
    {
      id: 'rt-2',
      title: 'East Coast Road (ECR) Coastal Heritage Drive',
      origin: 'Chennai',
      destination: 'Puducherry / Cuddalore',
      distanceKm: 152,
      duration: '4 Hours',
      stops: 8,
      status: 'PUBLISHED',
    },
    {
      id: 'rt-3',
      title: 'Madurai Temple Circuit to Rameswaram Pamban',
      origin: 'Madurai',
      destination: 'Dhanushkodi',
      distanceKm: 190,
      duration: '4.5 Hours',
      stops: 5,
      status: 'PUBLISHED',
    },
    {
      id: 'rt-4',
      title: 'Nilgiris Cloud Trail: Coimbatore to Ooty via Kotagiri',
      origin: 'Coimbatore',
      destination: 'Ooty',
      distanceKm: 88,
      duration: '3.5 Hours',
      stops: 7,
      status: 'PUBLISHED',
    },
  ]);

  const columns: Column<any>[] = [
    {
      key: 'title',
      header: 'Route Itinerary',
      render: (r) => (
        <div>
          <p className="font-bold text-white">{r.title}</p>
          <p className="text-[10px] font-mono text-zinc-500">
            {r.origin} ➔ {r.destination}
          </p>
        </div>
      ),
    },
    {
      key: 'distance',
      header: 'Distance & Duration',
      render: (r) => (
        <span className="font-mono text-[11px] text-zinc-300">
          {r.distanceKm} km · {r.duration}
        </span>
      ),
    },
    {
      key: 'stops',
      header: 'Scenic Stops',
      render: (r) => <span className="font-mono text-emerald-400 font-bold">{r.stops} Waypoints</span>,
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Road Trips & Scenic Routes</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Curate multi-stop driving corridors, hairpin bends, coastal drives, and verified GPS waypoints.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={routes}
        totalCount={routes.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
        searchPlaceholder="Search routes by title or origin..."
      />
    </div>
  );
};
