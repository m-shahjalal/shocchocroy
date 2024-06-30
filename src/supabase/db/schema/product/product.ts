import { dbTableId } from '@/utils/db-utility';
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
  id: dbTableId(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description').notNull(),
  coverImage: varchar('cover_image', { length: 255 }),

  productId: varchar('product_id', { length: 63 }).notNull(),
  categoryId: varchar('category_id', { length: 63 }).notNull(),
  discountId: varchar('discount_id', { length: 63 }).notNull(),

  price: doublePrecision('price').notNull(),
  stock: integer('quantity').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),

  createdBy: varchar('created_by').notNull(),
  updatedBy: varchar('updated_by'),
  deletedBy: varchar('deleted_by'),
});
