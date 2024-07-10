import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { CompleteProduct, product } from './product';
import {
  CompleteSubCategory,
  NewSubCategory,
  subCategory,
} from './sub-category';

export const category = pgTable('category', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: varchar('description'),

  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
  deleteAt: timestamp('delete_at'),
});

export const categoryRelations = relations(category, ({ many }) => ({
  subCategories: many(subCategory),
  products: many(product),
}));

export type CategoryInsert = typeof category.$inferInsert;
export type CategorySelect = typeof category.$inferSelect;

export type NewCategory = CategoryInsert & NewSubCategory;
export type CompleteCategory = CategorySelect & {
  subCategories?: CompleteSubCategory[];
  products?: CompleteProduct[];
};
