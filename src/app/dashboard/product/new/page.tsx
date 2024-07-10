import { getCategories } from '@/server/action/category.action';
import { getDiscounts } from '@/server/action/discount.action';

import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Page() {
  const breadcrumbItems = [
    { title: 'Product', link: '/dashboard/product' },
    { title: 'Create', link: '/dashboard/product/create' },
  ];

  const categories = await getCategories();
  const discount = await getDiscounts();
  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ProductForm
          discounts={(discount.success && discount.result.data) || []}
          categories={(categories.success && categories.result.data) || []}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
