'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { sidebarAtom } from '@/utils/store';
import { useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { navItems } from '@/config/data';
import { DashboardNav } from '@/components/dashboard-nav';

type SidebarProps = {
  className?: string;
};

export default function AdminSidebar({ className }: SidebarProps) {
  const [sidebarState, toggle] = useAtom(sidebarAtom);
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle({ ...sidebarState, isSidebarOpen: !sidebarState.isSidebarOpen });
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none border-r pt-20 md:block`,
        status && 'duration-500',
        !sidebarState.isSidebarOpen ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          sidebarState.isSidebarOpen && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
