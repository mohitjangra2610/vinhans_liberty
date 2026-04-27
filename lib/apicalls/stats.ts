import { fetchFromAPI } from '../api-client';

export interface Stat {
  id: string;
  tenant_id: string;
  icon: string;
  number: string;
  title: string;
  description?: string | null;
  is_active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

type StatPayload = Partial<Stat> & {
  id?: string | number | null;
  icon_name?: string | null;
  label?: string | null;
  value?: string | number | null;
};

interface GetStatsOptions {
  signal?: AbortSignal;
  source?: 'auto' | 'client' | 'server';
}

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

function readString(
  value: unknown,
  fallback = ''
): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return fallback;
}

function normalizeStat(stat: StatPayload): Stat | null {
  if (stat.id === null || stat.id === undefined) {
    return null;
  }

  const number = readString(stat.number ?? stat.value);
  const title = readString(stat.title ?? stat.label);

  if (!number || !title) {
    return null;
  }

  return {
    id: String(stat.id),
    tenant_id:
      typeof stat.tenant_id === 'string'
        ? stat.tenant_id
        : TENANT_ID || '',
    icon: readString(stat.icon ?? stat.icon_name, 'file'),
    number,
    title,
    description:
      typeof stat.description === 'string'
        ? stat.description
        : null,
    is_active: stat.is_active !== false,
    display_order:
      typeof stat.display_order === 'number'
        ? stat.display_order
        : 0,
    created_at:
      typeof stat.created_at === 'string'
        ? stat.created_at
        : undefined,
    updated_at:
      typeof stat.updated_at === 'string'
        ? stat.updated_at
        : undefined,
  };
}

async function fetchStatsFromSupabase(
  signal?: AbortSignal
): Promise<StatPayload[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !apiKey || !TENANT_ID) {
    throw new Error('Missing Supabase stats configuration');
  }

  const url =
    `${supabaseUrl}/rest/v1/stats` +
    `?select=*` +
    `&tenant_id=eq.${TENANT_ID}` +
    `&is_active=eq.true` +
    `&order=display_order.asc`;

  const response = await fetch(url, {
    method: 'GET',
    signal,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
     next: {
      revalidate: 300, // 5 minutes = 300 seconds
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Stats request failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<StatPayload[]>;
}

export async function getStats(
  options: GetStatsOptions = {}
): Promise<Stat[]> {
  const shouldUseServerSource =
    options.source === 'server' ||
    (options.source !== 'client' &&
      typeof globalThis.window === 'undefined');

  const data = shouldUseServerSource
    ? await fetchStatsFromSupabase(options.signal)
    : await fetchFromAPI<StatPayload[]>('/stats', {
        signal: options.signal,
      });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeStat)
    .filter((stat): stat is Stat => stat !== null)
    .sort((left, right) => (left.display_order || 0) - (right.display_order || 0));
}
