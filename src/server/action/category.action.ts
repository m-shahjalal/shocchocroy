import { serverAction } from '@/utils/server-action';

import { CategoryParams } from '@/types/params';

import { Category } from '../service/category.service';

export const getCategories = async (params?: CategoryParams) => {
  return serverAction(params, () => {
    return Category.find(params);
  });
};

export const getSubCategoryProducts = async (params: {
  category: string;
  subCategory: string;
}) => {
  return serverAction(params, (s) => {
    return Category.subCategoryProducts(s!);
  });
};
