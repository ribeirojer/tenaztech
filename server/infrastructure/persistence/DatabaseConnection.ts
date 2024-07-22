import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
