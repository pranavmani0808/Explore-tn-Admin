import React, { useState } from 'react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, X, Clock, Eye } from 'lucide-react';
import { ConfirmModal } from '@/components/modals/confirm-modal';

export const SuggestionsPage: React.FC = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 'sug-1',
      submitterName: 'Ramesh K.',
      submitterEmail: 'ramesh.trek@gmail.com',
      placeName: 'Muthupet Mangrove Boardwalk',
      district: 'Thiruvarur',
      category: 'Forests & Wetlands',
      description: 'Stunning wooden walkway through dense coastal lagoons. Needs official timing update.',
      status: 'NEW',
      submittedAt: '2026-10-06',
    },
    {
      id: 'sug-2',
      submitterName: 'Priya Sundar',
      submitterEmail: 'priya.s@outlook.com',
      placeName: 'Valparai Sholayar Dam Viewpoint',
      district: 'Coimbatore',
      category: 'Viewpoints',
      description: 'Hidden sunset point near tea estates. Great for wildlife photographers.',
      status: 'UNDER_REVIEW',
      submittedAt: '2026-10-05',
    },
    {
      id: 'sug-3',
      submitterName: 'Karthik N.',
      submitterEmail: 'karthik.moto@gmail.com',
      placeName: 'Kolli Hills Masi Periyasamy Kovil Trail',
      district: 'Namakkal',
      category: 'Trekking',
      description: 'Offbeat forest trail above Semmedu, pristine views of eastern ghats.',
      status: 'NEW',
      submittedAt: '2026-10-04',
    },
    {
      id: 'sug-4',
      submitterName: 'Ananya Rao',
      submitterEmail: 'ananya.rao@gmail.com',
      placeName: 'Vattakottai Beach Secret Cove',
      district: 'Kanyakumari',
      category: 'Beaches',
      description: 'Black sand beach patch adjacent to the fort wall. Clean and scenic.',
      status: 'NEW',
      submittedAt: '2026-10-03',
    },
  ]);

  const [activeModal, setActiveModal] = useState<{ action: 'approve' | 'reject'; item: any } | null>(null);

  const handleAction = () => {
    if (!activeModal) return;
    const { action, item } = activeModal;
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === item.id ? { ...s, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : s
      )
    );
    setActiveModal(null);
  };

  const columns: Column<any>[] = [
    {
      key: 'placeName',
      header: 'Suggested Place',
      render: (s) => (
        <div>
          <p className="font-bold text-white">{s.placeName}</p>
          <p className="text-[10px] font-mono text-emerald-400">{s.district} · {s.category}</p>
        </div>
      ),
    },
    {
      key: 'submitter',
      header: 'Scout / Contributor',
      render: (s) => (
        <div>
          <p className="font-medium text-zinc-300">{s.submitterName}</p>
          <p className="text-[10px] font-mono text-zinc-500">{s.submitterEmail}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (s) => {
        const badgeColors: Record<string, string> = {
          NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          UNDER_REVIEW: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          REJECTED: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        };
        return (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColors[s.status] || 'bg-zinc-800 text-zinc-300'}`}>
            {s.status}
          </span>
        );
      },
    },
    {
      key: 'submittedAt',
      header: 'Date',
      render: (s) => <span className="font-mono text-[11px] text-zinc-400">{s.submittedAt}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (s) => (
        <div className="flex items-center justify-end gap-1.5">
          {s.status !== 'APPROVED' && (
            <button
              onClick={() => setActiveModal({ action: 'approve', item: s })}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
              title="Approve & Promote to Database"
            >
              <Check className="size-3.5" />
            </button>
          )}
          {s.status !== 'REJECTED' && (
            <button
              onClick={() => setActiveModal({ action: 'reject', item: s })}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Reject Submission"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Place Suggestions & Scout Reviews</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Review community-submitted places, hidden viewpoints, and verify geospatial accuracy before ingestion.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={suggestions}
        totalCount={suggestions.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
      />

      <ConfirmModal
        isOpen={Boolean(activeModal)}
        title={activeModal?.action === 'approve' ? 'Approve Place Submission' : 'Reject Place Submission'}
        description={
          activeModal?.action === 'approve'
            ? `Are you sure you want to approve "${activeModal?.item.placeName}"? It will be marked verified and staged for the canonical catalog.`
            : `Are you sure you want to reject this place submission?`
        }
        variant={activeModal?.action === 'approve' ? 'primary' : 'danger'}
        confirmLabel={activeModal?.action === 'approve' ? 'Approve & Stage' : 'Reject Submission'}
        onConfirm={handleAction}
        onCancel={() => setActiveModal(null)}
      />
    </div>
  );
};
