import { dbTableId } from '@/utils/db-utility';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const attribute = pgTable('product_attribute', {
  id: dbTableId(),
  key: varchar('key', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
