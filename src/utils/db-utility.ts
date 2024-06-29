import { createId } from '@paralleldrive/cuid2';
import { varchar } from 'drizzle-orm/pg-core';
/**
 * 
 * @param isPrimaryKey is optional boolean value. default value is true, if you don't pass parameter it will be the primary key of the table
 * @returns a string representing unique (primary?) key
 */
export const dbTableId = (isPrimaryKey: boolean = true) => {
  const id = varchar('id', { length: 255 }).$defaultFn(() => createId());
  if (isPrimaryKey) id.primaryKey();
  return id;
};
