import { db } from '@/server/db';
import { product, subCategory as subCategoryModel } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(_req: NextRequest, { params }) {
  const [subCategory] = await db
    .select()
    .from(subCategoryModel)
    .where(eq(subCategoryModel.slug, params.subcategory));

  if (!subCategory?.id) {
    return new Response(JSON.stringify({ status: 404 }));
  }

  const products = await db.query.product.findMany({
    with: { attachments: true },
    where: () => eq(product.subCategoryId, subCategory.id as string),
  });

  return new Response(JSON.stringify(products));
}
