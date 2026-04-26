import { Testimonial } from '@/type/supabase';
import { fetchFromAPI } from '../api-client';

type TestimonialPayload = Partial<Testimonial> & {
  id?: string | number | null;
};

interface GetTestimonialsOptions {
  signal?: AbortSignal;
  source?: 'auto' | 'client' | 'server';
}

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

if (!TENANT_ID) {
  throw new Error('Missing NEXT_PUBLIC_TENANT_ID environment variable');
}

function normalizeTestimonial(
  testimonial: TestimonialPayload
): Testimonial | null {
  if (
    testimonial.id === null ||
    testimonial.id === undefined ||
    typeof testimonial.message !== 'string' ||
    typeof testimonial.full_name !== 'string'
  ) {
    return null;
  }

  return {
    id: String(testimonial.id),
    tenant_id:
      typeof testimonial.tenant_id === 'string'
        ? testimonial.tenant_id
        : TENANT_ID!,
    message: testimonial.message,
    image_url:
      typeof testimonial.image_url === 'string'
        ? testimonial.image_url
        : null,
    full_name: testimonial.full_name,
    star_rating:
      typeof testimonial.star_rating === 'number'
        ? testimonial.star_rating
        : 5,
    is_active: testimonial.is_active !== false,
    display_order:
      typeof testimonial.display_order === 'number'
        ? testimonial.display_order
        : 0,
    created_at:
      typeof testimonial.created_at === 'string'
        ? testimonial.created_at
        : new Date(0).toISOString(),
    updated_at:
      typeof testimonial.updated_at === 'string'
        ? testimonial.updated_at
        : new Date(0).toISOString(),
  };
}

async function fetchTestimonialsFromSupabase(
  signal?: AbortSignal
): Promise<TestimonialPayload[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !apiKey) {
    throw new Error('Missing Supabase credentials');
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/testimonials?tenant_id=eq.${TENANT_ID}&is_active=eq.true&order=display_order.asc`,
    {
      cache: 'no-store',
      signal,
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Supabase testimonials request failed (${response.status})`
    );
  }

  return response.json() as Promise<TestimonialPayload[]>;
}

export async function getTestimonials(
  options: GetTestimonialsOptions = {}
): Promise<Testimonial[]> {
  const shouldUseServerSource =
    options.source === 'server' ||
    (options.source !== 'client' &&
      typeof globalThis.window === 'undefined');

  const data = shouldUseServerSource
    ? await fetchTestimonialsFromSupabase(options.signal)
    : await fetchFromAPI<TestimonialPayload[]>('/testimonials', {
        signal: options.signal,
      });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeTestimonial)
    .filter(
      (testimonial): testimonial is Testimonial => testimonial !== null
    )
    .sort((left, right) => left.display_order - right.display_order);
}