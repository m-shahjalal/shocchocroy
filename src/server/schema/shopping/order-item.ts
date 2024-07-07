import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
} from 'drizzle-orm/pg-core';

import { discount } from '../product/discount';
import { product } from '../product/product';
import { order } from './order';

export const orderItem = pgTable('order_item', {
  id: dbTableId(),
  quantity: integer('quantity').default(1).notNull(),
  price: doublePrecision('price').default(0).notNull(),

  productId: dbTableId('product_id')
    .notNull()
    .references(() => product.id, {
      onDelete: 'no action',
      onUpdate: 'no action',
    }),

  orderId: dbTableId('order_id')
    .notNull()
    .references(() => order.id, {
      onDelete: 'no action',
      onUpdate: 'no action',
    }),

  discountId: dbTableId('discount_id').references(() => discount.id, {
    onDelete: 'no action',
    onUpdate: 'no action',
  }),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  product: one(product, {
    fields: [orderItem.productId],
    references: [product.id],
  }),
  discount: one(discount, {
    fields: [orderItem.discountId],
    references: [discount.id],
  }),
  order: one(order, {
    fields: [orderItem.orderId],
    references: [order.id],
  }),
}));
