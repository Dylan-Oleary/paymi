import { createClient } from '@paymi/supabase';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_CLIENT_API_KEY,
);
