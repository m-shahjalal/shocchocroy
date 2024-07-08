import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { category } from './category';
import { product } from './product';

export const subCategory = pgTable('sub_category', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: varchar('description'),

  parentId: dbTableId('parent_id')
    .notNull()
    .references(() => category.id, {
      onDelete: 'no action',
      onUpdate: 'no action',
    }),
});

export const subCategoryRelations = relations(subCategory, ({ one }) => ({
  parent: one(category, {
    fields: [subCategory.parentId],
    references: [category.id],
  }),

  product: one(product, {
    fields: [subCategory.id],
    references: [product.subCategoryId],
  }),
}));

export type NewSubCategory = typeof subCategory.$inferInsert;
export type SubCategorySelect = typeof subCategory.$inferSelect;
export type CompleteSubCategory = SubCategorySelect & {};
