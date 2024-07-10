'use server';

import { getAuthenticatedUser } from '@/utils/auth.action';
import { handleError } from '@/utils/handle-error';
import { serverAction } from '@/utils/server-action';
import { ProductSchemaType } from '@/validator/product-form-schema';

import { ProductParams } from '@/types/params';

import { CompleteProduct } from '../schema';
import { Product } from '../service/product.service';

export const getProducts = (params?: ProductParams) => {
  return serverAction(params, async () => await Product.find(params));
};

export const createProduct = async (inputs: ProductSchemaType) => {
  const user = await getAuthenticatedUser();
  if (!user) return handleError({ code: 400, message: 'Bad request' });
  return serverAction(inputs, async () => await Product.create(inputs, user!));
};

export const getProductById = async (id: string) => {
  return serverAction(id, async () => await Product.findOne(id));
};

export const getRecommendedProduct = async () => {
  return serverAction(null, async () => {
    return (await Product.recommended()) as CompleteProduct[];
  });
};

export const updateProduct = async (id: string, inputs: ProductSchemaType) => {
  const user = await getAuthenticatedUser();
  if (!user) return handleError({ code: 400, message: 'Bad Request' });
  return serverAction(id, async () => await Product.update(id, inputs, user!));
};

export const deleteProduct = async (ids: string[]) => {
  const user = await getAuthenticatedUser();
  if (!user) return { code: 400, message: 'Bad Request' };
  return serverAction(ids, async (ids) => {
    return await Product.delete(ids!);
  });
};
