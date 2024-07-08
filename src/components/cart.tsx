/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ASz86xtKaYC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Cozy Blanket',
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Autumn Mug',
      price: 12.99,
      quantity: 2,
    },
    {
      id: 3,
      name: 'Fall Fragrance Candle',
      price: 16.99,
      quantity: 1,
    },
  ]);
  const handleQuantityChange = (id, value) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + value) }
          : item
      )
    );
  };
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return (
    <div className="grid gap-8 px-4 py-12 md:grid-cols-[1fr_300px] md:px-6">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-6"
            >
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg"
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 rounded-lg bg-muted/40 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cart Summary</h2>
          <Button size="icon" variant="outline">
            <CodeIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="space-y-2">
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
