import { dbTableId } from '@/utils/db-utility';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const subCategory = pgTable('sub_category', {
  id: dbTableId(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description'),
  parentId: varchar('parent_id', { length: 63 }),
});
