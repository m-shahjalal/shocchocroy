'use client';

import Link from 'next/link';
import { logout } from '@/utils/handle-auth';
import { sidebarAtom } from '@/utils/store';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useAtom } from 'jotai';
import {
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingBasket,
  User as UserIcon,
  X,
} from 'lucide-react';

import { PAGES } from '@/config/pages';
import useAuth from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Header() {
  const [sidebarState, toggleSidebar] = useAtom(sidebarAtom);

  const handleSidebar = () => {
    toggleSidebar({
      ...sidebarState,
      isSidebarOpen: !sidebarState.isSidebarOpen,
    });
  };

  return (
    <header className="fixed left-0 right-0 z-10 h-16 bg-white shadow-sm">
      <div className="container flex h-full items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-start gap-2">
          <span className="-top-[42px] left-7 z-30 cursor-pointer lg:hidden">
            {sidebarState.isSidebarOpen ? (
              <X onClick={handleSidebar} size={24} />
            ) : (
              <Menu onClick={handleSidebar} size={24} />
            )}
          </span>
          <Link href="/" className="text-xl font-bold text-blue-500">
            স্বচ্ছক্রয়
          </Link>
        </div>
        <div className="relative hidden w-full max-w-80 sm:block">
          <Input
            type="text"
            placeholder="Search sari..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-0 lg:w-80"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
        </div>
        <Nav />
        <UserDropdown />

        <Link className="relative" href="#" prefetch={false}>
          <ShoppingBasket className="h-10 w-10 rounded-full bg-blue-500 p-2 text-gray-200" />
          <span className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-gray-100">
            3
          </span>
        </Link>
      </div>
    </header>
  );
}

const Nav = () => (
  <nav
    className={`mt-4 hidden flex-col lg:mt-0 lg:flex lg:flex-row lg:items-center lg:space-x-6`}
  >
    <Link
      href="#"
      className="mb-2 block text-center text-gray-600 transition-colors duration-300 hover:text-primary lg:mb-0"
      prefetch={false}
    >
      Traditional
    </Link>
    <Link
      href="#"
      className="mb-2 block text-center text-gray-600 transition-colors duration-300 hover:text-primary lg:mb-0"
      prefetch={false}
    >
      Festive
    </Link>
    <Link
      href="#"
      className="mb-2 block text-center text-gray-600 transition-colors duration-300 hover:text-primary lg:mb-0"
      prefetch={false}
    >
      Contemporary
    </Link>
  </nav>
);

const UserDropdown = () => {
  const user = useAuth();

  const handleLogout = async () => {
    const data = await logout();
    console.log('data', data);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full bg-blue-500 text-white"
        >
          {user?.user_metadata.name?.[0] || user?.email?.[0] || 'SP'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Management</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user?.id ? (
          <>
            <DropdownMenuItem>
              <Link
                className="flex h-full items-center justify-start gap-2 p-2"
                href={'#'}
              >
                <UserIcon size={20} />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                className="flex h-full items-center justify-start gap-2 p-2"
                href={'#'}
              >
                <ShoppingBag size={20} />
                My orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="flex h-full items-center justify-start gap-2 p-2"
                href={'#'}
              >
                <Settings size={20} />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex h-full items-center justify-start gap-2 p-2"
            >
              <LogOut size={20} /> Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link
                className="flex h-full items-center justify-start gap-2 p-2"
                href={PAGES.LOGIN}
              >
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="flex h-full items-center justify-start gap-2 p-2"
                href={PAGES.REGISTER}
              >
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
