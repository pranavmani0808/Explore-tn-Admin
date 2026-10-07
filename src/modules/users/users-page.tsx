import React, { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/tables/data-table';
import { supabase } from '@/lib/supabase/client';
import { ShieldCheck, UserCheck, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([
    { id: 'usr-1', name: 'Pranav (Super Admin)', email: 'admin@exploretn.com', role: 'SUPER_ADMIN', status: 'ACTIVE', created: '2026-10-03' },
    { id: 'usr-2', name: 'Santhosh Kumar', email: 'santhosh@exploretn.com', role: 'CONTENT_MANAGER', status: 'ACTIVE', created: '2026-10-04' },
    { id: 'usr-3', name: 'Kavitha R.', email: 'kavitha@exploretn.com', role: 'EVENT_MODERATOR', status: 'ACTIVE', created: '2026-10-05' },
    { id: 'usr-4', name: 'Vimal Nathan', email: 'vimal@exploretn.com', role: 'SUPPORT_AGENT', status: 'ACTIVE', created: '2026-10-06' },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const { data } = await supabase.from('users').select('*').limit(20);
        if (data && data.length > 0) {
          const mapped = data.map((u: any) => ({
            id: u.id,
            name: u.name || 'User',
            email: u.email,
            role: (u.role || 'EXPLORER').toUpperCase(),
            status: (u.status || 'ACTIVE').toUpperCase(),
            created: u.created_at ? u.created_at.split('T')[0] : '2026-10-06',
          }));
          setUsers(mapped);
        }
      } catch (err) {
        console.warn('Fallback users display:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Staff / User Profile',
      render: (u) => (
        <div>
          <p className="font-bold text-white">{u.name}</p>
          <p className="text-[10px] font-mono text-zinc-500">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Assigned Role',
      render: (u) => {
        const isSuper = u.role === 'SUPER_ADMIN';
        return (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${isSuper ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
            {u.role}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (u) => (
        <span className="text-[10px] font-mono text-emerald-400 font-bold">
          ● {u.status}
        </span>
      ),
    },
    {
      key: 'created',
      header: 'Created Date',
      render: (u) => <span className="font-mono text-[11px] text-zinc-400">{u.created}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Users & Staff Directory</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Shared Supabase identity accounts with role assignments and privilege controls.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        totalCount={users.length}
        currentPage={1}
        pageSize={10}
        loading={loading}
        onPageChange={() => {}}
      />
    </div>
  );
};
