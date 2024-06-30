import { dbTableId } from '@/utils/db';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: dbTableId(),
  username: varchar('username', { length: 255 }),
  email: varchar('email', { length: 255 }),
  password: varchar('password'),
  is_active: boolean('is_active'),

  created_at: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
