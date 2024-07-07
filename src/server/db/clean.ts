import 'dotenv/config';

import { Pool } from 'pg';

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found in .env');

const main = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const client = await pool.connect();
  console.info('🌱    CLEANING STARTED');

  try {
    // Start transaction
    await client.query('BEGIN');

    // Drop all tables
    const resTables = await client.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `);

    for (const row of resTables.rows) {
      await client.query(`DROP TABLE IF EXISTS "${row.tablename}" CASCADE;`);
    }

    // Drop all enum types
    const resEnums = await client.query(`
      SELECT t.typname AS enum_type
      FROM pg_type t
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public' AND t.typtype = 'e';
    `);

    for (const row of resEnums.rows) {
      await client.query(`DROP TYPE IF EXISTS "${row.enum_type}" CASCADE;`);
    }

    // Drop all sequences
    const resSequences = await client.query(`
      SELECT sequence_name
      FROM information_schema.sequences
      WHERE sequence_schema = 'public';
    `);

    for (const row of resSequences.rows) {
      await client.query(
        `DROP SEQUENCE IF EXISTS "${row.sequence_name}" CASCADE;`
      );
    }

    // Drop all views
    const resViews = await client.query(`
      SELECT table_name
      FROM information_schema.views
      WHERE table_schema = 'public';
    `);

    for (const row of resViews.rows) {
      await client.query(`DROP VIEW IF EXISTS "${row.table_name}" CASCADE;`);
    }

    // Commit transaction
    await client.query('COMMIT');
    console.info('✅    DROP SUCCESS');
  } catch (error) {
    // Rollback transaction in case of error
    await client.query('ROLLBACK');
    console.error('Error clearing database:', error);
  } finally {
    client.release();
  }
};

main().finally(() => process.exit(0));