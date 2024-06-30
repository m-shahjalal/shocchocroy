import { getProducts } from '@/server/product-action';

export default async function page() {
  const data = await getProducts();
  return <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">Dashboard</div>;
}
