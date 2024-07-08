import { getPublicURL } from '@/server/action/asset.action';
import { db } from '@/server/db';
import { attachment, product, productInsight } from '@/server/schema';
import { getAuthenticatedUser } from '@/utils/auth.action';
import { productData } from '@/utils/formatter/product-formatter';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const inputs = await req.json();
  const user = await getAuthenticatedUser();
  inputs.imageLinks = await Promise.all(
    inputs.imageLinks.map((a: string) => getPublicURL(a))
  );

  const data = productData(user!, inputs);
  const result = await db.transaction(async (tnx) => {
    const [result] = await tnx.insert(product).values(data.product).returning();
    await tnx.insert(productInsight).values(data.insights);
    await tnx.insert(attachment).values(data.attachments);
    return result;
  });
  return new Response(JSON.stringify(result));
}

export const GET = async () => {
  const products = await db.query.product.findMany({
    with: {
      subCategory: true,
      discount: true,
      category: true,
      attachments: true,
    },
  });
  return new Response(JSON.stringify(products));
};
