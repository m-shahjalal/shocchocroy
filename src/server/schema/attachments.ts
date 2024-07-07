import { dbTableId } from '@/utils/db-utility';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { product } from './product/product';

export const attachment = pgTable('attachment', {
  id: dbTableId(),
  link: varchar('attachment').notNull(),
  attachId: varchar('attach_id').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const attachmentRelations = relations(attachment, ({ one }) => ({
  product: one(product, {
    fields: [attachment.attachId],
    references: [product.id],
  }),
}));

export type AttachmentSelect = typeof attachment.$inferSelect;
export type AttachmentInsert = typeof attachment.$inferInsert;