export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  price_ntd: number;
  price_original_ntd: number | null;
  category: string;
  location_type: string;
  is_active: boolean;
  sort_order: number;
  details: Record<string, string> | null;
  created_at: string;
}

export interface AvailableSlot {
  id: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface BlockedDate {
  id: string;
  date: string;
  reason: string | null;
}

export type ViewMode = 'grid' | 'list';
export type BookingStep = 'detail' | 'date' | 'time' | 'form' | 'confirmation';

export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}
