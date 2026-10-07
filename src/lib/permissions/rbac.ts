import { StaffRole, StaffPermission } from '@/types/staff';

export const ROLE_PERMISSIONS: Record<StaffRole, StaffPermission[]> = {
  SUPER_ADMIN: [
    'view_dashboard',
    'manage_districts',
    'manage_places',
    'manage_destinations',
    'manage_kodai_pois',
    'manage_suggestions',
    'manage_map_intelligence',
    'manage_categories',
    'manage_routes',
    'manage_activities',
    'manage_events',
    'manage_festivals',
    'manage_ai_planner',
    'manage_ai_config',
    'view_data_quality',
    'manage_users',
    'manage_rbac',
    'manage_helpdesk',
    'manage_reviews',
    'manage_media',
    'manage_guides',
    'view_reports',
    'manage_search',
    'view_analytics',
    'view_cain_security',
    'manage_notifications',
    'view_audit_logs',
    'manage_system_settings',
    'view_system_health',
  ],

  ADMIN: [
    'view_dashboard',
    'manage_districts',
    'manage_places',
    'manage_destinations',
    'manage_kodai_pois',
    'manage_suggestions',
    'manage_map_intelligence',
    'manage_categories',
    'manage_routes',
    'manage_activities',
    'manage_events',
    'manage_festivals',
    'view_data_quality',
    'manage_users',
    'manage_helpdesk',
    'manage_reviews',
    'manage_media',
    'manage_guides',
    'view_reports',
    'manage_search',
    'view_analytics',
    'view_cain_security',
    'manage_notifications',
    'view_audit_logs',
    'view_system_health',
  ],

  CONTENT_MANAGER: [
    'view_dashboard',
    'manage_districts',
    'manage_places',
    'manage_destinations',
    'manage_kodai_pois',
    'manage_suggestions',
    'manage_categories',
    'manage_routes',
    'manage_media',
    'manage_guides',
    'view_data_quality',
  ],

  EVENT_MODERATOR: [
    'view_dashboard',
    'manage_events',
    'manage_festivals',
    'manage_activities',
  ],

  COMMUNITY_MODERATOR: [
    'view_dashboard',
    'manage_users',
    'manage_reviews',
    'manage_suggestions',
    'manage_helpdesk',
  ],

  ORGANIZER_MANAGER: [
    'view_dashboard',
    'manage_events',
    'manage_festivals',
    'manage_users',
  ],

  AI_ADMIN: [
    'view_dashboard',
    'manage_ai_planner',
    'manage_ai_config',
    'view_system_health',
  ],

  ANALYST: [
    'view_dashboard',
    'view_analytics',
    'view_reports',
    'manage_search',
  ],

  SUPPORT_AGENT: [
    'view_dashboard',
    'manage_helpdesk',
    'manage_reviews',
  ],

  SYSTEM_ADMIN: [
    'view_dashboard',
    'view_system_health',
    'view_cain_security',
    'manage_notifications',
    'view_audit_logs',
    'manage_system_settings',
  ],
};

export function hasPermission(role: StaffRole, permission: StaffPermission): boolean {
  if (role === 'SUPER_ADMIN') return true;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function mapDatabaseRoleToStaffRole(dbRole: string, email: string): StaffRole | null {
  const normEmail = email.trim().toLowerCase();
  
  // Explicit Super Admin accounts
  if (normEmail === 'admin@exploretn.com' || normEmail === 'admin@explorertn.com') {
    return 'SUPER_ADMIN';
  }

  const role = dbRole?.toUpperCase();
  switch (role) {
    case 'SUPER_ADMIN':
      return 'SUPER_ADMIN';
    case 'ADMIN':
      return 'ADMIN';
    case 'CONTENT_MANAGER':
    case 'CONTENT_EDITOR':
      return 'CONTENT_MANAGER';
    case 'EVENT_MODERATOR':
      return 'EVENT_MODERATOR';
    case 'COMMUNITY_MODERATOR':
    case 'MODERATOR':
      return 'COMMUNITY_MODERATOR';
    case 'ORGANIZER_MANAGER':
      return 'ORGANIZER_MANAGER';
    case 'AI_ADMIN':
      return 'AI_ADMIN';
    case 'ANALYST':
      return 'ANALYST';
    case 'SUPPORT_AGENT':
      return 'SUPPORT_AGENT';
    case 'SYSTEM_ADMIN':
      return 'SYSTEM_ADMIN';
    default:
      // Domain-based staff assignment if email belongs to internal domain
      if (normEmail.endsWith('@exploretn.com') || normEmail.endsWith('@explorertn.com')) {
        return 'ADMIN';
      }
      return null; // Normal public traveler or unauthorized user
  }
}
