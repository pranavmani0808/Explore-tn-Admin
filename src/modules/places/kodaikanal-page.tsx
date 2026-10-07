import React, { useState } from 'react';
import { getAllKodaiPois, KodaiPoiRecord } from '@/lib/kodaikanal-pois';
import { DataTable, Column } from '@/components/tables/data-table';
import { Mountain } from 'lucide-react';

export const KodaikanalPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const pois = getAllKodaiPois();

  const filtered = pois.filter((p: KodaiPoiRecord) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: Column<KodaiPoiRecord>[] = [
    {
      key: 'name',
      header: 'Kodaikanal POI',
      render: (p) => (
        <div>
          <p className="font-bold text-white">{p.name}</p>
          <p className="text-[10px] font-mono text-emerald-400">Palani Hills · {p.elevation}m MSL</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (p) => (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 capitalize">
          {p.category}
        </span>
      ),
    },
    {
      key: 'coordinates',
      header: 'GPS Coordinates',
      render: (p) => (
        <span className="font-mono text-[11px] text-zinc-400">
          {p.latitude?.toFixed(4)}, {p.longitude?.toFixed(4)}
        </span>
      ),
    },
    {
      key: 'timings',
      header: 'Hours',
      render: (p) => <span className="font-mono text-[11px] text-zinc-400">{p.openingHours || '08:00 AM – 06:00 PM'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          CANONICAL 30
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Kodaikanal Master POI Collection (30)</span>
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Specialized curation of the 30 canonical points of interest across the Princess of Hill Stations.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={paged}
        totalCount={filtered.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search Kodaikanal POIs..."
      />
    </div>
  );
};
