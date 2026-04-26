const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

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

export async function getStats(): Promise<Stat[]> {
  const url =
    `${SUPABASE_URL}/rest/v1/stats` +
    `?select=*` +
    `&tenant_id=eq.${TENANT_ID}` +
    `&is_active=eq.true` +
    `&order=display_order.asc`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const text = await response.text();

  console.log('RAW_RESPONSE:', text);

  if (!response.ok) {
    throw new Error(`Stats fetch failed ${response.status}: ${text}`);
  }

  const data = JSON.parse(text) as Stat[];

  return data;
}