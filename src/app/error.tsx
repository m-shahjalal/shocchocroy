'use client';

import { HeartCrack } from 'lucide-react';

const Error = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <HeartCrack className="text-red-700" size={50} />
      <h1 className="text-red-400">Oops! Something went wrong.</h1>
      <p>Please try again later..</p>
    </div>
  );
};

export default Error;
