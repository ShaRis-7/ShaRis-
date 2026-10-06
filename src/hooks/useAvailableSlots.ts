import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AvailableSlot, BlockedDate } from '../types';

export function useAvailableSlots(serviceId: string | undefined, year: number, month: number) {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(false);

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const fetchSlots = useCallback(async () => {
    if (!serviceId) return;
    setLoading(true);
    try {
      const [slotsRes, blockedRes] = await Promise.all([
        supabase.from('available_slots').select('*')
          .eq('service_id', serviceId)
          .eq('is_available', true)
          .gte('date', startDate).lte('date', endDate)
          .order('date').order('start_time'),
        supabase.from('blocked_dates').select('*')
          .gte('date', startDate).lte('date', endDate),
      ]);
      setSlots(slotsRes.data ?? []);
      setBlockedDates(blockedRes.data ?? []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [serviceId, startDate, endDate]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  const availableDates = new Set(slots.map(s => s.date));
  const blockedDateSet = new Set(blockedDates.map(b => b.date));
  const getSlotsForDate = (date: string) => slots.filter(s => s.date === date);

  return { slots, availableDates, blockedDateSet, getSlotsForDate, loading, refetch: fetchSlots };
}
