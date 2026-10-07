import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Clock } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';

export const HelpdeskPage: React.FC = () => {
  const [tickets, setTickets] = useState([
    { id: 'TKT-1082', user: 'Anand Kumar', email: 'anand.k@gmail.com', category: 'Trip Inquiry', priority: 'HIGH', status: 'OPEN', subject: 'Kodaikanal Weekend Escape Group pickup details', date: '10 mins ago' },
    { id: 'TKT-1081', user: 'Deepa M.', email: 'deepa.m@outlook.com', category: 'Booking Issue', priority: 'MEDIUM', status: 'IN_PROGRESS', subject: 'Receipt download for Chennai Indie Music Night', date: '1 hour ago' },
    { id: 'TKT-1080', user: 'Saravanan S.', email: 'saravanan@yahoo.com', category: 'Feedback', priority: 'LOW', status: 'RESOLVED', subject: 'New road open in Kolli Hills hairpin section', date: '3 hours ago' },
  ]);

  const columns: Column<any>[] = [
    {
      key: 'subject',
      header: 'Ticket ID & Subject',
      render: (t) => (
        <div>
          <p className="font-bold text-white">{t.subject}</p>
          <p className="text-[10px] font-mono text-emerald-400">{t.id} · from {t.user} ({t.email})</p>
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (t) => {
        const colors: Record<string, string> = {
          HIGH: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          LOW: 'bg-zinc-800 text-zinc-300',
        };
        return (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${colors[t.priority] || ''}`}>
            {t.priority}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => (
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
          {t.status}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Time',
      render: (t) => <span className="font-mono text-[11px] text-zinc-400">{t.date}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">User Queries & Support Helpdesk</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Resolve traveler trip inquiries, booking confirmations, and general platform support tickets.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={tickets}
        totalCount={tickets.length}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
      />
    </div>
  );
};
