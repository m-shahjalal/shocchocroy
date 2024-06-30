import { createClient } from '@/supabase/client';

export const logout = async () => {
  const supabase = createClient();
  return await supabase.auth.signOut();
};

export const me = async () => {
  const supabase = createClient();
  return await supabase.auth.getUser();
};
