'use server';

import { getAuthenticatedUser } from '@/utils/auth.action';
import { serverAction } from '@/utils/fetch-formation';
import { handleAPIError } from '@/utils/handle-error';
import { ProductSchemaType } from '@/validator/product-form-schema';

import { ProductParams } from '@/types/params';

import { Product } from '../service/product.service';

export const getProducts = (params?: ProductParams) => {
  return serverAction(Product.find(params));
};

export const createProduct = async (inputs: ProductSchemaType) => {
  const user = await getAuthenticatedUser();
  if (!user) return handleAPIError({ code: 400, message: 'Bad request' });
  return serverAction(Product.create({ inputs, user }));
};

export const getProductById = async (id: string) => {
  return serverAction(Product.findOne(id));
};

export const getRecommendedProduct = async () => {
  return serverAction(Product.recommended());
};

export const updateProduct = async (id: string, inputs: ProductSchemaType) => {
  const user = await getAuthenticatedUser();
  if (!user) return handleAPIError({ code: 400, message: 'Bad Request' });
  return serverAction(Product.update(id, inputs, user!));
};

export const deleteProduct = async (ids: string[]) => {
  const user = await getAuthenticatedUser();
  if (!user) return { code: 400, message: 'Bad Request' };
  return serverAction(Product.delete(ids!));
};
