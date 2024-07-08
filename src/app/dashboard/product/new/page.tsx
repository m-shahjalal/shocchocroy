import { buildAPIUrl } from '@/utils/fetcher';

import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/config/routes';

export default async function Page() {
  const breadcrumbItems = [
    { title: 'Product', link: '/dashboard/product' },
    { title: 'Create', link: '/dashboard/product/create' },
  ];

  const response = await fetch(buildAPIUrl(ROUTES.CATEGORY));
  const categories = await response.json();
  const discountResponse = await fetch(buildAPIUrl(ROUTES.DISCOUNT));
  const discount = await discountResponse.json();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ProductForm
          discounts={discount}
          categories={categories}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
