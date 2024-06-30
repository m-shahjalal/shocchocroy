import 'dotenv/config';

import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db } from '../db';

async function main() {
  // This will run migrations on the database, skipping the ones already applied
  console.info('🚀    MIGRATION STARTED');
  await migrate(db as any, {
    migrationsFolder: 'supabase/db/migrations',
    migrationsTable: 'drizzle_migrations',
  });
  console.info('✅    MIGRATION COMPLETED');

  console.info('🌱    Closing DB connection...');
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.info('👋    Closing process...');
    process.exit(0);
  });
