import { CompleteProduct } from '@/server/schema';
import { cartAtom } from '@/utils/store';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PAGES } from '@/config/pages';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const SingleCard = ({ data }: { data: CompleteProduct }) => {
  const router = useRouter();
  const setCartItem = useSetAtom(cartAtom);

  const handleAddToCart = () => {
    setCartItem((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.data.id === data.id
      );

      if (existingItem) {
        existingItem.quantity++;
        return prevCart;
      }
      return {
        ...prevCart,
        items: [...prevCart.items, { data, quantity: 1 }],
      };
    });
  };

  return (
    <Card key={data.id}>
      <Link href={PAGES.PRODUCT_DETAIL(data.id!)} prefetch={false}>
        <Image
          src={data.attachments?.[0]?.link}
          onClick={() => router.push(PAGES.PRODUCT_DETAIL(data.id!))}
          width={400}
          height={400}
          alt="Product Image"
          className="aspect-square rounded-t-lg object-cover transition-opacity group-hover:opacity-50"
        />
      </Link>
      <CardContent className="p-4">
        <Link href={PAGES.PRODUCT_DETAIL(data.id!)} prefetch={false}>
          <h3 className="text-lg font-medium">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.description.slice(0, 100)}...
          </p>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-semibold">$69.99</div>
          <Button onClick={handleAddToCart} size="sm">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // return (
  //   <Card key={data.id} className="flex flex-col">
  //     <CardHeader>
  //       <CardTitle>
  //         <Link href={`${PAGES.PRODUCTS}/${data.id}`}>{data.title}</Link>
  //       </CardTitle>
  //     </CardHeader>

  //     <CardContent
  //       onClick={() => router.push(PAGES.PRODUCT_DETAIL(data.id!))}
  //       className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2"
  //     >
  //       <Image
  //         className="h-full w-full"
  //         src={data.attachments?.[0].link}
  //         width={200}
  //         height={200}
  //         alt="product"
  //       />
  //     </CardContent>
  //     <CardFooter className="flex justify-between self-end">
  //       <Button>Add To Cart</Button>
  //     </CardFooter>
  //   </Card>
  // );
};

export default SingleCard;
