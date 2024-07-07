import { db } from '@/server/db';

export const GET = async () => {
  const result = await db.query.discount.findMany();
  return new Response(JSON.stringify(result));
};
