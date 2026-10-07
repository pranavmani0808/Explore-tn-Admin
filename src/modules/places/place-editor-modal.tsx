import React, { useState, useEffect } from 'react';
import { X, MapPin, Image, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllDistrictsDetailed } from '@/lib/districts';

interface PlaceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (placeData: any) => void;
  initialData?: any | null;
}

const CATEGORIES = [
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

export const PlaceEditorModal: React.FC<PlaceEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const districts = getAllDistrictsDetailed();

  const [formData, setFormData] = useState({
    name: '',
    tamilName: '',
    district: districts[0]?.name || 'Madurai',
    category: 'Historical',
    lat: 9.9195,
    lng: 78.1193,
    description: '',
    timings: '06:00 AM – 08:30 PM',
    entryFee: 'Free',
    heroImage: '',
    status: 'PUBLISHED',
    verification: 'VERIFIED',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        tamilName: initialData.tamilName || '',
        district: initialData.district || districts[0]?.name || 'Madurai',
        category: initialData.category || 'Historical',
        lat: initialData.lat || parseFloat(initialData.coordinates?.split(',')[0]) || 9.9195,
        lng: initialData.lng || parseFloat(initialData.coordinates?.split(',')[1]) || 78.1193,
        description: initialData.description || '',
        timings: initialData.timings || '06:00 AM – 08:30 PM',
        entryFee: initialData.entryFee || 'Free',
        heroImage: initialData.heroImage || initialData.imageUrl || '',
        status: initialData.status || 'PUBLISHED',
        verification: initialData.verification || 'VERIFIED',
      });
    } else {
      setFormData({
        name: '',
        tamilName: '',
        district: districts[0]?.name || 'Madurai',
        category: 'Historical',
        lat: 9.9195,
        lng: 78.1193,
        description: '',
        timings: '06:00 AM – 08:30 PM',
        entryFee: 'Free',
        heroImage: '',
        status: 'PUBLISHED',
        verification: 'VERIFIED',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave({
      ...formData,
      id: initialData?.id || `pl-${Date.now()}`,
      coordinates: `${formData.lat.toFixed(4)}, ${formData.lng.toFixed(4)}`,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0d121a] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MapPin className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {initialData ? 'Edit Place Details' : 'Add New Place to ExploreTN'}
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                {initialData ? `Updating ${initialData.name}` : 'Register a new point of interest or heritage site'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Place Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Thirumalai Nayakkar Mahal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Tamil Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. திருமலை நாயக்கர் மஹால்"
                value={formData.tamilName}
                onChange={(e) => setFormData({ ...formData, tamilName: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                District (38 TN Districts) *
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {districts.map((d: any) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Primary Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Latitude (GPS decimal) *
              </label>
              <input
                type="number"
                step="any"
                required
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Longitude (GPS decimal) *
              </label>
              <input
                type="number"
                step="any"
                required
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Description & Travel Highlights
            </label>
            <textarea
              rows={3}
              placeholder="Provide historical context, architecture details, and visitor advisory..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Timings / Visiting Hours
              </label>
              <input
                type="text"
                placeholder="e.g. 06:00 AM – 08:30 PM"
                value={formData.timings}
                onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Entry Fee / Tickets
              </label>
              <input
                type="text"
                placeholder="e.g. Free or ₹20 per adult"
                value={formData.entryFee}
                onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Cover Image URL (WebP/CDN)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Catalog Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
              >
                <option value="PUBLISHED">Published (Visible on ExploreTN)</option>
                <option value="DRAFT">Draft / Staged</option>
                <option value="ARCHIVED">Archived / Hidden</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
                Verification Grade
              </label>
              <select
                value={formData.verification}
                onChange={(e) => setFormData({ ...formData, verification: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
              >
                <option value="VERIFIED">Verified Canonical POI</option>
                <option value="COMMUNITY">Scout Contributed</option>
                <option value="UNVERIFIED">Pending Ground Verification</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="font-bold gap-1.5">
              <CheckCircle2 className="size-3.5" />
              <span>{initialData ? 'Update Place' : 'Save Place to Database'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
