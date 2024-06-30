import { dbTableId } from '@/utils/db';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { productSku } from './product/product-sku';

export const attribute = pgTable('product_attribute', {
  id: dbTableId(),
  key: varchar('key', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});

export const attributeRelations = relations(attribute, ({one, many}) => ({
  color: many(productSku),
  size: many(productSku),
}))

export type NewAttribute = typeof attribute.$inferInsert;
export type CompleteAttribute = typeof attribute.$inferSelect;
