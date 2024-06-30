import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);
const cleanDatabase = async () => {
  try {
    console.info('🌱    CLEANING STARTED');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public';
    `;

    for (const table of tables) {
      await sql`DROP TABLE IF EXISTS ${sql(table.table_name)} CASCADE;`;
      console.info(`⌛    Dropped table ${table.table_name}`);
    }

    console.info('✅    DROP SUCCESS');
    await sql.end();
  } catch (err: any) {
    console.error('💀    Error cleaning database:', err.message);
    await sql.end();
  }
};

cleanDatabase().finally(() => process.exit(1));
