import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url     = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "https://placeholder.supabase.co";
const anon    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";
const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder";

// Client-side (public)
export const supabase: SupabaseClient = createClient(url, anon);

// Server-side (admin) — only use in API routes / server components
export const supabaseAdmin: SupabaseClient = createClient(url, service, {
  auth: { persistSession: false },
});
