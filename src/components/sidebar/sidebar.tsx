"use client";
import { cn } from "@/utils/cn";
import {
  Home,
  Menu,
  Package2,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Users",
      href: "/",
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Orders",
      href: "/",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/",
    },
  ];

  return (
    <>
      <div className="fixed lg:hidden z-30 -top-[42px] left-7">
        {isOpen ? (
          <X onClick={() => setIsOpen(!isOpen)} size={24} />
        ) : (
          <Menu onClick={() => setIsOpen(!isOpen)} size={24} />
        )}
      </div>
      <div
        className={cn(
          isOpen ? "left-0 w-screen lg:w-52" : "-left-full",
          "bg-background lg:flex fixed lg:static flex-col min-h-screen shadow transition-all duration-700"
        )}
      >
        <aside className="flex-1 overflow-auto">
          <ul className="space-y-1 w-52">
            {menuItems.map(({ label, icon, href }) => (
              <li key={label}>
                <Link href={href} prefetch={false}>
                  <Button
                    variant="ghost"
                    className="flex w-full gap-2 justify-start"
                  >
                    {icon} {label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
