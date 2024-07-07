import { dbTableId } from '@/utils/db-utility';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const shoppingSession = pgTable('shopping_session', {
  id: dbTableId(),
  userId: varchar('user_id'),
  totalPrice: varchar('total_price'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
