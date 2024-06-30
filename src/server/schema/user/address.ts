import { dbTableId } from '@/utils/db';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const address = pgTable('address', {
  id: dbTableId(),
  userId: varchar('user_id', { length: 63 }),
  address1: varchar('address1').notNull(),
  address2: varchar('address2'),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  zipCode: varchar('zip_code', { length: 255 }).notNull(),
  country: varchar('country', { length: 255 }).default('bd').notNull(),
  primaryAddress: boolean('primary_address').default(true),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
