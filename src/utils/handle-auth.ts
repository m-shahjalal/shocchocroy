import { PAGES } from "@/config/pages";
import { createClient } from "@/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();
  return await supabase.auth.signOut();
};

export const me = async () => {
  const supabase = createClient();
  return await supabase.auth.getUser();
};
