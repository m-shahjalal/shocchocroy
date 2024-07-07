import { db } from '.';
import { category, discount, subCategory } from '../schema';
import { seedCategories } from '../seed/category';
import { seedDiscount } from '../seed/discount';

const main = async () => {
  console.info('🌱    SEEDING STARTED \n');

  try {
    // add here all the seeding functions
    const categories = seedCategories();
    console.info('🚀    Inserting categories...');
    await db.insert(category).values(categories.category).execute();

    console.info('🚀    Inserting sub categories...');
    await db.insert(subCategory).values(categories.subCategory).execute();

    console.info('🚀    Inserting discounts...');
    await db.insert(discount).values(seedDiscount()).execute();

    console.info('\n💯    SUCCESS');
  } catch (error) {
    console.info('❌    🦧 Seeding Failed');
    console.error(error);
  }
};

main().finally(() => process.exit(0));
