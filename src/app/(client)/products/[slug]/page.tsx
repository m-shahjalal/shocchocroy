import {
  getProductById,
  getRecommendedProduct,
} from '@/server/action/product.action';

import ProductDetails from '@/components/product/details';

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product: any = await getProductById(slug);
  const recommended: any = await getRecommendedProduct();

  return (
    <ProductDetails
      details={product.success && product.result!}
      recommended={recommended.success && recommended.result!}
    />
  );
};

export default Page;
