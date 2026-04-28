const SUPABASE_URL = "https://cthaqxikeuovbvochnqa.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "여기에_너_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);