import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { attachment, AttachmentSelect } from '../attachments';
import { category, CategorySelect } from './category';
import { CompleteDiscount, discount } from './discount';
import { NewProductInsight, productInsight } from './product-insight';
import { CompleteSubCategory, subCategory } from './sub-category';

export const product = pgTable('product', {
  id: dbTableId(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description').notNull(),

  categoryId: dbTableId('category_id')
    .notNull()
    .references(() => category.id),

  subCategoryId: dbTableId('sub_category_id')
    .notNull()
    .references(() => subCategory.id),

  discountId: dbTableId('discount_id').references(() => discount.id),

  size: varchar('size', { length: 63 }),
  color: varchar('color', { length: 63 }),

  price: doublePrecision('price').notNull(),
  stock: integer('stock').notNull(),
  remark: varchar('remark'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),

  createdBy: dbTableId('created_by').notNull(),
  updatedBy: dbTableId('updated_by'),
  deletedBy: dbTableId('deleted_by'),
});

export const productRelations = relations(product, ({ one, many }) => ({
  discount: one(discount, {
    fields: [product.discountId],
    references: [discount.id],
  }),

  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),

  subCategory: one(subCategory, {
    fields: [product.subCategoryId],
    references: [subCategory.id],
  }),

  insight: one(productInsight, {
    fields: [product.id],
    references: [productInsight.productId],
  }),

  attachments: many(attachment),
}));

export type ProductInsert = typeof product.$inferInsert;
export type ProductSelect = typeof product.$inferSelect;

export type NewProduct = ProductInsert & {
  details: NewProductInsight;
};

export type CompleteProduct = ProductSelect & {
  discount?: CompleteDiscount;
  category: CategorySelect;
  subCategory: CompleteSubCategory;
  attachments: AttachmentSelect[];
};
