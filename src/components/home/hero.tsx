'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Hero() {
  const path = usePathname()
  if(path.replace('/', '')) return null;
  return (
    <section className="hero-image w-full py-12 md:py-24 lg:py-32 h-[calc(100vh-64px)]">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10 h-full">
        <Image
          src="/hero.jpg"
          width={600}
          height={600}
          alt="Fashion Collection"
          className="mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl object-cover object-center"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover the Latest Fashion Collection
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Elevate your style with our carefully curated selection of the
            season&#39;s hottest trends. Explore our latest fashion collection and
            find the perfect pieces to complement your unique look.
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
