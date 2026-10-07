import React, { useState } from 'react';
import { getAllDistrictsDetailed, DistrictData } from '@/lib/districts';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Table, MapPin, Search } from 'lucide-react';

export const DistrictTablesPage: React.FC = () => {
  const allDistricts = getAllDistrictsDetailed();
  const [selectedSlug, setSelectedSlug] = useState<string>(allDistricts[0]?.slug || 'madurai');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const currentDistrict = allDistricts.find((d: DistrictData) => d.slug === selectedSlug) || allDistricts[0];

  // Derive attractions for selected district from spots
  const spots = (currentDistrict?.spots || []).map((sp: any) => ({
    id: sp.id,
    name: sp.name,
    category: sp.categoryLabel || sp.category,
    rating: sp.rating || 4.7,
    timings: sp.timings || '06:00 AM – 08:30 PM',
    address: sp.address || 'Tamil Nadu',
    verified: sp.verified,
  }));

  const filtered = spots.filter((a: any) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Place / POI Name',
      render: (a) => (
        <div>
          <p className="font-bold text-white">{a.name}</p>
          <p className="text-[10px] font-mono text-zinc-500">{currentDistrict?.name} District</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (a) => (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
          {a.category}
        </span>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (a) => <span className="font-mono font-bold text-amber-400">★ {a.rating.toFixed(1)}</span>,
    },
    {
      key: 'timings',
      header: 'Hours',
      render: (a) => <span className="font-mono text-[11px] text-zinc-400">{a.timings}</span>,
    },
    {
      key: 'status',
      header: 'Verification',
      render: () => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          CANONICAL
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">District-Wise POI Tables</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Direct granular inspections into every place catalogued under each of Tamil Nadu's 38 districts.
        </p>
      </div>

      {/* District Pill Selector */}
      <div className="p-3 rounded-2xl bg-[#0d121a] border border-zinc-800/80">
        <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-2">
          Select District (38 Total):
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {allDistricts.map((d: DistrictData) => (
            <button
              key={d.slug}
              onClick={() => {
                setSelectedSlug(d.slug);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedSlug === d.slug
                  ? 'bg-emerald-500 text-black font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paged}
        totalCount={filtered.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onSearch={(q) => {
          setSearch(q);
          setPage(1);
        }}
        searchPlaceholder={`Search places inside ${currentDistrict?.name}...`}
        emptyMessage={`No specific places registered under ${currentDistrict?.name} yet.`}
      />
    </div>
  );
};
