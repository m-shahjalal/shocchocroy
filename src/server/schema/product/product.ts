import { dbTableId } from '@/utils/db';
import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import {
  category,
  CategoryInsert,
  CategorySelect
} from './category';
import { CompleteDiscount, discount, NewDiscount } from './discount';
import { CompleteProductSKU, NewProductSKU, productSku } from './product-sku';
import {
  CompleteSubCategory,
  NewSubCategory,
  subCategory,
} from './sub-category';

export const product = pgTable('product', {
  id: dbTableId(),
  serial: dbTableId('serial').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description').notNull(),

  categoryId: dbTableId('category_id').notNull(),
  discountId: dbTableId('discount_id').notNull(),

  price: doublePrecision('price').notNull(),
  stock: integer('quantity').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),

  createdBy: dbTableId('created_by').notNull(),
  updatedBy: dbTableId('updated_by'),
  deletedBy: dbTableId('deleted_by'),
});

export const productRelations = relations(product, ({ one, many }) => ({
  details: one(productSku, {
    fields: [product.id],
    references: [productSku.productId],
  }),

  discount: many(discount),
  category: one(category),
  subCategory: one(subCategory),
}));

export type ProductInsert = typeof product.$inferInsert;
export type ProductSelect = typeof product.$inferSelect;

export type NewProduct = ProductInsert & {
  discount: NewDiscount;
  category: CategoryInsert;
  details: NewProductSKU;
  subCategory: NewSubCategory;
};
export type CompleteProduct = ProductSelect & {
  discount: CompleteDiscount;
  category: CategorySelect;
  details: CompleteProductSKU;
  subCategory: CompleteSubCategory;
};
