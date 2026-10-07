import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth/context';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { LoginPage } from '@/modules/auth/login-page';

// Module Pages
import { DashboardPage } from '@/modules/dashboard/dashboard-page';
import { DistrictsPage } from '@/modules/districts/districts-page';
import { DistrictTablesPage } from '@/modules/districts/district-tables-page';
import { PlacesPage } from '@/modules/places/places-page';
import { KodaikanalPage } from '@/modules/places/kodaikanal-page';
import { SuggestionsPage } from '@/modules/suggestions/suggestions-page';
import { MapIntelligencePage } from '@/modules/map-intelligence/map-intelligence-page';
import { CategoriesPage } from '@/modules/categories/categories-page';
import { RoutesPage } from '@/modules/routes/routes-page';
import { ActivitiesPage } from '@/modules/activities/activities-page';
import { EventsPage } from '@/modules/events/events-page';
import { AIPlannerPage } from '@/modules/ai/ai-planner-page';
import { AIConfigPage } from '@/modules/ai/ai-config-page';
import { DataQualityPage } from '@/modules/data-quality/data-quality-page';
import { UsersPage } from '@/modules/users/users-page';
import { HelpdeskPage } from '@/modules/helpdesk/helpdesk-page';
import { ReviewsPage } from '@/modules/reviews/reviews-page';
import { MediaPage } from '@/modules/media/media-page';
import { GuidesPage } from '@/modules/guides/guides-page';
import { ReportsPage } from '@/modules/reports/reports-page';
import { SearchPage } from '@/modules/search/search-page';
import { AnalyticsPage } from '@/modules/analytics/analytics-page';
import { CainSecurityPage } from '@/modules/security/cain-page';
import { NotificationsPage } from '@/modules/notifications/notifications-page';
import { AuditPage } from '@/modules/audit/audit-page';
import { SettingsPage } from '@/modules/settings/settings-page';
import { HealthPage } from '@/modules/health/health-page';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Staff Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 📊 OVERVIEW */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredPermission="view_dashboard" breadcrumbs={['Overview', 'Executive Dashboard']}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 🗺️ DISCOVERY & GEOGRAPHY */}
          <Route
            path="/districts/tables"
            element={
              <ProtectedRoute requiredPermission="manage_districts" breadcrumbs={['Discovery', 'District Tables (38)']}>
                <DistrictTablesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/districts"
            element={
              <ProtectedRoute requiredPermission="manage_districts" breadcrumbs={['Discovery', 'All 38 Districts']}>
                <DistrictsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/places"
            element={
              <ProtectedRoute requiredPermission="manage_places" breadcrumbs={['Discovery', 'Global Places Catalog']}>
                <PlacesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/places/kodaikanal"
            element={
              <ProtectedRoute requiredPermission="manage_kodai_pois" breadcrumbs={['Discovery', 'Kodaikanal POIs']}>
                <KodaikanalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suggestions"
            element={
              <ProtectedRoute requiredPermission="manage_suggestions" breadcrumbs={['Discovery', 'Place Suggestions']}>
                <SuggestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map-intelligence"
            element={
              <ProtectedRoute requiredPermission="manage_map_intelligence" breadcrumbs={['Discovery', 'Map Intelligence']}>
                <MapIntelligencePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute requiredPermission="manage_categories" breadcrumbs={['Discovery', 'Categories & Taxonomy']}>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute requiredPermission="manage_routes" breadcrumbs={['Discovery', 'Routes & Road Trips']}>
                <RoutesPage />
              </ProtectedRoute>
            }
          />

          {/* 🏔️ ACTIVITIES & EXPERIENCES */}
          <Route
            path="/activities"
            element={
              <ProtectedRoute requiredPermission="manage_activities" breadcrumbs={['Experiences', 'Activities & Adventures']}>
                <ActivitiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute requiredPermission="manage_events" breadcrumbs={['Experiences', 'Events & Festivals']}>
                <EventsPage />
              </ProtectedRoute>
            }
          />

          {/* 🤖 AI INTELLIGENCE */}
          <Route
            path="/ai/planner"
            element={
              <ProtectedRoute requiredPermission="manage_ai_planner" breadcrumbs={['AI', 'Planner Operations']}>
                <AIPlannerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai/configuration"
            element={
              <ProtectedRoute requiredPermission="manage_ai_config" breadcrumbs={['AI', 'Configuration & Prompts']}>
                <AIConfigPage />
              </ProtectedRoute>
            }
          />

          {/* 🛡️ DATA QUALITY & INTEGRITY */}
          <Route
            path="/data-quality"
            element={
              <ProtectedRoute requiredPermission="view_data_quality" breadcrumbs={['Data Quality', 'Integrity Center']}>
                <DataQualityPage />
              </ProtectedRoute>
            }
          />

          {/* 👥 COMMUNITY & HELPDESK */}
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredPermission="manage_users" breadcrumbs={['Community', 'Users & RBAC']}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/helpdesk"
            element={
              <ProtectedRoute requiredPermission="manage_helpdesk" breadcrumbs={['Helpdesk', 'User Queries']}>
                <HelpdeskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute requiredPermission="manage_reviews" breadcrumbs={['Community', 'Reviews & Moderation']}>
                <ReviewsPage />
              </ProtectedRoute>
            }
          />

          {/* 📸 CONTENT & EDITORIAL */}
          <Route
            path="/media"
            element={
              <ProtectedRoute requiredPermission="manage_media" breadcrumbs={['Editorial', 'Media Asset Library']}>
                <MediaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides"
            element={
              <ProtectedRoute requiredPermission="manage_guides" breadcrumbs={['Editorial', 'Articles & Guides']}>
                <GuidesPage />
              </ProtectedRoute>
            }
          />

          {/* 📈 ANALYTICS & REPORTS */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute requiredPermission="view_reports" breadcrumbs={['Reports', 'Weekly Digest']}>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute requiredPermission="manage_search" breadcrumbs={['Search', 'Search Management']}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredPermission="view_analytics" breadcrumbs={['Analytics', 'Platform Analytics']}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          {/* ⚙️ SYSTEM & SECURITY */}
          <Route
            path="/security/cain"
            element={
              <ProtectedRoute requiredPermission="view_cain_security" breadcrumbs={['Security', 'CAIN Dashboard']}>
                <CainSecurityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute requiredPermission="manage_notifications" breadcrumbs={['System', 'Notifications']}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute requiredPermission="view_audit_logs" breadcrumbs={['System', 'Audit Logs']}>
                <AuditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute requiredPermission="manage_system_settings" breadcrumbs={['System', 'Settings']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health"
            element={
              <ProtectedRoute requiredPermission="view_system_health" breadcrumbs={['System', 'System Health']}>
                <HealthPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
