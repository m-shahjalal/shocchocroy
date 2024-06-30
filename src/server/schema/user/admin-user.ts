import { dbTableId } from '@/utils/db';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const adminUser = pgTable('admin_user', {
  id: dbTableId(),
  username: varchar('username', { length: 255 }),
  password: varchar('password', { length: 511 }),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  typeId: varchar('type_id', { length: 63 }),
  isActive: boolean('is_active').default(true),

  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
