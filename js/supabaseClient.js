const SUPABASE_URL = "https://cthaqxikeuovbvochnqa.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_g_zzeSEB4RSi0gKjqrRppA_Sgla45CQ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);