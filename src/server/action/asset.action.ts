'use server';

import { createClient } from '@/utils/supabase-server';

export const getPublicURL = async (path: string) => {
  const supabase = createClient();

  const { data } = supabase.storage.from('shocchocroy').getPublicUrl(path);

  console.log(data);
  return data.publicUrl;
};
