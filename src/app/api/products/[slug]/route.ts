import { db } from '@/server/db';
import { product } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export const GET = async (_req: NextRequest, { params }) => {
  const result = await db.query.product.findFirst({
    where: () => eq(product.id, params.slug),
    with: {
      attachments: true,
      discount: true,
      category: true,
      subCategory: true,
    },
  });

  return new Response(JSON.stringify(result));
};
