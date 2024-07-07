import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { productInsight } from './product/product-insight';

export const attribute = pgTable('product_attribute', {
  id: dbTableId(),
  key: varchar('key', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});

export const attributeRelations = relations(attribute, ({ many }) => ({
  color: many(productInsight),
  size: many(productInsight),
}));

export type NewAttribute = typeof attribute.$inferInsert;
export type CompleteAttribute = typeof attribute.$inferSelect;
