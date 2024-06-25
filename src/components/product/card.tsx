"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages";

export const ProductCard = ({ products }: { products: any }) => {
  return (
    <div className="p-10 flex gap-6 flex-wrap">
      {products.map((data: { id: Key; title: string; image: string }) => (
        <Card key={data.id} className="w-[350px] flex flex-col">
          <CardHeader>
            <CardTitle>
              <Link href={`${PAGES.PRODUCTS}/${data.id}`}>{data.title}</Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex-col gap-2 justify-center items-center flex">
            <Image src={data.image} width={200} height={200} alt="product" />
          </CardContent>
          <CardFooter className="flex justify-between self-end">
            <Button>Add To Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
