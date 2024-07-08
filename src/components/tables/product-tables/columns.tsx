'use client';

import { CompleteProduct } from '@/server/schema';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { CellAction } from './cell-action';

export const columns: ColumnDef<CompleteProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'TITLE',
  },
  {
    accessorKey: 'category.name',
    header: 'CATEGORY',
  },
  {
    accessorKey: 'subCategory.name',
    header: 'SUB CATEGORY',
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
  },
  {
    accessorKey: 'stock',
    header: 'STOCK',
  },
  {
    accessorKey: 'discount.name',
    header: 'DISCOUNT CAMPAIGN',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
