import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth.action';

import { PAGES } from '@/config/pages';
import { Register } from '@/components/auth/Register';

const Page = async () => {
  const isAuthenticatedUser = await isAuthenticated();
  if (isAuthenticatedUser) redirect(PAGES.ROOT);
  return <Register />;
};

export default Page;
