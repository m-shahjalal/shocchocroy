import { dbTableId } from '@/utils/db';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const paymentMethod = pgTable('payment-method', {
  id: dbTableId(),
  userId: varchar('user_id').notNull(),
  paymentType: varchar('payment_type', { length: 63 }).notNull(),
  provider: varchar('provider', { length: 63 }).notNull(),
  accountNumber: varchar('account_number', { length: 63 }).notNull(),
  default: boolean('default').default(true),
  expiry: timestamp('expiry'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
