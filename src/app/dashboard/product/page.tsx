import { cn } from '@/utils/cn';
import { buildAPIUrl } from '@/utils/fetcher';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { ProductTable } from '@/components/tables/product-tables/product-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/config/routes';

const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ProductPage = async ({ searchParams }: paramsProps) => {
  const totalProducts = 142;
  const res = await fetch(buildAPIUrl(ROUTES.PRODUCT));
  const products = await res.json();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title={`Products (${totalProducts})`}
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

      <ProductTable pageCount={0} data={products} />
    </div>
  );
};

export default ProductPage;
