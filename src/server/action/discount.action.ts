import { serverAction } from '@/utils/server-action';

import { DiscountParams } from '@/types/params';

import { Discount } from '../service/discount.service';

export const getDiscounts = async (params?: DiscountParams) => {
  return serverAction(params, async () => {
    return await Discount.find(params);
  });
};
