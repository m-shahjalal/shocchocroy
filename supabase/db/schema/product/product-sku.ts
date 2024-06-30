import { dbTableId } from '@/utils/db-utility';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const productSku = pgTable('product_sku', {
  id: dbTableId(),
  productId: varchar('product_id').notNull(),
  sku: varchar('sku', { length: 63 }).notNull(),
  price: varchar('price', { length: 15 }).notNull(),
  quantity: varchar('quantity', { length: 10 }).notNull(),

  sizeAttribute: varchar('size_attribute', { length: 63 }).notNull(),
  colorAttribute: varchar('color_attribute', { length: 63 }).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
