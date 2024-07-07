import { createClient } from '@/utils/supabase-server';
import { type NextRequest } from 'next/server';

import { env } from '@/env.mjs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) return new Response(JSON.stringify({ error: 'Invalid file' }));

  const client = createClient();
  const name = `products/product-${new Date().getTime()}`;
  const result = await client.storage.from(env.BUCKET_NAME).upload(name, file);

  return new Response(JSON.stringify({ result }));
}
