import { getAuthenticatedUser } from '@/utils/auth.action';
import { redirect } from 'next/navigation';

import Header from '@/components/layout/admin-header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import Providers from '@/components/layout/providers';
import { PAGES } from '@/config/pages';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  if (!user) redirect(PAGES.ROOT);

  return (
    <Providers>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </Providers>
  );
}
