import { buildAPIUrl } from '@/utils/fetcher';

import { ROUTES } from '@/config/routes';
import ProductCard from '@/components/product/cards';

export default async function Home() {
  return <ProductCard />;
}
