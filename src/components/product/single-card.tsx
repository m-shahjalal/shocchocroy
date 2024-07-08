import { CompleteProduct } from '@/server/schema';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PAGES } from '@/config/pages';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const SingleCard = ({ data }: { data: CompleteProduct }) => {
  const router = useRouter();

  return (
    <Card key={data.id} className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <Link href={`${PAGES.PRODUCTS}/${data.id}`}>{data.title}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent
        onClick={() => router.push(PAGES.PRODUCT_DETAIL(data.id!))}
        className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2"
      >
        <Image
          className="h-full w-full"
          src={data.attachments?.[0].link}
          width={200}
          height={200}
          alt="product"
        />
      </CardContent>
      <CardFooter className="flex justify-between self-end">
        <Button>Add To Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleCard;
