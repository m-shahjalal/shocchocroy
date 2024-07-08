'use client';

import { CompleteProduct } from '@/server/schema';
import { buildAPIUrl } from '@/utils/fetcher';
import { useEffect, useState } from 'react';

import { ROUTES } from '@/config/routes';

import SingleCard from './single-card';

export const ProductCard = ({ products }: { products?: CompleteProduct[] }) => {
  const [state, setState] = useState<any>();
  useEffect(() => {
    fetch(buildAPIUrl(ROUTES.PRODUCT))
      .then((res) => res.json())
      .then((res) => setState(res));
  });

  return (
    <div className="grid grid-cols-1 flex-wrap gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
      {products?.length
        ? products?.map((data) => <SingleCard key={data.id} data={data} />)
        : state?.map((data) => <SingleCard key={data.id} data={data} />)}
    </div>
  );
};

export default ProductCard;
