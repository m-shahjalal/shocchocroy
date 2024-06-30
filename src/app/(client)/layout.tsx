import Header from '@/components/layout/header';
import SideBar from '@/components/layout/sidebar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container flex gap-4 pt-16">
        <SideBar />
        <div className="flex-1 lg:ml-[306px]">{children}</div>
      </main>
    </>
  );
}
