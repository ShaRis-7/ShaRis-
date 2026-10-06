import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error: err } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (cancelled) return;
      if (err) { setError(err.message); } else { setServices(data ?? []); }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { services, loading, error };
}
