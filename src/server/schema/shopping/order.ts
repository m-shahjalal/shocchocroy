import { dbTableId } from '@/utils/db-utility';
import {
  doublePrecision,
  pgTable,
  timestamp
} from 'drizzle-orm/pg-core';

export const order = pgTable('order_details', {
  id: dbTableId(),
  userId: dbTableId('user_id'),
  paymentId: dbTableId('payment_id'),
  promoId: dbTableId('promo_id'),
  total: doublePrecision('total'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
