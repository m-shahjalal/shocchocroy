import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import { getAuthUser } from "@/lib/supabase/auth-info";
import Link from "next/link";

export default async function Home() {
  const user = await getAuthUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>হ্যালো স্বচ্ছক্রয় 😻</div>
      <div className="border-2 border-green-700 rounded-md p-6 my-4">
        <pre>{JSON.stringify(user.data?.user, null, 4)}</pre>
      </div>
      {user.data && (
        <div className="flex gap-2">
          <Button>
            <Link href={PAGES.LOGIN}>Login</Link>
          </Button>
          <Button>
            <Link href={PAGES.REGISTER}>Register</Link>
          </Button>
        </div>
      )}
    </main>
  );
}