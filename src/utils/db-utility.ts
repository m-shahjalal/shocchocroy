import { createId } from '@paralleldrive/cuid2';
import { varchar } from 'drizzle-orm/pg-core';

/**
 *
 * @param name is optional string value. default value is `id`,
 * @param isPrimaryKey is optional boolean value default is `false`, but if name is `id` it will be primaryKey,
 * @returns a string representing unique key for storing as `ID` in database
 */
export const dbTableId = (name = 'id', isPrimaryKey: boolean = false) => {
  if (name === 'id') isPrimaryKey = true;
  const id = varchar(name, { length: 63 });
  if (isPrimaryKey) id.$defaultFn(() => createId()).primaryKey();
  return id;
};

export const serialNumber = (): string => {
  const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
  return `SN-${timestamp}-${randomString}`.toUpperCase(); // Combine and return the serial number in uppercase
};
