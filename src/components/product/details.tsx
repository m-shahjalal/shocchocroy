'use client';

import { CompleteProduct } from '@/server/schema';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PAGES } from '@/config/pages';

export default function ProductDetails({
  details,
  recommended,
}: {
  details: CompleteProduct;
  recommended: CompleteProduct[];
}) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <Carousel className="overflow-hidden rounded-lg">
            <CarouselContent>
              {details.attachments?.map((item) => (
                <CarouselItem key={item.id}>
                  <Image
                    src={item.link}
                    width={600}
                    height={600}
                    alt="Product Image"
                    className="aspect-square object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold">{details.title}</h1>
            <p className="text-muted-foreground">{details.description}</p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="color" className="text-base">
                Color
              </Label>
              <RadioGroup
                id="color"
                defaultValue="black"
                className="flex items-center gap-2"
              >
                <Label
                  htmlFor="color-black"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
                <Label
                  htmlFor="color-white"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="color-white" value="white" />
                  White
                </Label>
                <Label
                  htmlFor="color-blue"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size" className="text-base">
                Size
              </Label>
              <RadioGroup
                id="size"
                defaultValue="m"
                className="flex items-center gap-2"
              >
                <Label
                  htmlFor="size-xs"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="size-xs" value="xs" />
                  XS
                </Label>
                <Label
                  htmlFor="size-s"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="size-s" value="s" />S
                </Label>
                <Label
                  htmlFor="size-m"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="size-m" value="m" />M
                </Label>
                <Label
                  htmlFor="size-l"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="size-l" value="l" />L
                </Label>
                <Label
                  htmlFor="size-xl"
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem id="size-xl" value="xl" />
                  XL
                </Label>
              </RadioGroup>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">$99.99</div>
              <div className="text-sm text-muted-foreground line-through">
                {details.price}
              </div>
            </div>
            <Button size="lg">Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
        <div className="grid gap-6">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="font-medium">Sarah Johnson</div>
                <div className="flex items-center gap-0.5 text-sm">
                  <StarIcon className="h-4 w-4 fill-primary" />
                  <StarIcon className="h-4 w-4 fill-primary" />
                  <StarIcon className="h-4 w-4 fill-primary" />
                  <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                  <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The Acme Prism T-Shirt is a great addition to my wardrobe. The
                fabric is soft and comfortable, and the design is unique and
                eye-catching.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="font-medium">Alex Smith</div>
                <div className="flex items-center gap-0.5 text-sm">
                  <StarIcon className="h-4 w-4 fill-primary" />
                  <StarIcon className="h-4 w-4 fill-primary" />
                  <StarIcon className="h-4 w-4 fill-primary" />
                  <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                  <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                I was hesitant at first, but the Acme Prism T-Shirt has exceeded
                my expectations. The quality is excellent, and the fit is
                perfect.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recommended?.map((product) => {
            return (
              <Card key={product.id} className="group">
                <Link
                  href={PAGES.PRODUCT_DETAIL(product.id!)}
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View</span>
                </Link>

                <Image
                  src={product.attachments?.[0]?.link}
                  onClick={() => router.push(PAGES.PRODUCT_DETAIL(product.id!))}
                  width={400}
                  height={400}
                  alt="Product Image"
                  className="aspect-square rounded-t-lg object-cover transition-opacity group-hover:opacity-50"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.description.slice(0, 100)}...
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-lg font-semibold">$69.99</div>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
