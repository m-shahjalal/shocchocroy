import { dbTableId } from '@/utils/db';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { attribute } from '../attribute';
import { product } from './product';

export const productSku = pgTable('product_sku', {
  id: dbTableId(),
  productId: varchar('product_id').notNull(),
  sku: varchar('sku', { length: 63 }).notNull(),
  quantity: varchar('quantity', { length: 10 }).notNull(),

  sizeAttribute: varchar('size_attribute', { length: 63 }).notNull(),
  colorAttribute: varchar('color_attribute', { length: 63 }).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const productSkuRelations = relations(productSku, ({ one, many }) => ({
  product: one(product, {
    fields: [productSku.productId],
    references: [product.id],
  }),

  size: one(attribute, {
    fields: [productSku.sizeAttribute],
    references: [attribute.id],
  }),

  color: one(attribute, {
    fields: [productSku.colorAttribute],
    references: [attribute.id],
  }),
}));

export type NewProductSKU = typeof productSku.$inferInsert;
export type CompleteProductSKU = typeof productSku.$inferSelect;
