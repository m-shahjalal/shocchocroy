import { dbTableId } from '@/utils/db-utility';
import { sql } from 'drizzle-orm';
import {
  boolean, index, integer,
  pgTable,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

export const discount = pgTable(
  'discount',
  {
    id: dbTableId(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description'),

    discountPercent: integer('discount_percent').notNull(),
    isActive: boolean('is_active').default(false).notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),

    createdBy: dbTableId('created_by'),
    updatedBy: dbTableId('updated_by'),
    deletedBy: dbTableId('deleted_by'),
  },
  (table) => ({
    searchIndex: index('search_discount').using(
      'gin',
      sql`(
      setweight(to_tsvector('english', ${table.name}), 'A') ||
      setweight(to_tsvector('english', ${table.description}), 'B')
  )`
    ),
  })
);

export type NewDiscount = typeof discount.$inferInsert;
export type CompleteDiscount = typeof discount.$inferSelect;
