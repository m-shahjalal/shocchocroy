import * as schema from '@/server/schema';
import { createId } from '@paralleldrive/cuid2';
import { config } from 'dotenv';
import { varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env' });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

/**
 *
 * @param isPrimaryKey is optional boolean value. default value is true, if you don't pass parameter it will be the primary key of the table
 * @returns a string representing unique (primary?) key
 */
export const dbTableId = (name = 'id', isPrimaryKey: boolean = false) => {
  if (name === 'id') isPrimaryKey = true;
  const id = varchar(name, { length: 63 });
  if (isPrimaryKey) id.$defaultFn(() => createId()).primaryKey();
  return id;
};

export const serialNumber = (): string => {
  const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
  return `SN-${timestamp}-${randomString}`.toUpperCase(); // Combine and return the serial number in uppercase
};
