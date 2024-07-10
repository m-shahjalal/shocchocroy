import { AttachmentInsert, NewProductInsight } from '@/server/schema';
import { ProductInsert } from '@/server/schema/product/product';
import { ProductSchemaType } from '@/validator/product-form-schema';
import { createId } from '@paralleldrive/cuid2';
import { User } from '@supabase/supabase-js';

export const productData = (user: User, inputs: ProductSchemaType) => {
  const productId = inputs.id ?? createId();

  const product: ProductInsert = {
    id: productId,
    description: inputs.description,
    price: inputs.price,
    stock: inputs.stock,
    title: inputs.title,
    discountId: inputs.discountId,
    categoryId: inputs.categoryId,
    subCategoryId: inputs.subCategoryId,
    createdBy: user?.id!,
  };

  const attachments: AttachmentInsert[] = [];

  inputs.imageLinks.forEach((link) => {
    attachments.push({ link, attachId: productId });
  });

  const productInsights: NewProductInsight = {
    ...inputs.insights,
    productId,
    supplier: inputs.insights.supplier as any,
  };
  return { product, insights: productInsights, attachments };
};
