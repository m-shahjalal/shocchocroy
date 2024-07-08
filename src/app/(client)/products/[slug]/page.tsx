import { buildAPIUrl } from '@/utils/fetcher';

import { ROUTES } from '@/config/routes';
import ProductDetails from '@/components/product/details';

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const response = await fetch(buildAPIUrl(ROUTES.SINGLE_PRODUCT(slug)));
  const product = await response.json();

  const recommendRes = await fetch(buildAPIUrl(ROUTES.RECOMMENDED_PRODUCT));
  const reProducts = await recommendRes.json();

  return <ProductDetails details={product} recommended={reProducts} />;
};

export default Page;
