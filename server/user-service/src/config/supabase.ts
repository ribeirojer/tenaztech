import { createClient } from "@supabase/supabase-js";

var supabaseUrl = ""
var supabaseKey = ""

if(process.env.NODE_ENV == 'development') {
    supabaseUrl = process.env.SUPABASE_URL as string
    supabaseKey = process.env.SUPABASE_KEY as string
} else {
    supabaseUrl = process.env.SUPABASE_URL as string
    supabaseKey = process.env.SUPABASE_KEY as string
}

export const supabase = createClient(supabaseUrl, supabaseKey);
