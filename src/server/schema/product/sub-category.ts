import { dbTableId } from '@/utils/db';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { category } from './category';
import { product } from './product';

export const subCategory = pgTable('sub_category', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description'),
  parentId: dbTableId('parent_id'),
  productId: dbTableId('product_id'),
});

export const subCategoryRelations = relations(subCategory, ({ one }) => ({
  parent: one(category, {
    fields: [subCategory.parentId],
    references: [category.id],
  }),

  product: one(product, {
    fields: [subCategory.productId],
    references: [product.id],
  }),
}));

export type NewSubCategory = typeof subCategory.$inferInsert;
export type CompleteSubCategory = typeof subCategory.$inferSelect;
