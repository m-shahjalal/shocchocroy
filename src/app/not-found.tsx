'use client'
import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import { HeartCrack, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
    const router = useRouter()
  return (
    <div className="flex h-screen w-screen overflow-hidden justify-center items-center flex-col">
      <HeartCrack className="text-red-700" size={100} />
      <h1 className="text-gray-600 text-3xl">Oops! Resource does not exist.</h1>
      <p className="text-gray-400 my-2">
        We will word on this soo, please try again later..
      </p>
      <div className="flex gap-3 mt-4">
        <Link href={PAGES.ROOT}>
          <Button className="flex gap-3 justify-center items-center">
            <Home size={20} />
            Back to home
          </Button>
        </Link>
        <Button onClick={() => router.refresh()} className="flex gap-3 justify-center items-center">
          <RefreshCcw size={20} />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
