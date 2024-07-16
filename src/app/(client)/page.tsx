import { getProducts } from '@/server/action/product.action';
import { saveFetch } from '@/utils/fetch-formation';

import ProductCard from '@/components/product/cards';
import ProductNotFound from '@/components/product/not-found';

export default async function Home() {
  const data = await saveFetch(getProducts());

  if (!data?.count) return <ProductNotFound />;
  return <ProductCard products={data?.data || []} />;
}
