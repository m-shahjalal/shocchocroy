import { ScrollArea } from '@/components/ui/scroll-area';
import BreadCrumb from '@/components/breadcrumb';
import { CreateProfileOne } from '@/components/forms/user-profile-stepper/create-profile';

const breadcrumbItems = [{ title: 'Profile', link: '/dashboard/profile' }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne categories={[]} initialData={null} />
      </div>
    </ScrollArea>
  );
}
