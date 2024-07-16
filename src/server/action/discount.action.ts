import { serverAction } from '@/utils/fetch-formation';

import { DiscountParams } from '@/types/params';

import { Discount } from '../service/discount.service';

export const getDiscounts = async (params?: DiscountParams) => {
  return serverAction(Discount.find(params));
};
