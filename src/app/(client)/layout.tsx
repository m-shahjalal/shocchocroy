import Header from "@/components/sidebar/header";
import SideBar from "@/components/sidebar/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex gap-4 pt-16 container">
        <SideBar />
        <div className="flex-1 lg:ml-[306px]">{children}</div>
      </main>
    </>
  );
}
