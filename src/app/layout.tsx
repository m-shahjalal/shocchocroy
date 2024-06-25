import Header from "@/components/sidebar/header";
import SideBar from "@/components/sidebar/sidebar";
import { me } from "@/utils/auth.action";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "স্বচ্ছক্রয়",
  description: "Your own shari store.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await me();
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>
        <Header user={user} />
        <main className="flex gap-4 translate-y-16 h-full">
          <SideBar />
          <div className="flex-1 overflow-x-hidden">{children}</div>
        </main>
      </body>
    </html>
  );
}
