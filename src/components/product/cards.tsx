'use client';

import { CompleteProduct } from '@/server/schema';

import ProductNotFound from './not-found';
import SingleCard from './single-card';

export const ProductCard = ({ products }: { products: CompleteProduct[] }) => {
  return (
    <div className="grid grid-cols-1 flex-wrap gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((data) => <SingleCard key={data.id} data={data} />) || (
        <ProductNotFound />
      )}
    </div>
  );
};

export default ProductCard;
