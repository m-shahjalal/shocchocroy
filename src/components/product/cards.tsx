"use client";

import { Key } from "react";
import SingleCard from "./single-card";

export const ProductCard = ({ products }: { products: any }) => {
  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap">
      {products.map((data: { id: Key | null | undefined }) => (
        <SingleCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default ProductCard;
