import {
	createClient,
	SupabaseClient,
} from "https://deno.land/x/supabase/mod.ts";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
