import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();

const supabaseUrl = env["SUPABASE_URL"]
const supabaseKey = env["SUPABASE_KEY"]

export const supabase = createClient(supabaseUrl, supabaseKey);
