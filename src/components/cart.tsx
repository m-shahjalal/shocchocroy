'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cartAtom } from '@/utils/store';
import { useAtom } from 'jotai';

import { PAGES } from '@/config/pages';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const [cart, setCart] = useAtom(cartAtom);

  const handleQuantityChange = (id: string, value: number) => {
    const updatedItems = cart.items.map((item) =>
      item.data.id === id ? { ...item, quantity: item.quantity + value } : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  const subtotal = cart.items.reduce(
    (total, item) => total + item.data.price * item.quantity,
    0
  );
  const shipping = 5;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="grid gap-8 px-4 py-12 md:grid-cols-[1fr_300px] md:px-6">
      <div>
        <h1 className="mb-6 text-2xl font-bold">
          {cart.items.length ? 'Your Cart' : 'No Product added to this cart 😥'}
        </h1>
        <div className="space-y-6">
          {cart.items.length ? (
            cart.items.map((item) => (
              <div
                key={item.data.id}
                className="flex items-center justify-between border-b pb-6"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.data.attachment?.link}
                    alt={item.data.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <Link
                      href={PAGES.PRODUCT_DETAIL(item.data.id!)}
                      className="font-semibold underline"
                    >
                      {item.data.title}
                    </Link>
                    <p className="text-muted-foreground">
                      ${item.data.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.data.id!, -1)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.data.id!, 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full items-center justify-center text-2xl"></div>
          )}
        </div>
      </div>

      {cart.items.length ? (
        <div className="space-y-8 rounded-lg bg-muted/40 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cart Summary</h2>
            <Button size="icon" variant="outline">
              <CodeIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function CodeIcon(props) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
