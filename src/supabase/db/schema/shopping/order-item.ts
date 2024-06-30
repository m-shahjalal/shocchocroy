import { dbTableId } from '@/utils/db-utility';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const orderItem = pgTable('order_item', {
  id: dbTableId(),
  productId: varchar('product_id', { length: 63 }).notNull(),
  orderId: varchar('order_id', { length: 63 }).notNull(),
  quantity: integer('quantity').default(1).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
