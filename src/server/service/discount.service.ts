import {
  and,
  desc,
  eq,
  gte,
  lte,
  sql,
  count as sqlCount,
  SQLWrapper,
} from 'drizzle-orm';

import { DiscountParams } from '@/types/params';

import { db } from '../db';
import { CompleteDiscount, discount } from '../schema';

export const Discount = {
  create: async () => {},
  update: async () => {},
  delete: async () => {},

  find: async (
    params?: DiscountParams
  ): Promise<{ count: number; data: CompleteDiscount[] }> => {
    const conditions: SQLWrapper[] = [];
    const size = params?.size || 25;
    const page = params?.page || 1;

    if (params?.minDiscount)
      conditions.push(gte(discount.discountPercent, params?.minDiscount));
    if (params?.maxDiscount)
      conditions.push(lte(discount.discountPercent, params?.maxDiscount));

    if (params?.search)
      conditions.push(sql`(
        setweight(to_tsvector('english', ${discount.name}), 'A') ||
        setweight(to_tsvector('english', ${discount.description}), 'B'))
        @@ to_tsquery('english', ${params.search}
      )`);

    const [{ count }] = await db
      .select({ count: sqlCount() })
      .from(discount)
      .where(and(...conditions));

    const data = await db.query.discount.findMany({
      where: () => and(...conditions),
      orderBy: desc(discount.discountPercent),
      limit: size,
      offset: (page - 1) * size,
    });

    return { data: data as CompleteDiscount[], count };
  },

  findOne: async (id: string) => {
    return await db.query.discount.findFirst({
      where: () => eq(discount.id, id),
    });
  },
};
