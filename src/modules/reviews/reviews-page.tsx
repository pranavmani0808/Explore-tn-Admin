import React, { useState } from 'react';
import { Star, ShieldAlert, Check, Eye } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState([
    { id: 'rev-1', place: 'Meenakshi Amman Temple', user: 'Lakshmi V.', rating: 5, comment: 'Breathtaking architecture and divine aura. Go during morning hours.', reported: false, status: 'APPROVED', date: 'Yesterday' },
    { id: 'rev-2', place: 'Silver Cascade Falls', user: 'Anonymous', rating: 1, comment: 'Spam promotional text link to outside website.', reported: true, status: 'FLAGGED', date: '2 days ago' },
    { id: 'rev-3', place: 'Dhanushkodi Beach', user: 'Vignesh M.', rating: 5, comment: 'Surreal landscape where Indian ocean meets bay of bengal.', reported: false, status: 'APPROVED', date: '3 days ago' },
  ]);

  const columns: Column<any>[] = [
    {
      key: 'place',
      header: 'Reviewed Place / Entity',
      render: (r) => (
        <div>
          <p className="font-bold text-white">{r.place}</p>
          <p className="text-[10px] font-mono text-zinc-500">By {r.user}</p>
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Score',
      render: (r) => <span className="font-mono text-amber-400 font-bold">★ {r.rating}</span>,
    },
    {
      key: 'comment',
      header: 'Review Content',
      render: (r) => <p className="text-xs text-zinc-300 max-w-md truncate">{r.comment}</p>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${r.reported ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
          {r.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Reviews & Content Moderation</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Audit user-submitted ratings, photos, and auto-flag spam or promotional content.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        totalCount={reviews.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
      />
    </div>
  );
};
