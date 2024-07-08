'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CompleteCategory, CompleteDiscount } from '@/server/schema';
import { standardOptions } from '@/server/schema/enum';
import {
  productSchema,
  ProductSchemaType,
} from '@/validator/product-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { PAGES } from '@/config/pages';
import { ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Uploader from '../image-attachments';
import { Card, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';

export const ProductForm = ({
  initialData,
  categories,
  discounts,
}: {
  initialData: null;
  categories: CompleteCategory[];
  discounts: CompleteDiscount[];
}) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
  });

  const categoryId = useWatch({
    control: form.control,
    name: 'categoryId',
  });

  const onSubmit = async (data: ProductSchemaType) => {
    startTransition(async () => {
      try {
        const response = await fetch(ROUTES.PRODUCT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
        router.refresh();
        router.push(PAGES.DASHBOARD.PRODUCTS);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="imageLinks"
          render={() => <Uploader maximum={6} />}
        />
        <Card className="gap-8 p-5 py-8 md:grid md:grid-cols-3">
          <CardTitle className="col-span-3">Details</CardTitle>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="price"
                    type="number"
                    disabled={loading}
                    onChange={(event) =>
                      field.onChange(parseFloat(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Category</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id!}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="subCategoryId"
            control={form.control}
            render={({ field }) => {
              const sub = categories?.find((c: any) => c.id === categoryId);
              return (
                <FormItem>
                  <FormLabel required>Sub Category</FormLabel>
                  <Select
                    disabled={loading || !sub?.id}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select subcategory"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sub?.subCategories.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id!}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="discountId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  defaultValue={field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value || ''}
                        placeholder="Select Campaign"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {discounts.map((discount) => (
                      <SelectItem
                        className="whitespace-nowrap"
                        key={discount.id}
                        value={discount.id!}
                      >
                        {`${discount.discountPercent < 10 ? `0${discount.discountPercent}` : discount.discountPercent}%`}
                        <span className='pl-4'>{discount.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="stock"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Stock</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="stock product"
                    type="number"
                    disabled={loading}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel required>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    disabled={loading}
                    placeholder="Product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* other information */}
        <Card className="gap-8 p-5 py-8 md:grid md:grid-cols-3">
          <CardTitle className="col-span-3">Others Info</CardTitle>

          <FormField
            name="insights.productCost"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Product Cost</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product sourcing cost"
                    type="number"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="insights.standardLevel"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Standard Level</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={standardOptions[1]}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select Standard Level"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {standardOptions.map((std) => (
                      <SelectItem key={std} value={std}>
                        {std}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="insights.notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin note</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Notes"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="gap-8 p-5 py-8 md:grid md:grid-cols-3">
          <CardTitle className="col-span-3">Supplier</CardTitle>
          <FormField
            name="insights.supplier.name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Spokesperson</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    type="text"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="insights.supplier.company"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company"
                    type="text"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="insights.supplier.phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Phone"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="insights.supplier.email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Email"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="insights.supplier.address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Address"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insights.supplier.others"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Additional notes..."
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <div className="flex justify-end space-x-3">
          <Button
            disabled={loading}
            variant="outline"
            className="flex gap-2"
            type="submit"
          >
            <CaretLeftIcon />
            Back
          </Button>
          <Button
            isLoading={loading}
            disabled={loading}
            className="ml-auto"
            type="submit"
          >
            {initialData ? 'Save changes' : 'Create'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
