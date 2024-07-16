import { getCategories } from '@/server/action/category.action';
import { getDiscounts } from '@/server/action/discount.action';

import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { saveFetch } from '@/utils/fetch-formation';

export default async function Page() {
  const breadcrumbItems = [
    { title: 'Product', link: '/dashboard/product' },
    { title: 'Create', link: '/dashboard/product/create' },
  ];

  const categories = await saveFetch(getCategories());
  const discount = await saveFetch(getDiscounts());
  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ProductForm
          discounts={(discount?.data) || []}
          categories={(categories?.data) || []}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
