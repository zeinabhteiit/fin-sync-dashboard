import { createClient } from '@supabase/supabase-js';

// Use the environment variables with the VITE_ prefix
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
