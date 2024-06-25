"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { LoginValuesType } from "@/validator/login-form-schema";

export const me = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("auth/login");
  return data.user;
};

export async function login(data: LoginValuesType) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) redirect("/error");
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(data: LoginValuesType) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) redirect("/error");
  revalidatePath("/", "layout");
  redirect("/");
}
