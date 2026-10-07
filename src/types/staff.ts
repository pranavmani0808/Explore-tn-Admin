export type StaffRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'CONTENT_MANAGER'
  | 'EVENT_MODERATOR'
  | 'COMMUNITY_MODERATOR'
  | 'ORGANIZER_MANAGER'
  | 'AI_ADMIN'
  | 'ANALYST'
  | 'SUPPORT_AGENT'
  | 'SYSTEM_ADMIN';

export type StaffPermission =
  // Overview
  | 'view_dashboard'
  // Discovery & Geography
  | 'manage_districts'
  | 'manage_places'
  | 'manage_destinations'
  | 'manage_kodai_pois'
  | 'manage_suggestions'
  | 'manage_map_intelligence'
  | 'manage_categories'
  | 'manage_routes'
  // Activities & Experiences
  | 'manage_activities'
  | 'manage_events'
  | 'manage_festivals'
  // AI
  | 'manage_ai_planner'
  | 'manage_ai_config'
  // Data Quality
  | 'view_data_quality'
  // Community & Helpdesk
  | 'manage_users'
  | 'manage_rbac'
  | 'manage_helpdesk'
  | 'manage_reviews'
  // Content & Editorial
  | 'manage_media'
  | 'manage_guides'
  // Analytics & Reports
  | 'view_reports'
  | 'manage_search'
  | 'view_analytics'
  // System & Security
  | 'view_cain_security'
  | 'manage_notifications'
  | 'view_audit_logs'
  | 'manage_system_settings'
  | 'view_system_health';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  avatar?: string;
  department?: string;
  lastLoginAt?: string;
  status: 'active' | 'suspended';
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
