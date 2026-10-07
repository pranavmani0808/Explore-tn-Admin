import React, { useState } from 'react';
import { Tag, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: 'cat-1', name: 'Temples & Heritage', slug: 'temples', entityType: 'place', count: 320, status: 'ACTIVE' },
    { id: 'cat-2', name: 'Waterfalls', slug: 'waterfalls', entityType: 'place', count: 145, status: 'ACTIVE' },
    { id: 'cat-3', name: 'Beaches & Coastline', slug: 'beaches', entityType: 'place', count: 98, status: 'ACTIVE' },
    { id: 'cat-4', name: 'Hill Stations & Mist', slug: 'hills', entityType: 'place', count: 86, status: 'ACTIVE' },
    { id: 'cat-5', name: 'Trekking & Wilderness', slug: 'trekking', entityType: 'place', count: 64, status: 'ACTIVE' },
    { id: 'cat-6', name: 'Temple Festivals', slug: 'festival-temple', entityType: 'festival', count: 38, status: 'ACTIVE' },
    { id: 'cat-7', name: 'Group Trips', slug: 'group-trips', entityType: 'event', count: 18, status: 'ACTIVE' },
    { id: 'cat-8', name: 'Culinary Walks', slug: 'food-trail', entityType: 'activity', count: 24, status: 'ACTIVE' },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState('place');
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const item = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: newCatName.trim().toLowerCase().replace(/\s+/g, '-'),
      entityType: newCatType,
      count: 0,
      status: 'ACTIVE',
    };
    setCategories([item, ...categories]);
    setNewCatName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Categories & Taxonomy Hierarchy</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Maintain canonical taxonomy classification tags across places, activities, events, and routes.
          </p>
        </div>
      </div>

      {/* Category Creation Form */}
      <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800/80 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
            Category Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Wildlife Sanctuaries"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
            Taxonomy Scope
          </label>
          <select
            value={newCatType}
            onChange={(e) => setNewCatType(e.target.value)}
            className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none"
          >
            <option value="place">Places Catalog</option>
            <option value="activity">Activities & Adventures</option>
            <option value="event">Events & Festivals</option>
            <option value="route">Road Trips & Routes</option>
          </select>
        </div>

        <Button type="submit" size="sm" className="h-9 gap-1.5 font-bold">
          <Plus className="size-3.5" />
          <span>Add Category</span>
        </Button>
      </form>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 rounded-2xl bg-[#0d121a] border border-zinc-800/80 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-white text-sm">{cat.name}</p>
                <p className="text-[10px] font-mono text-emerald-400 mt-0.5">slug: {cat.slug}</p>
              </div>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {cat.entityType}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 mt-3 border-t border-zinc-800/60 text-xs">
              <span className="text-zinc-400 font-mono text-[11px]">{cat.count} Referenced</span>
              <button
                onClick={() => setDeleteTarget(cat)}
                className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                title="Archive Category"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={`Archive Taxonomy: ${deleteTarget?.name}`}
        description={`Are you sure? Archiving will prevent new entities from selecting "${deleteTarget?.name}". Existing records will be preserved.`}
        onConfirm={() => {
          setCategories(categories.filter((c) => c.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
