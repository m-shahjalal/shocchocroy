import { dbTableId } from '@/utils/db-utility';
import {
    boolean,
    integer,
    pgTable,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

import { order } from './order';

export const promoCode = pgTable('promo_code', {
  id: dbTableId(),
  code: varchar('code', { length: 50 }).notNull(),
  amount: integer('amount').notNull(),
  isPercentage: boolean('is_percentage').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),

  createdBy: dbTableId('created_by'),
  updatedBy: dbTableId('updated_by'),
  deletedBy: dbTableId('deleted_by'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deleteAt: timestamp('delete_at'),
});

export const promoCodeRelations = (promoCode, { many }) => ({
  usedBy: many(order),
});
