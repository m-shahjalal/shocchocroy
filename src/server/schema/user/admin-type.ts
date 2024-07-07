import { dbTableId } from '@/utils/db-utility';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const adminType = pgTable('admin_type', {
  id: dbTableId(),
  type: varchar('type', { length: 633 }),
  permission: varchar('permission', { length: 633 }),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
