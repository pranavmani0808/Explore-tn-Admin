import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/context';
import { hasPermission } from '@/lib/permissions/rbac';
import { StaffPermission } from '@/types/staff';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { StaffShell } from './staff-shell';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: StaffPermission;
  breadcrumbs?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  breadcrumbs,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d12] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-zinc-400">Verifying ExploreTN Staff Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    return (
      <StaffShell breadcrumbs={breadcrumbs || ['Access Denied']}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
          <div className="size-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
            <ShieldAlert className="size-8" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">403 — Unauthorized Staff Access</h2>
          <p className="text-xs text-zinc-400 max-w-md mt-2 leading-relaxed">
            Your staff account (<span className="text-emerald-400 font-mono">{user.email}</span>) with role{' '}
            <span className="font-mono text-white uppercase">{user.role}</span> does not hold permission{' '}
            <code className="text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded">{requiredPermission}</code> to access this operations section.
          </p>
          <a
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Dashboard</span>
          </a>
        </div>
      </StaffShell>
    );
  }

  return <StaffShell breadcrumbs={breadcrumbs}>{children}</StaffShell>;
};
