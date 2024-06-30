import {
  CategoryInsert,
  NewDiscount,
  NewProductSKU,
  NewSubCategory,
} from '@/server/schema';
import { NewProduct, ProductInsert } from '@/server/schema/product/product';
import { createId } from '@paralleldrive/cuid2';

import { getAuthenticatedUser } from '../auth.action';
import { serialNumber } from '../db';

export const productData = async (inputs: NewProduct) => {
  const user = await getAuthenticatedUser();

  const categoryId = createId();
  const discountId = createId();
  const productId = createId();

  const product: ProductInsert = {
    id: productId,
    description: inputs.description,
    price: inputs.price,
    stock: inputs.stock,
    title: inputs.title,
    categoryId,
    discountId,
    serial: serialNumber(),
    createdBy: user?.id!,
  };

  const productSku: NewProductSKU = { ...inputs.details, productId };
  const discount: NewDiscount = { ...inputs.discount, id: discountId };
  const category: CategoryInsert = { id: categoryId, ...inputs.category };

  const subCategory: NewSubCategory = {
    ...inputs.subCategory,
    parentId: categoryId,
  };
  return { product, productSku, discount, category, subCategory };
};
