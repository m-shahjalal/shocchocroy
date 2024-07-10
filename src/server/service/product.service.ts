import { db } from '@/server/db';
import { getPublicURL } from '@/utils/asset-url';
import { productData } from '@/utils/formatter/product-formatter';
import { createClient } from '@/utils/supabase-server';
import { ProductSchemaType } from '@/validator/product-form-schema';
import { User } from '@supabase/supabase-js';
import {
  and,
  desc,
  eq,
  gte,
  inArray,
  lte,
  sql,
  count as sqlCount,
  SQLWrapper,
} from 'drizzle-orm';

import { ProductParams } from '@/types/params';

import {
  attachment,
  CompleteProduct,
  productInsight as insights,
  product,
} from '../schema';

export const Product = {
  create: async (inputs: ProductSchemaType, user: User) => {
    // format data
    inputs.imageLinks = inputs.imageLinks.map((a: string) => getPublicURL(a));
    const data = productData(user!, inputs);

    // store and return data
    return await db.transaction(async (tnx) => {
      const [result] = await tnx
        .insert(product)
        .values(data.product)
        .returning();
      await tnx.insert(insights).values(data.insights);
      await tnx.insert(attachment).values(data.attachments);
      return result;
    });
  },

  find: async (
    params?: ProductParams
  ): Promise<{ count: number; data: CompleteProduct[] }> => {
    const conditions: SQLWrapper[] = [];
    const size = params?.size || 25;
    const page = params?.page || 1;

    if (params?.category)
      conditions.push(eq(product.categoryId, params?.category));
    if (params?.subcategory)
      conditions.push(eq(product.subCategoryId, params?.subcategory));

    if (params?.minPrice) conditions.push(gte(product.price, params?.minPrice));
    if (params?.maxPrice) conditions.push(lte(product.price, params?.maxPrice));

    if (params?.search)
      conditions.push(sql`(
        setweight(to_tsvector('english', ${product.title}), 'A') ||
        setweight(to_tsvector('english', ${product.description}), 'B'))
        @@ to_tsquery('english', ${params.search}
      )`);

    const [{ count }] = await db
      .select({ count: sqlCount() })
      .from(product)
      .where(and(...conditions));

    const data = await db.query.product.findMany({
      where: () => and(...conditions),
      orderBy: desc(product.createdAt), // TODO: update this with click count
      limit: size,
      offset: (page - 1) * size,
      with: {
        attachment: true,
        category: true,
        discount: true,
        subCategory: true,
      },
    });

    return { data: data as CompleteProduct[], count };
  },

  findOne: async (id: string) => {
    const result = await db.query.product.findFirst({
      where: () => eq(product.id, id),
      with: {
        attachments: true,
        category: true,
        discount: true,
        subCategory: true,
      },
    });

    return result as CompleteProduct;
  },

  update: async (id: string, inputs: ProductSchemaType, user: User) => {
    // TODO: implement update logic
  },

  delete: async (id: string | string[]) => {
    const supabase = createClient();
    if (!Array.isArray(id)) id = [id];

    const attachments = await db
      .select({ link: attachment.link })
      .from(attachment)
      .where(inArray(attachment.attachId, id));

    await supabase.storage
      .from('products')
      .remove(attachments.map(({ link }) => link));

    return await db.transaction(async (tnx) => {
      await tnx.delete(insights).where(inArray(insights.productId, id));
      await tnx.delete(attachment).where(inArray(attachment.attachId, id));

      return await tnx
        .delete(product)
        .where(inArray(product.id, id))
        .returning();
    });
  },

  recommended: async () => {
    return (await db.query.product.findMany({
      with: { attachments: true },
      limit: 6,
    })) as CompleteProduct[];
  },
};
