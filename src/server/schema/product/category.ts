import { dbTableId } from '@/utils/db';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { product } from './product';
import {
  CompleteSubCategory,
  NewSubCategory,
  subCategory,
} from './sub-category';

export const category = pgTable('category', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description'),

  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
  deleteAt: timestamp('delete_at'),
});

export const categoryRelations = relations(category, ({ many }) => ({
  subCategories: many(subCategory),
  product: many(product),
}));

export type CategoryInsert = typeof category.$inferInsert;
export type CategorySelect = typeof category.$inferSelect;

export type NewCategory = CategoryInsert & NewSubCategory;
export type CompleteCategory = CategorySelect & CompleteSubCategory;
