import React, { useState, useMemo } from 'react';
import { getAllDistrictsDetailed, DistrictData } from '@/lib/districts';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle2 } from 'lucide-react';

export const DistrictsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);

  const districtsList = useMemo(() => {
    return getAllDistrictsDetailed().map((d: DistrictData) => ({
      id: d.slug,
      slug: d.slug,
      name: d.name,
      title: d.title,
      region: d.region,
      heroImage: d.heroImage,
      history: d.overview?.history || '',
      spotsCount: d.spots?.length || 0,
      centerCoords: d.centerCoords,
    }));
  }, []);

  const filteredDistricts = useMemo(() => {
    return districtsList.filter((d: any) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.slug.toLowerCase().includes(search.toLowerCase());
      const matchRegion = regionFilter === 'ALL' || d.region.toUpperCase().includes(regionFilter);
      return matchSearch && matchRegion;
    });
  }, [districtsList, search, regionFilter]);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDistricts.slice(start, start + pageSize);
  }, [filteredDistricts, currentPage, pageSize]);

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'District',
      render: (d) => (
        <div>
          <div className="font-bold text-white flex items-center gap-1.5">
            <span>{d.name}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">/{d.slug}</span>
        </div>
      ),
    },
    {
      key: 'region',
      header: 'Region',
      render: (d) => (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
          {d.region}
        </span>
      ),
    },
    {
      key: 'places',
      header: 'Spots / POIs',
      render: (d) => <span className="font-mono font-semibold text-emerald-400">{d.spotsCount} Verified Spots</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <CheckCircle2 className="size-3" />
          <span>PUBLISHED</span>
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (d) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedDistrict(d)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Inspect District Details"
          >
            <Eye className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Tamil Nadu Districts (38)</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Official administrative registry, geographic zones, and coverage status across Tamil Nadu.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={regionFilter}
            onChange={(e) => {
              setRegionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none"
          >
            <option value="ALL">All Regions (38)</option>
            <option value="NORTH">North TN</option>
            <option value="SOUTH">South TN</option>
            <option value="WEST">West / Kongu</option>
            <option value="CENTRAL">Central TN</option>
            <option value="COASTAL">Coastal TN</option>
            <option value="DELTA">Delta Region</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={pagedData}
        totalCount={filteredDistricts.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onSearch={(q) => {
          setSearch(q);
          setCurrentPage(1);
        }}
        searchPlaceholder="Filter district by name..."
      />

      {/* District Detail Drawer / Modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0d121a] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{selectedDistrict.name}</span>
                </h3>
                <p className="text-xs font-mono text-emerald-400 mt-0.5">{selectedDistrict.region} Region</p>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="text-zinc-500 hover:text-white font-mono text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedDistrict.history || 'Administrative district of Tamil Nadu curated in the ExploreTN GIS database.'}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 font-mono text-center">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Verified POIs</div>
                <div className="text-sm font-bold text-white mt-1">{selectedDistrict.spotsCount}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">GIS Coverage</div>
                <div className="text-sm font-bold text-teal-400 mt-1">100% Verified</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedDistrict(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
