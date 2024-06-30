'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase-server';
import { LoginValuesType } from '@/validator/login-form-schema';
import { User } from '@supabase/supabase-js';

import { PAGES } from '@/config/pages';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';
  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
};

export const getAuthenticatedUser = async (): Promise<User | null> => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ? data.user : null;
};

export async function login(data: LoginValuesType) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) redirect(PAGES.ERROR);
  revalidatePath(PAGES.ROOT, 'layout');
  redirect(PAGES.ROOT);
}

export async function signup(data: LoginValuesType) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) redirect(PAGES.ERROR);
  revalidatePath(PAGES.ROOT, 'layout');
  redirect(PAGES.ROOT);
}

export const googleLogin = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: getURL() },
  });

  if (data.url) redirect(data.url);
  if (error) redirect(PAGES.ERROR);
  
  revalidatePath(PAGES.ROOT, 'layout');
  redirect(PAGES.ROOT);
};

export const logout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) redirect(PAGES.ERROR);
  revalidatePath(PAGES.ROOT, 'layout');
  redirect(PAGES.LOGIN);
};

export const isAuthenticated = async () => {
  const user = await getAuthenticatedUser();
  if (user?.id) return true;
  return false;
};
