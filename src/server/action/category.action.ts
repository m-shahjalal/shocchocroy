import { serverAction } from '@/utils/fetch-formation';

import { CategoryParams } from '@/types/params';

import { Category } from '../service/category.service';

export const getCategories = async (params?: CategoryParams) => {
  return serverAction(Category.find(params));
};

export const getSubCategoryProducts = async (params: {
  category: string;
  subCategory: string;
}) => {
  return serverAction(Category.subCategoryProducts(params));
};
