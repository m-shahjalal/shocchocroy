import { getSubCategoryProducts } from '@/server/action/category.action';
import { saveFetch } from '@/utils/fetch-formation';

import BreadCRM from '@/components/breadcrumb';
import ProductCard from '@/components/product/cards';
import ProductNotFound from '@/components/product/not-found';

export default async function SubCategoryPage({ params }) {
  const data = await saveFetch(
    getSubCategoryProducts({
      category: params.category,
      subCategory: params['sub-category'],
    })
  );

  const upperCase = (i: string) => i.charAt(0).toUpperCase() + i.slice(1);
  const formatter = (str: string) => str.split('-').map(upperCase).join(' ');

  return (
    <>
      <BreadCRM
        items={[
          { title: 'Home', link: '/' },
          { title: formatter(params.category), link: params.category },
          {
            title: formatter(params['sub-category']),
            link: params['sub-category'],
          },
        ]}
      />
      {data?.data.length ? (
        <ProductCard products={data.data} />
      ) : (
        <ProductNotFound />
      )}
    </>
  );
}
