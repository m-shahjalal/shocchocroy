import { createClient } from '@/utils/supabase-client';

export const logout = async () => {
  const supabase = createClient();
  return await supabase.auth.signOut();
};

export const me = async () => {
  const supabase = createClient();
  return await supabase.auth.getUser();
};
