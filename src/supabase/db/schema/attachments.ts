import { dbTableId } from '@/utils/db-utility';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const attachment = pgTable('attachment', {
  id: dbTableId(),
  link: varchar('attachment'),
  attachId: varchar('attach_id'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
