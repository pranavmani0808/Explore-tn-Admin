import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Table,
  Globe,
  Mountain,
  Sparkles,
  Map,
  Tag,
  Compass,
  Bike,
  CalendarDays,
  Bot,
  Sliders,
  ShieldAlert,
  Users,
  HelpCircle,
  Star,
  Image,
  BookOpen,
  FileSpreadsheet,
  Search,
  BarChart3,
  ShieldCheck,
  Bell,
  History,
  Settings,
  Activity,
  LogOut,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { hasPermission } from '@/lib/permissions/rbac';
import { StaffPermission } from '@/types/staff';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  permission?: StaffPermission;
  badge?: string;
  count?: number;
}

interface NavGroup {
  groupName: string;
  icon?: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navGroups: NavGroup[] = [
    {
      groupName: '📊 OVERVIEW',
      items: [
        { name: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard, permission: 'view_dashboard' },
      ],
    },
    {
      groupName: '🗺️ DISCOVERY & GEOGRAPHY',
      items: [
        { name: 'District-Wise Tables (38)', path: '/districts/tables', icon: Table, permission: 'manage_districts', badge: '38' },
        { name: 'All 38 Districts', path: '/districts', icon: Map, permission: 'manage_districts' },
        { name: 'Global Places Catalog', path: '/places', icon: Globe, permission: 'manage_places' },
        { name: 'Kodaikanal POIs', path: '/places/kodaikanal', icon: Mountain, permission: 'manage_kodai_pois', badge: '30 POIs' },
        { name: 'Place Suggestions & Scout Reviews', path: '/suggestions', icon: Sparkles, permission: 'manage_suggestions' },
        { name: 'Map Intelligence & Bounds', path: '/map-intelligence', icon: Map, permission: 'manage_map_intelligence' },
        { name: 'Categories & Taxonomy', path: '/categories', icon: Tag, permission: 'manage_categories' },
        { name: 'Routes & Road Trips', path: '/routes', icon: Compass, permission: 'manage_routes' },
      ],
    },
    {
      groupName: '🏔️ ACTIVITIES & EXPERIENCES',
      items: [
        { name: 'Activities & Adventures', path: '/activities', icon: Bike, permission: 'manage_activities' },
        { name: 'Events & Festivals', path: '/events', icon: CalendarDays, permission: 'manage_events' },
      ],
    },
    {
      groupName: '🤖 AI INTELLIGENCE',
      items: [
        { name: 'AI Planner Operations', path: '/ai/planner', icon: Bot, permission: 'manage_ai_planner' },
        { name: 'AI Configuration & Prompts', path: '/ai/configuration', icon: Sliders, permission: 'manage_ai_config' },
      ],
    },
    {
      groupName: '🛡️ DATA QUALITY & INTEGRITY',
      items: [
        { name: 'Data Quality Center', path: '/data-quality', icon: ShieldAlert, permission: 'view_data_quality' },
      ],
    },
    {
      groupName: '👥 COMMUNITY & HELPDESK',
      items: [
        { name: 'Users & RBAC Matrix', path: '/users', icon: Users, permission: 'manage_users' },
        { name: 'User Queries & Support Helpdesk', path: '/helpdesk', icon: HelpCircle, permission: 'manage_helpdesk' },
        { name: 'Reviews & Moderation', path: '/reviews', icon: Star, permission: 'manage_reviews' },
      ],
    },
    {
      groupName: '📸 CONTENT & EDITORIAL',
      items: [
        { name: 'Media Asset Library', path: '/media', icon: Image, permission: 'manage_media' },
        { name: 'Articles & Travel Guides', path: '/guides', icon: BookOpen, permission: 'manage_guides' },
      ],
    },
    {
      groupName: '📈 ANALYTICS & REPORTS',
      items: [
        { name: 'Weekly Digest & Performance Reports', path: '/reports', icon: FileSpreadsheet, permission: 'view_reports' },
        { name: 'Search Management', path: '/search', icon: Search, permission: 'manage_search' },
        { name: 'Platform Analytics', path: '/analytics', icon: BarChart3, permission: 'view_analytics' },
      ],
    },
    {
      groupName: '⚙️ SYSTEM & SECURITY',
      items: [
        { name: 'CAIN Security Dashboard', path: '/security/cain', icon: ShieldCheck, permission: 'view_cain_security' },
        { name: 'Notifications Center', path: '/notifications', icon: Bell, permission: 'manage_notifications' },
        { name: 'Audit Logs', path: '/audit-logs', icon: History, permission: 'view_audit_logs' },
        { name: 'System Settings', path: '/settings', icon: Settings, permission: 'manage_system_settings' },
        { name: 'System Health Monitor', path: '/system-health', icon: Activity, permission: 'view_system_health' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-[#0d121a] border-r border-zinc-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              TN
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-white">ExploreTN</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500 text-black">
                  Staff
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">Operations Center</p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter((item) => {
              if (!user) return false;
              if (!item.permission) return true;
              return hasPermission(user.role, item.permission);
            });

            if (!visibleItems.length) return null;

            return (
              <div key={group.groupName} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase">
                  {group.groupName}
                </div>
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                            : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="size-4 shrink-0 transition-colors group-hover:text-emerald-400" />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 shrink-0">
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || 'ST'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-200 truncate">{user?.name || 'Staff User'}</p>
                <p className="text-[10px] text-zinc-400 font-mono truncate">{user?.role || 'Staff'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          </div>

          <a
            href="https://explore-tn-ochre.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 mt-2 py-1.5 text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <span>Open Public ExploreTN</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </aside>
    </>
  );
};
