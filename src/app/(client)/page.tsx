import { getProducts } from '@/server/action/product.action';

import ProductCard from '@/components/product/cards';

export default async function Home() {
  const data = await getProducts();

  return <ProductCard products={(data.success && data.result.data) || []} />;
}
