import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth.action';

import { PAGES } from '@/config/pages';
import { Login } from '@/components/auth/Login';

const Page = async () => {
  const isAuthenticatedUser = await isAuthenticated();
  if (isAuthenticatedUser) redirect(PAGES.ROOT);
  return <Login />;
};

export default Page;
