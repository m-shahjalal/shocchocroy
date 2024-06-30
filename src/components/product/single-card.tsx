import Image from 'next/image';
import Link from 'next/link';

import { PAGES } from '@/config/pages';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const SingleCard = ({ data }: { data: FIX_ME }) => {
  return (
    <Card key={data.id} className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <Link href={`${PAGES.PRODUCTS}/${data.id}`}>{data.title}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col items-center justify-center gap-2">
        <Image src={data.image} width={200} height={200} alt="product" />
      </CardContent>
      <CardFooter className="flex justify-between self-end">
        <Button>Add To Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleCard;
