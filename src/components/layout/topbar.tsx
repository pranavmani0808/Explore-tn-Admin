import React, { useState } from 'react';
import { Menu, Search, Bell, HelpCircle, Shield, ExternalLink, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface TopbarProps {
  onToggleSidebar: () => void;
  breadcrumbs?: string[];
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, breadcrumbs = ['Operations', 'Dashboard'] }) => {
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-[#090d12]/90 backdrop-blur-md border-b border-zinc-800/80">
      {/* Left: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 lg:hidden cursor-pointer"
        >
          <Menu className="size-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">ExploreTN Staff</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className="text-zinc-600">/</span>
              <span className={idx === breadcrumbs.length - 1 ? 'text-emerald-400 font-semibold' : 'text-zinc-400'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-2.5 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search districts, places, events, users, routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 md:hidden"
        >
          <Search className="size-4" />
        </button>

        {/* Notifications */}
        <a
          href="/notifications"
          className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          title="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-500 ring-2 ring-[#090d12]" />
        </a>

        {/* System Health Quick Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYSTEM 100% HEALTHY</span>
        </div>

        {/* Staff User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
          <div className="size-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400">
            {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-zinc-200 leading-tight">{user?.name || 'Admin User'}</p>
            <p className="text-[10px] text-zinc-400 font-mono leading-tight">{user?.role || 'Staff'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
