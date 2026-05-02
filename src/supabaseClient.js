import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cthaqxikeuovbvochnqa.supabase.co"
const supabaseKey = "sb_publishable_g_zzeSEB4RSi0gKjqrRppA_Sgla45CQ"


export const supabase = createClient(supabaseUrl, supabaseKey)




