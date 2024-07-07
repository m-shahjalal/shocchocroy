import { faker } from '@faker-js/faker';

import { NewDiscount } from '../schema';

export const seedDiscount = () => {
  const discounts: NewDiscount[] = [];
  for (let i = 0; i < 5; i++) {
    discounts.push({
      discountPercent: faker.helpers.rangeToNumber({ min: 4, max: 40 }),
      name: `${faker.commerce.productAdjective()} saree offer.`,
      description: faker.commerce.productDescription(),
    });
  }

  return discounts;
};
