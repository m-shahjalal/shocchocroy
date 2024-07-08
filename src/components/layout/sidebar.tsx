'use client';

import Image from 'next/image';
import Link from 'next/link';
import TangailIcon from '@/assets/icons/002-woman-1.png';
import ThreePcsIcon from '@/assets/icons/003-saree.png';
import MonipuriIcon from '@/assets/icons/006-saree-2.png';
import JamdaniIcon from '@/assets/icons/014-bracelet.png';
import { cn } from '@/utils/cn';
import { sidebarAtom } from '@/utils/store';
import { useAtom } from 'jotai';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const menuItems = [
  {
    icon: (
      <Image
        src={TangailIcon}
        height={25}
        width={25}
        className="object-cover"
        alt="tangail"
      />
    ),
    label: 'Tangail Tant',
    href: '/tangail-tant',
    parentColor: 'bg-red-300 hover:bg-red-600',
    colorCode: 'bg-red-50 hover:bg-red-200',
    subCategory: [
      {
        label: 'Cotton',
        href: '/tangail-tant/cotton',
      },
      {
        label: 'Half Silk',
        href: '/tangail-tant/half-silk',
      },
      {
        label: 'Silk',
        href: '/tangail-tant/silk',
      },
      {
        label: 'Semi maslin',
        href: '/tangail-tant/semi-silk',
      },
      {
        label: 'Maslin',
        href: '/tangail-tant/maslin',
      },
      {
        label: ' Handloom Cotton',
        href: '/tangail-tant/handloom-cotton',
      },
      {
        label: 'Handloom Halfsilk',
        href: '/tangail-tant/handloom-half-silk',
      },
      {
        label: 'Tantuj',
        href: '/tangail-tant/tantuj',
      },
    ],
  },
  {
    icon: (
      <Image
        src={JamdaniIcon}
        height={20}
        width={20}
        className="object-cover"
        alt="tangail"
      />
    ),
    label: 'Monipuri',
    href: '/monipuri',
    parentColor: 'bg-blue-300 hover:bg-blue-600',
    colorCode: 'bg-blue-50 hover:bg-blue-200',
    subCategory: [
      {
        label: 'Academi Monipuri',
        href: '/monipuri/academi-monipuri',
      },
      {
        label: 'Handloom Monipuri',
        href: '/monipuri/handloom-monipuri',
      },
    ],
  },
  {
    icon: (
      <Image
        src={MonipuriIcon}
        height={25}
        width={25}
        className="object-cover"
        alt="tangail"
      />
    ),
    label: 'Jamdani',
    href: '/jamdani',
    parentColor: 'bg-green-300 hover:bg-green-600',
    colorCode: 'bg-green-50 hover:bg-green-200',
    subCategory: [
      {
        label: ' Cotton Jamdani',
        href: '/jamdani/cotton-jamdani',
      },
      {
        label: 'Halfsik Jamdani',
        href: '/jamdani/half-silk-jamdani',
      },
      {
        label: 'Silk Jamdani',
        href: '/jamdani/silk-jamdani',
      },
    ],
  },
  {
    icon: (
      <Image
        src={ThreePcsIcon}
        height={25}
        width={25}
        className="object-cover"
        alt="tangail"
      />
    ),
    label: 'Three Pcs',
    href: '/three-pcs',
    parentColor: 'bg-pink-300 hover:bg-pink-600',
    colorCode: 'bg-pink-50 hover:bg-pink-200',
    subCategory: [
      {
        label: 'Cotton',
        href: '/three-pcs/cotton',
      },
      {
        label: 'Silk',
        href: '/three-pcs/silk',
      },
      {
        label: 'Batik',
        href: '/three-pcs/batik",',
      },
      {
        label: 'Embroidery',
        href: '/three-pcs/embroidery',
      },
      {
        label: 'Karchupi',
        href: '/three-pcs/karchupi',
      },
    ],
  },
];

const SideBar = () => {
  const [{ isSidebarOpen }, setSidebar] = useAtom(sidebarAtom);

  const handleCloseSidebar = () => {
    setSidebar({ isSidebarOpen: false });
  };

  return (
    <aside
      className={cn(
        isSidebarOpen ? '-top-8 left-0' : '-left-full',
        'fixed bottom-0 top-16 w-full flex-col rounded-t-md border border-transparent bg-background p-3 transition-all duration-700 lg:left-auto lg:top-20 lg:flex lg:w-72 lg:border-inherit'
      )}
    >
      <Accordion
        defaultValue={menuItems[0].label}
        type="single"
        collapsible
        className="w-full"
      >
        {menuItems.map(({ label, icon, subCategory, colorCode }) => (
          <AccordionItem className="border-none" key={label} value={label}>
            <AccordionTrigger
              className={cn(
                colorCode,
                'mt-2 rounded-md border-t-0 px-2 no-underline transition-all duration-300 hover:no-underline'
              )}
            >
              <div className="flex gap-1">
                {icon} {label}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {subCategory.map(({ href, label }) => (
                <Link
                  key={label}
                  className="mx-2 block"
                  href={href}
                  prefetch={false}
                >
                  <div
                    className={cn(
                      'duration-600 my-2 w-full whitespace-pre rounded-md border border-l-8 border-gray-600 border-opacity-10 bg-gray-50 py-3 pl-4 transition-all hover:border-opacity-100'
                    )}
                  >
                    {label}
                  </div>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default SideBar;
