'use server';

import { createClient } from '@/utils/supabase-server';

export const getPublicURL = async (path: string) => {
  const supabase = createClient();
  return supabase.storage.from('shocchocroy').getPublicUrl(path).data.publicUrl;
};
