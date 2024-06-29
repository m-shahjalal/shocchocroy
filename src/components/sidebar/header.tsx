"use client";

import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";

import {
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingBasket,
  User as UserIcon,
  X,
} from "lucide-react";
import Link from "next/link";

import { PAGES } from "@/config/pages";
import useAuth from "@/hooks/use-auth";
import { logout } from "@/utils/handle-auth";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { sidebarAtom } from "@/utils/store";

export default function Header() {
  const [sidebarState, toggleSidebar] = useAtom(sidebarAtom);

  const handleSidebar = () => {
    toggleSidebar({
      ...sidebarState,
      isSidebarOpen: !sidebarState.isSidebarOpen,
    });
  };

  return (
    <header className="shadow-sm fixed z-10 left-0 right-0 bg-white h-16">
      <div className="container h-full flex items-center gap-4 justify-between">
        <div className="flex items-center flex-1 gap-2 justify-start">
          <span className="lg:hidden z-30 cursor-pointer -top-[42px] left-7">
            {sidebarState.isSidebarOpen ? (
              <X onClick={handleSidebar} size={24} />
            ) : (
              <Menu onClick={handleSidebar} size={24} />
            )}
          </span>
          <Link href="/" className="text-blue-500 font-bold text-xl">
            স্বচ্ছক্রয়
          </Link>
        </div>
        <div className="relative hidden sm:block w-full max-w-80">
          <Input
            type="text"
            placeholder="Search sari..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-transparent w-full lg:w-80"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
        <Nav />
        <UserDropdown />

        <Link className="relative" href="#" prefetch={false}>
          <ShoppingBasket className="h-10 w-10 p-2 bg-blue-500 text-gray-200 rounded-full" />
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-gray-100 rounded-full px-2 py-1 text-xs font-bold">
            3
          </span>
        </Link>
      </div>
    </header>
  );
}

const Nav = () => (
  <nav
    className={`hidden mt-4 lg:mt-0 lg:flex lg:items-center lg:space-x-6 flex-col lg:flex-row`}
  >
    <Link
      href="#"
      className="block text-gray-600 hover:text-primary transition-colors duration-300 mb-2 lg:mb-0 text-center"
      prefetch={false}
    >
      Traditional
    </Link>
    <Link
      href="#"
      className="block text-gray-600 hover:text-primary transition-colors duration-300 mb-2 lg:mb-0 text-center"
      prefetch={false}
    >
      Festive
    </Link>
    <Link
      href="#"
      className="block text-gray-600 hover:text-primary transition-colors duration-300 mb-2 lg:mb-0 text-center"
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
    console.log("data", data);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 bg-blue-500 text-white rounded-full"
        >
          {user?.user_metadata.name?.[0] || user?.email?.[0] || "SP"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Management</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user?.id ? (
          <>
            <DropdownMenuItem>
              <Link
                className="p-2 flex gap-2 justify-start items-center h-full"
                href={"#"}
              >
                <UserIcon size={20} />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                className="p-2 flex gap-2 justify-start items-center h-full"
                href={"#"}
              >
                <ShoppingBag size={20} />
                My orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="p-2 flex gap-2 justify-start items-center h-full"
                href={"#"}
              >
                <Settings size={20} />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="p-2 flex gap-2 justify-start items-center h-full"
            >
              <LogOut size={20} /> Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link
                className="p-2 flex gap-2 justify-start items-center h-full"
                href={PAGES.LOGIN}
              >
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="p-2 flex gap-2 justify-start items-center h-full"
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
