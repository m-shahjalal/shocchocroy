import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Plus } from 'lucide-react';

import { Employee } from '@/config/data';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/product-tables/columns';
import { ProductTable } from '@/components/tables/product-tables/employee-table';

const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ProductPage = async ({ searchParams }: paramsProps) => {
  const totalProducts = 142;
  const page = Number(searchParams.page) || 1;
  const country = searchParams.search || null;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : '')
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const employee: Employee[] = employeeRes.users;
  const pageCount = Math.ceil(totalUsers / pageLimit);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Products (${totalProducts})`}
          description="Manage your products"
        />

        <Link
          href={'/dashboard/employee/new'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />

      <ProductTable
        searchKey="country"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        data={employee}
        pageCount={pageCount}
      />
    </div>
  );
};

export default ProductPage;
