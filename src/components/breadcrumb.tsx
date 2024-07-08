import { Fragment } from 'react';
import { cn } from '@/utils/cn';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Breadcrumb = { link?: string; title: string }[];

export default function BreadCRM({ items }: { items: Breadcrumb }) {
  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList className="w-fit px-2 py-1">
        {items.map((breadcrumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem
              className={cn(index === items.length - 1 && 'text-gray-800')}
            >
              {breadcrumb.link ? (
                <BreadcrumbLink href={breadcrumb.link}>
                  {breadcrumb.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
        {items.length > 3 && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
