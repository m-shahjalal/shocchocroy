import { users } from '@/config/data';
import BreadCrumb from '@/components/breadcrumb';
import { UserClient } from '@/components/tables/user-tables/client';

const breadcrumbItems = [{ title: 'User', link: '/dashboard/user' }];
export default function page() {
  return <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">Dashboard</div>;
}