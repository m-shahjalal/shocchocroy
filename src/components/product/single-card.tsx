import { CompleteProduct } from '@/server/schema';
import { cartAtom } from '@/utils/store';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PAGES } from '@/config/pages';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useToast } from '../ui/use-toast';

const SingleCard = ({ data }: { data: CompleteProduct }) => {
  const { toast } = useToast();
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
    toast({
      title: 'Great 🎉',
      description: `Added ${data.title} to cart `,
      variant: 'default',
    });
  };

  return (
    <Card key={data.id}>
      <Link href={PAGES.PRODUCT_DETAIL(data.id!)} prefetch={false}>
        <Image
          src={data.attachment?.link}
          onClick={() => router.push(PAGES.PRODUCT_DETAIL(data.id!))}
          width={4000}
          height={4000}
          alt="Product Image"
          className="aspect-square rounded-t-lg object-cover transition-opacity group-hover:opacity-50"
        />
      </Link>
      <CardContent className="p-4">
        <Link href={PAGES.PRODUCT_DETAIL(data.id!)} prefetch={false}>
          <h3 className="text-lg font-medium">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.description?.slice(0, 100)}...
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
};

export default SingleCard;
