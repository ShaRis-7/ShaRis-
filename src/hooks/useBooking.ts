import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BookingResult } from '../types';

interface BookingPayload {
  service_id: string;
  slot_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  message: string | null;
}

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);

  async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.from('bookings').insert({
        service_id: payload.service_id,
        slot_id: payload.slot_id,
        client_name: payload.client_name,
        client_email: payload.client_email,
        client_phone: payload.client_phone,
        client_message: payload.message,
        booking_date: '', // filled by trigger or manually
        start_time: '00:00', end_time: '00:00',
        status: 'pending',
      }).select('id').single();

      if (error) throw error;

      // Mark slot as unavailable
      await supabase.from('available_slots').update({ is_available: false }).eq('id', payload.slot_id);

      const r: BookingResult = { success: true, bookingId: data?.id };
      setResult(r);
      return r;
    } catch (err) {
      const msg = err instanceof Error ? err.message : '預約送出失敗，請稍後再試';
      const r: BookingResult = { success: false, error: msg };
      setResult(r);
      return r;
    } finally { setLoading(false); }
  }

  return { submitBooking, loading, result };
}
