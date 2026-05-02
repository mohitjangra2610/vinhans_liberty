import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const service_id = searchParams.get("service_id");

  if (!service_id) {
    return NextResponse.json({ error: "service_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("service_fields")
    .select("id, label, field_key, field_type, placeholder, is_required, options, sort_order")
    .eq("service_id", service_id)
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}