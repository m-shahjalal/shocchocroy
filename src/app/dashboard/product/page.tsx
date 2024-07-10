import { getProducts } from '@/server/action/product.action';
import { cn } from '@/utils/cn';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { ProductTable } from '@/components/tables/product-tables/product-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ProductPage = async ({ searchParams }: paramsProps) => {
  const products = await getProducts();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title={`Products (${products.success && products.result.count})`}
          description="Manage your products"
        />

        <Link
          href={'/dashboard/product/new'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />

      <ProductTable
        pageCount={0}
        data={(products.success && products.result.data) || []}
      />
    </div>
  );
};

export default ProductPage;
