import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '@/env.mjs';

import * as schema from './schema';

export const pool = new Pool({
  connectionString: env.NEXT_PUBLIC_SUPABASE_URL,
});

export const db = drizzle(pool, {
  schema,
  logger: false,
});