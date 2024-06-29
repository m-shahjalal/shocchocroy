import { db } from '.';

const main = async () => {
  console.info('🌱    SEEDING STARTED \n');

  try {
    console.info('🚀    Inserting permissions');
    // add here all the seeding functions

    console.info('\n💯    SUCCESS');
  } catch (error) {
    console.info('❌    🦧 Seeding Failed');
    console.error(error);
  }
};

main().finally(() => process.exit(0));
