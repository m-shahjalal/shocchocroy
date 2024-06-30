import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

import { env } from '@/env.mjs';

config({ path: '.env' });
export default defineConfig({
  dialect: 'postgresql',
  out: './supabase/migrations',
  schema: './supabase/db/schema/*',
  dbCredentials: { url: env.DATABASE_URL },
});
