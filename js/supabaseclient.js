const supabaseUrl = "https://bvuinooyvxlxgcmzwgzh.supabase.co";
const supabaseKey = "sb_publishable_5X--WMuysSQ0pKf7tFw0Ig_mjQiU8_0";
const mySupabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log(mySupabase);
