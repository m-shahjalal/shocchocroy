import { PAGES } from "@/config/pages";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

const SingleCard = ({ data }: { data: FIX_ME }) => {
  return (
    <Card key={data.id} className="flex flex-col">
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
  );
};

export default SingleCard;
