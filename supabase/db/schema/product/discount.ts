import { dbTableId } from '@/utils/db-utility';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const discount = pgTable('discount', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }),
  description: varchar('description'),

  discountPercent: varchar('discount_percent'),
  isActive: boolean('is_active').default(false),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),

  createdBy: varchar('created_by', { length: 63 }),
  updatedBy: varchar('updated_by', { length: 63 }),
  deletedBy: varchar('deleted_by', { length: 63 }),
});
