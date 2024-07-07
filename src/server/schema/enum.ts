import { pgEnum } from 'drizzle-orm/pg-core';
import { ValueOf } from 'type-fest';
import { z } from 'zod';

export const standardOptions = ['basic', 'premium', 'deluxe'] as const;
export const standardEnum = pgEnum('standard_level', standardOptions);
export const standardValues = z.enum(standardEnum.enumValues).Enum;
export type StandardType = ValueOf<typeof standardValues>;
