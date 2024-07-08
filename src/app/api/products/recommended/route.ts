import { db } from '@/server/db';

export const GET = async () => {
  const result = await db.query.product.findMany({
    limit: 6,
    with: { attachments: true },
  });

  return new Response(JSON.stringify(result));
};
