import React, { useState } from 'react';
import { CalendarDays, Check, X, Eye, AlertCircle, Sparkles } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { getEventsList } from '@/lib/events-data';
import { ConfirmModal } from '@/components/modals/confirm-modal';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState(() => {
    return getEventsList().map((e: any) => ({
      id: e.id,
      title: e.title,
      category: e.category,
      organizer: e.organizer?.name || 'ExploreTN Curated',
      location: e.location?.address || e.location?.district || 'Tamil Nadu',
      date: e.startDate,
      status: 'PUBLISHED',
      registrations: e.groupTripDetails?.availableSeats
        ? `${e.groupTripDetails.totalSeats - e.groupTripDetails.availableSeats}/${e.groupTripDetails.totalSeats} Booked`
        : 'Open Access',
    }));
  });

  const [activeModal, setActiveModal] = useState<{ action: 'approve' | 'reject'; item: any } | null>(null);

  const columns: Column<any>[] = [
    {
      key: 'title',
      header: 'Event / Trip / Festival',
      render: (e) => (
        <div>
          <p className="font-bold text-white">{e.title}</p>
          <p className="text-[10px] font-mono text-zinc-500">{e.location}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (e) => (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
          {e.category}
        </span>
      ),
    },
    {
      key: 'organizer',
      header: 'Host / Organizer',
      render: (e) => <span className="font-mono text-xs text-zinc-300">{e.organizer}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      render: (e) => <span className="font-mono text-xs text-emerald-400">{e.date}</span>,
    },
    {
      key: 'registrations',
      header: 'Capacity',
      render: (e) => <span className="font-mono text-[11px] text-zinc-400">{e.registrations}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (e) => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {e.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (e) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setActiveModal({ action: 'reject', item: e })}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Reject / Suspend Event"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Events & Festivals Moderation</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Review community and organizer submissions, verify festival dates, and audit group trip compliance.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={events}
        totalCount={events.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
        searchPlaceholder="Search events, organizers, or locations..."
      />

      <ConfirmModal
        isOpen={Boolean(activeModal)}
        title="Suspend / Archive Event"
        description={`Are you sure you want to suspend "${activeModal?.item?.title}"? It will immediately disappear from the public events discovery hub.`}
        variant="danger"
        confirmLabel="Confirm Suspension"
        onConfirm={() => {
          setEvents((prev) => prev.filter((e) => e.id !== activeModal?.item?.id));
          setActiveModal(null);
        }}
        onCancel={() => setActiveModal(null)}
      />
    </div>
  );
};
