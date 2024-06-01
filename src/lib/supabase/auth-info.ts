import { createSupabaseClient, supabaseServer } from "./client";

export const getAuthUser = async () => {
  const supabase = supabaseServer();
  return await supabase.auth.getUser();
};

export const logout = async () => {
  const supabase = createSupabaseClient();
  return await supabase.auth.signOut();
};
