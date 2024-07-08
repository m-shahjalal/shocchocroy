
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Employee', link: '/dashboard/employee' },
    { title: 'Create', link: '/dashboard/employee/create' },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} key={null} />
      </div>
    </ScrollArea>
  );
}
