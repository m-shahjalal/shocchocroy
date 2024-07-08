import { slugify } from '@/utils/slugify';
import { createId } from '@paralleldrive/cuid2';

import { CategoryInsert, NewSubCategory } from '../schema';

const menuItems = [
  {
    name: 'Tangail Tant',
    subCategory: [
      'Cotton',
      'Half Silk',
      'Silk',
      'Semi maslin',
      'Maslin',
      ' Handloom Cotton',
      'Handloom Halfsilk',
      'Tantuj',
    ],
  },
  {
    name: 'Monipuri',
    subCategory: ['Academi Monipuri', 'Handloom Monipuri'],
  },
  {
    name: 'Jamdani',
    subCategory: [' Cotton Jamdani', 'Halfsik Jamdani', 'Silk Jamdani'],
  },
  {
    name: 'Three Pcs',
    subCategory: ['Cotton', 'Silk', 'Batik', 'Embroidery', 'Karchupi'],
  },
];

export const seedCategories = () => {
  const category: CategoryInsert[] = [];
  const subCategory: NewSubCategory[] = [];

  menuItems.forEach(({ name, subCategory: sub }) => {
    const id = createId();
    category.push({
      id,
      name,
      description: '',
      createdAt: new Date(),
      slug: slugify(name),
    });

    sub.forEach((s) => {
      subCategory.push({
        name: s,
        parentId: id,
        description: '',
        slug: slugify(s),
      });
    });
  });

  return { category, subCategory };
};
