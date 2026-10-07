export interface DistrictSummary {
  id: string;
  slug: string;
  name: string;
  tamilName?: string;
  region: 'North' | 'South' | 'West' | 'Central' | 'Coastal' | 'Delta';
  headquarters: string;
  areaKm2: number;
  population: string;
  destinationCount: number;
  placeCount: number;
  eventCount: number;
  status: 'published' | 'draft' | 'archived';
  description?: string;
  heroImage?: string;
}

export interface PlaceItem {
  id: string;
  slug: string;
  name: string;
  tamilName?: string;
  districtId: string;
  districtName: string;
  destinationId?: string;
  destinationName?: string;
  category: string;
  lat: number;
  lng: number;
  status: 'published' | 'draft' | 'archived';
  verification: 'verified' | 'unverified' | 'flagged';
  rating?: number;
  reviewCount?: number;
  entryFee?: string;
  timings?: string;
  imageUrl?: string;
  updatedAt: string;
}

export interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  district: string;
  region: string;
  description: string;
  lat: number;
  lng: number;
  heroImage: string;
  categories: string[];
  bestTimeToVisit: string;
  status: 'published' | 'draft' | 'archived';
  placeCount: number;
}

export interface PlaceSuggestion {
  id: string;
  submitterName: string;
  submitterEmail: string;
  placeName: string;
  district: string;
  category: string;
  description: string;
  lat?: number;
  lng?: number;
  status: 'NEW' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
  submittedAt: string;
  notes?: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  category: 'Trip Inquiry' | 'Booking Issue' | 'Bug Report' | 'Feedback' | 'Other';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
  subject: string;
  message: string;
  assignedStaff?: string;
  createdAt: string;
  updatedAt: string;
  internalNotes?: string[];
}

export interface ReviewItem {
  id: string;
  entityType: 'place' | 'destination' | 'event' | 'trip';
  entityName: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  content: string;
  reported: boolean;
  status: 'APPROVED' | 'PENDING' | 'HIDDEN' | 'REMOVED';
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  staffName: string;
  staffEmail: string;
  staffRole: string;
  action: string;
  entity: string;
  entityId: string;
  previousValue?: string;
  newValue?: string;
  ipAddress?: string;
}
