'use client';

import { getTestimonials } from '@/lib/apicalls/testimonial';
import { Testimonial } from '@/type/supabase';
import { useEffect, useState } from 'react';


interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

export function useTestimonials(): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTestimonials() {
      try {
        setLoading(true);
        setError(null);

        const data = await getTestimonials({
          signal: controller.signal,
          source: 'client',
        });

        setTestimonials(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Failed to load testimonials');
        }
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();

    return () => controller.abort();
  }, []);

  return {
    testimonials,
    loading,
    error,
  };
}