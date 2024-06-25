"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export const ProductCard = ({ products }: { products: any }) => {
  console.log("data", products);
  return (
    <div className="p-10 flex gap-6 flex-wrap">
      {products.map((data) => (
        <Card key={data.id} className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>

          <CardContent>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
            veritatis adipisci autem natus dolorem facere ipsa ratione rerum
            distinctio sapiente, excepturi temporibus exercitationem
            necessitatibus molestias quidem, veniam harum optio? Illo.
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
