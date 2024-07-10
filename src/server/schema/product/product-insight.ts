import { dbTableId, serialNumber } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import { jsonb, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { standardEnum } from '../enum';
import { product } from './product';

type Supplier = {
  name: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  others: string;
}[];

export const productInsight = pgTable('product_insight', {
  id: dbTableId(),

  productId: dbTableId('product_id')
    .notNull()
    .references(() => product.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  sku: varchar('sku', { length: 63 }).$defaultFn(serialNumber),
  productCost: varchar('product_cost', { length: 63 }).notNull(),
  standardLevel: standardEnum('standard').default('premium').notNull(),

  supplier: jsonb('supplier').$type<Supplier>(),
  notes: text('notes'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const productSkuRelations = relations(productInsight, ({ one }) => ({
  product: one(product, {
    fields: [productInsight.productId],
    references: [product.id],
  }),
}));

export type NewProductInsight = typeof productInsight.$inferInsert;
export type ProductInsightSelect = typeof productInsight.$inferSelect;
export type CompleteProductInsight = ProductInsightSelect & {};
