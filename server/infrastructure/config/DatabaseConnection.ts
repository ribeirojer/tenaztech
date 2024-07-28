import { type SupabaseClient, createClient } from "jsr:@supabase/supabase-js@2";
import "jsr:@std/dotenv/load";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
if (!supabaseUrl) {
	throw new Error("SUPABASE_URL is not defined in .env");
}

const supabaseKey = Deno.env.get("SUPABASE_KEY")!;
if (!supabaseKey) {
	throw new Error("SUPABASE_KEY is not defined in .env");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
