"use client";

import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import { ChevronLeft, HeartCrack, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen overflow-hidden justify-center items-center flex-col">
      <HeartCrack className="text-red-700" size={100} />
      <h1 className="text-gray-600 text-3xl">Oops! Resource does not exist.</h1>
      <p className="text-gray-400 my-2">
        We will word on this soo, please try again later..
      </p>
      <div className="flex gap-3 mt-4">
        <Button
          onClick={() => router.back()}
          className="flex gap-3 justify-center items-center"
        >
          <ChevronLeft size={20} />
          Go Back
        </Button>
        <Link href={PAGES.ROOT}>
          <Button className="flex gap-3 justify-center items-center">
            <Home size={20} />
            To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
