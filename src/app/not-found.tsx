'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, HeartCrack, Home } from 'lucide-react';

import { PAGES } from '@/config/pages';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <HeartCrack className="text-red-700" size={100} />
      <h1 className="text-3xl text-gray-600">Oops! Resource does not exist.</h1>
      <p className="my-2 text-gray-400">
        We will word on this soo, please try again later..
      </p>
      <div className="mt-4 flex gap-3">
        <Button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-3"
        >
          <ChevronLeft size={20} />
          Go Back
        </Button>
        <Link href={PAGES.ROOT}>
          <Button className="flex items-center justify-center gap-3">
            <Home size={20} />
            To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
