import React, { createContext, useContext, useEffect, useState } from 'react';
import { StaffUser } from '@/types/staff';
import { supabase } from '@/lib/supabase/client';
import { mapDatabaseRoleToStaffRole } from '@/lib/permissions/rbac';

interface AuthContextType {
  user: StaffUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  setUser: (user: StaffUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StaffUser | null>(() => {
    const cached = localStorage.getItem('exploretn_staff_user');
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setUser(null);
          localStorage.removeItem('exploretn_staff_user');
          setLoading(false);
          return;
        }

        const email = session.user.email || '';
        // Fetch role from users table in Supabase
        const { data: dbUser } = await supabase
          .from('users')
          .select('id, name, email, role, status')
          .eq('email', email)
          .maybeSingle();

        const staffRole = mapDatabaseRoleToStaffRole(dbUser?.role || '', email);

        if (!staffRole) {
          // User authenticated in Supabase but lacks staff authorization
          await supabase.auth.signOut();
          setUser(null);
          localStorage.removeItem('exploretn_staff_user');
          setLoading(false);
          return;
        }

        const staffUser: StaffUser = {
          id: session.user.id,
          name: dbUser?.name || session.user.user_metadata?.full_name || email.split('@')[0],
          email: email,
          role: staffRole,
          status: 'active',
          department: staffRole.replace('_', ' '),
        };

        setUser(staffUser);
        localStorage.setItem('exploretn_staff_user', JSON.stringify(staffUser));
      } catch (err) {
        console.error('[AuthContext] Session verification failed:', err);
      } finally {
        setLoading(false);
      }
    }

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        localStorage.removeItem('exploretn_staff_user');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut().catch(() => null);
    setUser(null);
    localStorage.removeItem('exploretn_staff_user');
    localStorage.removeItem('exploretn_staff_auth_token');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
