import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { product } from './product';

export const impression = pgTable('impression', {
  id: dbTableId(),
  productId: dbTableId('product_id')
    .references(() => product.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),

  ipAddress: text('ip_address').notNull(),
  clickCount: integer('click_count').notNull().default(1),

  platform: text('platform'),
  browser: text('browser'),
  device: text('device'),
  country: text('country'),
  city: text('city'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const impressionRelations = relations(impression, ({ one }) => ({
  product: one(product, {
    fields: [impression.productId],
    references: [product.id],
  }),
}));

export type ImpressionSelect = typeof impression.$inferSelect;
export type NewImpression = typeof impression.$inferInsert;
