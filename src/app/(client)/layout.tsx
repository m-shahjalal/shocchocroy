import Hero from '@/components/home/hero';
import Header from '@/components/layout/header';
import SideBar from '@/components/layout/sidebar';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <>
      <Header />
      <Hero />
      <main className="container grid-cols-12 gap-8 pt-16 lg:grid">
        <div className="md:col-span-3">
          <SideBar />
        </div>
        <div className="flex-1 lg:col-span-9">{children}</div>
      </main>
    </>
  );
}
