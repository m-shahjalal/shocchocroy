import { dbTableId } from '@/utils/db-utility';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const category = pgTable('category', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }),
  description: varchar('description'),

  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
  deleteAt: timestamp('delete_at'),
});
