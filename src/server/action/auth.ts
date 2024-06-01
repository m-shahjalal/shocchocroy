"use server";

import { LoginValuesType } from "@/validator/login-form-schema";
import { supabaseServer } from "@/lib/supabase/client";

export async function login(inputs: LoginValuesType) {
  try {
    const supabase = supabaseServer();
    const result = await supabase.auth.signInWithPassword(inputs);
    return JSON.stringify(result);
  } catch (error) {
    return JSON.stringify({ success: false, data: (error as any).message });
  }
}

export async function signUpWithEmail(inputs: LoginValuesType) {
  try {
    const supabase = supabaseServer();
    const result = await supabase.auth.signUp(inputs);
    return JSON.stringify(result);
  } catch (error: unknown) {
    return JSON.stringify({ success: false, data: (error as any).message });
  }
}
