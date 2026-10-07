import React, { useState, useEffect, useMemo } from 'react';
import { DataTable, Column } from '@/components/tables/data-table';
import { supabase } from '@/lib/supabase/client';
import { ShieldCheck, UserCheck, Eye, Edit, Trash2, Plus, Users, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { UserEditorModal } from './user-editor-modal';

const DEFAULT_USERS = [
  { id: 'usr-1', name: 'Pranav (Super Admin)', email: 'admin@exploretn.com', role: 'SUPER_ADMIN', status: 'ACTIVE', created: '2026-10-03' },
  { id: 'usr-2', name: 'Santhosh Kumar', email: 'santhosh@exploretn.com', role: 'CONTENT_MANAGER', status: 'ACTIVE', created: '2026-10-04' },
  { id: 'usr-3', name: 'Kavitha R.', email: 'kavitha@exploretn.com', role: 'EVENT_MODERATOR', status: 'ACTIVE', created: '2026-10-05' },
  { id: 'usr-4', name: 'Vimal Nathan', email: 'vimal@exploretn.com', role: 'SUPPORT_AGENT', status: 'ACTIVE', created: '2026-10-06' },
  { id: 'usr-5', name: 'Ananya Rao', email: 'ananya.rao@gmail.com', role: 'EXPLORER', status: 'ACTIVE', created: '2026-10-06' },
  { id: 'usr-6', name: 'Ramesh Krishnan', email: 'ramesh.trek@gmail.com', role: 'SCOUT', status: 'ACTIVE', created: '2026-10-05' },
];

export const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'staff' | 'users'>('all');
  const [users, setUsers] = useState<any[]>(DEFAULT_USERS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [modalMode, setModalMode] = useState<'user' | 'staff'>('staff');
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('users').select('*').limit(50);
      if (data && data.length > 0) {
        const mapped = data.map((u: any) => ({
          id: u.id,
          name: u.name || 'User',
          email: u.email,
          role: (u.role || 'EXPLORER').toUpperCase(),
          status: (u.status || 'ACTIVE').toUpperCase(),
          created: u.created_at ? u.created_at.split('T')[0] : '2026-10-06',
        }));
        // Merge with staff seeds ensuring admin@exploretn.com is always present
        const combined = [...mapped];
        DEFAULT_USERS.forEach((def) => {
          if (!combined.some((c) => c.email.toLowerCase() === def.email.toLowerCase())) {
            combined.unshift(def);
          }
        });
        setUsers(combined);
      }
    } catch (err) {
      console.warn('Fallback users display:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isStaffRole = (role: string) => {
    return [
      'SUPER_ADMIN',
      'ADMIN',
      'CONTENT_MANAGER',
      'EVENT_MODERATOR',
      'COMMUNITY_MODERATOR',
      'ORGANIZER_MANAGER',
      'AI_ADMIN',
      'ANALYST',
      'SUPPORT_AGENT',
      'SYSTEM_ADMIN',
    ].includes(role);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (activeTab === 'staff') return isStaffRole(u.role);
      if (activeTab === 'users') return !isStaffRole(u.role);
      return true;
    });
  }, [users, search, activeTab]);

  const pagedUsers = useMemo(() => {
    return filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredUsers, page, pageSize]);

  const handleSaveUser = async (formData: any) => {
    try {
      // Upsert into Supabase public.users table
      await supabase.from('users').upsert({
        id: formData.id,
        name: formData.name,
        email: formData.email.toLowerCase().trim(),
        role: formData.role.toLowerCase(),
        status: formData.status.toLowerCase(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });

      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
        );
      } else {
        setUsers((prev) => [formData, ...prev]);
      }
    } catch (err) {
      console.error('Save user error:', err);
      // Still update UI state locally
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
        );
      } else {
        setUsers((prev) => [formData, ...prev]);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;
    try {
      // Soft-delete or update status to suspended
      await supabase
        .from('users')
        .update({ status: 'suspended' })
        .eq('id', deleteTarget.id);

      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    } catch (err) {
      console.warn('Remove user error:', err);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Account Identity',
      render: (u) => (
        <div>
          <p className="font-bold text-white">{u.name}</p>
          <p className="text-[10px] font-mono text-zinc-400">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Privilege Role',
      render: (u) => {
        const isSuper = u.role === 'SUPER_ADMIN';
        const isStaff = isStaffRole(u.role);
        return (
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              isSuper
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : isStaff
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700/60'
            }`}
          >
            {u.role}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => {
        const isActive = u.status === 'ACTIVE';
        return (
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              isActive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
            }`}
          >
            ● {u.status}
          </span>
        );
      },
    },
    {
      key: 'created',
      header: 'Registered',
      render: (u) => <span className="font-mono text-[11px] text-zinc-400">{u.created}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (u) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setEditingUser(u);
              setModalMode(isStaffRole(u.role) ? 'staff' : 'user');
              setIsModalOpen(true);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Edit User Details / Change Role"
          >
            <Edit className="size-3.5" />
          </button>
          {u.email !== 'admin@exploretn.com' && (
            <button
              onClick={() => setDeleteTarget(u)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Remove / Suspend User"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            User & Staff Access Management
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Create, inspect, update roles, or suspend traveler accounts and internal staff operators.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditingUser(null);
              setModalMode('user');
              setIsModalOpen(true);
            }}
            className="gap-1.5 font-bold cursor-pointer"
          >
            <Users className="size-3.5" />
            <span>Add Traveler User</span>
          </Button>

          <Button
            size="sm"
            onClick={() => {
              setEditingUser(null);
              setModalMode('staff');
              setIsModalOpen(true);
            }}
            className="gap-1.5 font-bold cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add Staff Member</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-xs font-mono">
        <button
          onClick={() => {
            setActiveTab('all');
            setPage(1);
          }}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'all' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          All Accounts ({users.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('staff');
            setPage(1);
          }}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'staff' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Staff & Operations ({users.filter((u) => isStaffRole(u.role)).length})
        </button>
        <button
          onClick={() => {
            setActiveTab('users');
            setPage(1);
          }}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'users' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Travelers & Scouts ({users.filter((u) => !isStaffRole(u.role)).length})
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={pagedUsers}
        totalCount={filteredUsers.length}
        currentPage={page}
        pageSize={pageSize}
        loading={loading}
        onPageChange={setPage}
        onSearch={(q) => {
          setSearch(q);
          setPage(1);
        }}
        searchPlaceholder="Search by name, email, or role..."
      />

      {/* User / Staff Editor Modal */}
      <UserEditorModal
        isOpen={isModalOpen}
        initialData={editingUser}
        mode={modalMode}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
      />

      {/* Delete / Suspend Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={`Remove / Suspend Account: ${deleteTarget?.name}`}
        description={`Are you sure you want to remove access for "${deleteTarget?.email}"? The user will be suspended and prevented from authenticating.`}
        variant="danger"
        confirmLabel="Suspend Account"
        onConfirm={handleDeleteUser}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
