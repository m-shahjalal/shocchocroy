import { db } from '@/server/db';

export async function GET() {
  const categories = await db.query.category.findMany({
    with: { subCategories: true },
  });
  return new Response(JSON.stringify(categories));
}
