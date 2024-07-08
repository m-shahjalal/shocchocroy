import { buildAPIUrl } from '@/utils/fetcher';

import { ROUTES } from '@/config/routes';
import { BreadCRM } from '@/components/breadcrumb';
import ProductCard from '@/components/product/cards';

export default async function SubCategoryPage({ params }) {
  const response = await fetch(buildAPIUrl(ROUTES.PRODUCT));
  const data = await response.json();
  const formatter = (str: string) =>
    str
      .split('-')
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
      .join(' ');

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
      <ProductCard products={data} />;
    </>
  );
}
