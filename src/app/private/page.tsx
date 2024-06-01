import { supabaseServer } from "@/server/supabase-client";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>Hello {data.user.email}</p>;
}
