import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { mapDatabaseRoleToStaffRole } from '@/lib/permissions/rbac';
import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const normEmail = email.trim().toLowerCase();

      // Sign in through shared ExploreTN Supabase Authentication
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: normEmail,
        password: password,
      });

      if (authError || !authData.user) {
        setError(authError?.message || 'Invalid staff credentials. Please verify your email and password.');
        setLoading(false);
        return;
      }

      // Check user role in public.users table
      const { data: dbUser } = await supabase
        .from('users')
        .select('id, name, email, role, status')
        .eq('email', normEmail)
        .maybeSingle();

      const staffRole = mapDatabaseRoleToStaffRole(dbUser?.role || '', normEmail);

      if (!staffRole) {
        // Sign out unauthorized public account immediately
        await supabase.auth.signOut();
        setError(
          'Access Denied: This account is not an authorized ExploreTN Staff or Administrator profile. Public travelers and event organizers must use their respective portals.'
        );
        setLoading(false);
        return;
      }

      const staffUser = {
        id: authData.user.id,
        name: dbUser?.name || authData.user.user_metadata?.full_name || normEmail.split('@')[0],
        email: normEmail,
        role: staffRole,
        status: 'active' as const,
        department: staffRole.replace('_', ' '),
      };

      setUser(staffUser);
      localStorage.setItem('exploretn_staff_user', JSON.stringify(staffUser));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Please provide your staff email address first.');
      return;
    }
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email.trim());
      setForgotSent(true);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to dispatch password recovery email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0e] flex items-center justify-center p-4">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0d121a] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold mb-3 shadow-lg shadow-emerald-500/10">
            TN
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">ExploreTN Staff</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Internal Operations Portal</p>
        </div>

        {/* Informational Notice */}
        <div className="mb-5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed font-mono">
          <strong className="text-zinc-200">RESTRICTED ACCESS:</strong> Authorized staff & administrators only. Traveler & event organizer accounts will be rejected.
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
            <ShieldAlert className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {forgotSent && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2">
            <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
            <span>Password reset instructions dispatched to {email}. Check your inbox.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-2.5 size-4 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="admin@exploretn.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] font-mono text-emerald-400 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-2.5 size-4 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full h-11 text-xs font-bold gap-2 mt-2"
          >
            <span>Sign In to Staff Console</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center text-[10px] font-mono text-zinc-500">
          ExploreTN Platform Architecture · Shared RBAC & Telemetry
        </div>
      </div>
    </div>
  );
};
