import { dbTableId } from '@/utils/db-utility';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const cartItem = pgTable('cart_item', {
  id: dbTableId(),
  sessionId: varchar('session_id', { length: 63 }).notNull(),
  productId: varchar('product_id', { length: 63 }).notNull(),
  quantity: varchar('quantity').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
