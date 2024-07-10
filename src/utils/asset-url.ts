import { createClient } from './supabase-server';

export const getPublicURL = (path: string) => {
  const supabase = createClient();
  return supabase.storage.from('shocchocroy').getPublicUrl(path).data.publicUrl;
};

export const getBucketIds = (paths: string[]): string[] => {
  return paths.map((url) => {
    const { pathname } = new URL(url);
    return pathname.replace('/storage/v1/object/public/shocchocroy', '');
  });
};
