import {
  getProductById,
  getRecommendedProduct,
} from '@/server/action/product.action';
import { saveFetch } from '@/utils/fetch-formation';

import ProductDetails from '@/components/product/details';

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await saveFetch(getProductById(slug));
  const recommended = await saveFetch(getRecommendedProduct());

  return <ProductDetails details={product!} recommended={recommended!} />;
};

export default Page;
