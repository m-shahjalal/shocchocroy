import ProductCard from '@/components/product/cards';
import { ROUTES } from '@/config/routes';
import { buildAPIUrl } from '@/utils/fetcher';

export default async function Home() {
  const response = await fetch(buildAPIUrl(ROUTES.PRODUCT));
  const data = await response.json();
  return <ProductCard products={data} />;
}
