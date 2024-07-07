import { product, productInsight } from '@/server/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const phoneRegex = new RegExp(/^(?:\+88)?0(1[3-9]\d{8}|\d{8})$/);

const productInsightSchema = createInsertSchema(productInsight, {
  supplier: z.object({
    name: z.string().max(63),
    company: z.string().min(3),
    address: z.string().min(6),
    phone: z.string().regex(phoneRegex, 'Invalid Number'),
    email: z.string().email(),
    others: z.string().optional(),
  }),
}).pick({
  notes: true,
  productCost: true,
  standardLevel: true,
  supplier: true,
});

export const productSchema = createInsertSchema(product)
  .extend({
    insights: productInsightSchema,
    imageLinks: z.array(z.string()).min(1, 'Image is required'),
  })
  .pick({
    title: true,
    description: true,
    categoryId: true,
    discountId: true,
    subCategoryId: true,
    price: true,
    stock: true,
    size: true,
    color: true,
    remark: true,
    insights: true,
    imageLinks: true,
  });

export type ProductSchemaType = z.infer<typeof productSchema>;
