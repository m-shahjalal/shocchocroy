import {
  and,
  asc,
  eq,
  getTableColumns,
  isNotNull,
  sql,
  count as sqlCount,
  SQLWrapper,
} from 'drizzle-orm';

import { CategoryParams } from '@/types/params';

import { db } from '../db';
import {
  attachment,
  category,
  CompleteCategory,
  CompleteProduct,
  product,
  subCategory,
} from '../schema';

export const Category = {
  create: async () => {},
  update: async () => {},
  delete: async () => {},

  find: async (
    params?: CategoryParams
  ): Promise<{ count: number; data: CompleteCategory[] }> => {
    const conditions: SQLWrapper[] = [];
    const size = params?.size || 25;
    const page = params?.page || 1;

    if (params?.name) conditions.push(eq(category.name, params?.name));

    if (params?.search)
      conditions.push(sql`(
            setweight(to_tsvector('english', ${category.name}), 'A')
            @@ to_tsquery('english', ${params.search}
          )`);

    const [{ count }] = await db
      .select({ count: sqlCount() })
      .from(category)
      .where(and(...conditions));

    const data = await db.query.category.findMany({
      where: () => and(...conditions),
      orderBy: asc(category.name),
      limit: size,
      offset: (page - 1) * size,
      with: { subCategories: true },
    });

    return { data: data as CompleteCategory[], count };
  },

  findOne: async (id: string) => {
    return await db.query.category.findFirst({
      where: () => eq(category.id, id),
      with: {
        subCategories: true,
        products: true,
      },
    });
  },

  subcategories: async (id: string) => {
    return await db.query.category.findFirst({
      where: () => eq(category.id, id),
      with: {
        subCategories: true,
      },
    });
  },

  products: async (id: string) => {
    return await db.query.category.findMany({
      where: () => eq(category.id, id),
      with: { products: true },
    });
  },

  subCategoryProducts: async (params: {
    category: string;
    subCategory: string;
    size?: number;
    page?: number;
    search?: string;
  }) => {
    const categoryQuery = await db
      .selectDistinctOn([product.id], {
        ...getTableColumns(product),
        attachment: getTableColumns(attachment),
      })
      .from(category)
      .leftJoin(subCategory, eq(subCategory.parentId, category.id))
      .leftJoin(product, eq(product.subCategoryId, subCategory.id))
      .leftJoin(attachment, eq(attachment.attachId, product.id))
      .where(
        and(
          eq(category.slug, params.category),
          eq(subCategory.slug, params.subCategory),
          isNotNull(product.id)
        )
      );
    return { count: 1, data: categoryQuery as unknown as CompleteProduct[] };
  },
};
