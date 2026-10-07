import React, { useState, useMemo } from 'react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { CANONICAL_PLACES } from '@/lib/canonical-places';
import { Plus, Eye, Edit, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { PlaceEditorModal } from './place-editor-modal';

export const PlacesPage: React.FC = () => {
  const [places, setPlaces] = useState<any[]>(() => {
    return (CANONICAL_PLACES || []).slice(0, 150).map((p: any, idx: number) => ({
      id: p.id || `pl-${idx}`,
      name: p.name || `Place ${idx}`,
      tamilName: p.tamilName || '',
      district: p.district || 'Tamil Nadu',
      category: p.category || 'Historical',
      coordinates: `${p.lat?.toFixed(4) || '10.0000'}, ${p.lng?.toFixed(4) || '78.0000'}`,
      lat: p.lat || 10.0,
      lng: p.lng || 78.0,
      description: p.description || '',
      timings: p.timings || '06:00 AM – 08:30 PM',
      entryFee: p.entryFee || 'Free',
      heroImage: p.heroImage || p.imageUrl || '',
      status: 'PUBLISHED',
      verification: 'VERIFIED',
      updatedAt: '2026-10-06',
    }));
  });

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const categories = [
    'ALL',
    'Temples',
    'Waterfalls',
    'Beaches',
    'Hills',
    'Trekking',
    'Forests',
    'Lakes',
    'Forts',
    'Historical',
    'Wildlife',
    'Adventure',
    'Viewpoints',
    'Caves',
    'Museums',
    'Other',
  ];

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'ALL' || p.category.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchSearch && matchCat;
    });
  }, [places, search, categoryFilter]);

  const paged = useMemo(() => {
    return filtered.slice((page - 1) * pageSize, page * pageSize);
  }, [filtered, page, pageSize]);

  const handleSavePlace = (placeData: any) => {
    if (editingPlace) {
      setPlaces((prev) => prev.map((p) => (p.id === editingPlace.id ? { ...p, ...placeData } : p)));
    } else {
      setPlaces((prev) => [placeData, ...prev]);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Place Name',
      render: (p) => (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white">{p.name}</span>
            {p.tamilName && <span className="text-[10px] text-zinc-500">({p.tamilName})</span>}
          </div>
          <p className="text-[10px] font-mono text-zinc-500">{p.district}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (p) => (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
          {p.category}
        </span>
      ),
    },
    {
      key: 'coordinates',
      header: 'Coordinates',
      render: (p) => <span className="font-mono text-[11px] text-zinc-400">{p.coordinates}</span>,
    },
    {
      key: 'timings',
      header: 'Hours & Fee',
      render: (p) => (
        <div>
          <p className="font-mono text-[11px] text-zinc-300">{p.timings || '06:00 AM – 08:00 PM'}</p>
          <p className="font-mono text-[10px] text-emerald-400">{p.entryFee || 'Free'}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {p.status}
        </span>
      ),
    },
    {
      key: 'verification',
      header: 'Verification',
      render: (p) => (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400">
          {p.verification}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (p) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setEditingPlace(p);
              setIsEditorOpen(true);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Edit Place Details"
          >
            <Edit className="size-3.5" />
          </button>
          <button
            onClick={() => setDeleteTarget(p)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Archive Place"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Global Places Catalog</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Master GIS database of Tamil Nadu points of interest, heritage temples, and natural attractions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <Button
            size="sm"
            onClick={() => {
              setEditingPlace(null);
              setIsEditorOpen(true);
            }}
            className="gap-1.5 font-bold cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add New Place</span>
          </Button>
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
        searchPlaceholder="Search places by name or district..."
      />

      {/* Add / Edit Place Modal */}
      <PlaceEditorModal
        isOpen={isEditorOpen}
        initialData={editingPlace}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingPlace(null);
        }}
        onSave={handleSavePlace}
      />

      {/* Delete / Archive Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={`Archive Place: ${deleteTarget?.name}`}
        description="Are you sure you want to archive this place? It will be removed from the public website while retained safely in the ExploreTN backup logs."
        onConfirm={() => {
          setPlaces((prev) => prev.filter((p) => p.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
