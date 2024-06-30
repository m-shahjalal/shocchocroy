import Header from '@/components/layout/admin-header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import Providers from '@/components/layout/providers';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
