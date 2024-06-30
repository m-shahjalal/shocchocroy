import { dbTableId } from '@/utils/db-utility';
import {
  doublePrecision,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const orderDetails = pgTable('order_details', {
  id: dbTableId(),
  userId: varchar('user_id', { length: 63 }),
  paymentId: varchar('payment_id', { length: 63 }),
  total: doublePrecision('total'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
