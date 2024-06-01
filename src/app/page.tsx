import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      হ্যালো স্বচ্ছক্রয় 😻
      <Button>
        <Link href={PAGES.LOGIN}>Login</Link>
      </Button>
    </main>
  );
}
