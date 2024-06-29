import { Login } from "@/components/auth/Login";
import { PAGES } from "@/config/pages";
import { isAuthenticated } from "@/utils/auth.action";
import { redirect } from "next/navigation";

const Page = async () => {
  const isAuthenticatedUser = await isAuthenticated();
  if (isAuthenticatedUser) redirect(PAGES.ROOT);
  return <Login />;
};

export default Page;
