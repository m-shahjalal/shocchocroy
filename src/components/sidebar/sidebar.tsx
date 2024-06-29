"use client";

import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

import TangailIcon from "@/assets/icons/002-woman-1.png";
import ThreePcsIcon from "@/assets/icons/003-saree.png";
import MonipuriIcon from "@/assets/icons/006-saree-2.png";
import JamdaniIcon from "@/assets/icons/014-bracelet.png";
import { sidebarAtom } from "@/utils/store";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
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
    label: "Tangail Tant",
    href: "/tangail-tant",
    parentColor: "bg-red-300 hover:bg-red-600",
    colorCode: "bg-red-50 hover:bg-red-200",
    subCategory: [
      {
        label: "Cotton",
        href: "cotton",
      },
      {
        label: "Half Silk",
        href: "half-silk",
      },
      {
        label: "Silk",
        href: "silk",
      },
      {
        label: "Semi maslin",
        href: "semi-silk",
      },
      {
        label: "Maslin",
        href: "maslin",
      },
      {
        label: " Handloom Cotton",
        href: "handloom-cotton",
      },
      {
        label: "Handloom Halfsilk",
        href: "handloom-half-silk",
      },
      {
        label: "Tantuj",
        href: "tantuj",
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
    label: "Monipuri",
    href: "/monipuri",
    parentColor: "bg-blue-300 hover:bg-blue-600",
    colorCode: "bg-blue-50 hover:bg-blue-200",
    subCategory: [
      {
        label: "Academi Monipuri",
        href: "academi-monipuri",
      },
      {
        label: "Handloom Monipuri",
        href: "handloom-monipuri",
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
    label: "Jamdani",
    href: "/jamdani",
    parentColor: "bg-green-300 hover:bg-green-600",
    colorCode: "bg-green-50 hover:bg-green-200",
    subCategory: [
      {
        label: " Cotton Jamdani",
        href: "cotton-jamdani",
      },
      {
        label: "Halfsik Jamdani",
        href: "half-silk-jamdani",
      },
      {
        label: "Silk Jamdani",
        href: "silk-jamdani",
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
    label: "Three Pcs",
    href: "/three-pcs",
    parentColor: "bg-pink-300 hover:bg-pink-600",
    colorCode: "bg-pink-50 hover:bg-pink-200",
    subCategory: [
      {
        label: "Cotton",
        href: "cotton",
      },
      {
        label: "Silk",
        href: "silk",
      },
      {
        label: "Batik",
        href: 'batik",',
      },
      {
        label: "Embroidery",
        href: "embroidery",
      },
      {
        label: "Karchupi",
        href: "karchupi",
      },
    ],
  },
];

export function SideBar() {
  const [{ isSidebarOpen }, setSidebar] = useAtom(sidebarAtom);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleCloseSidebar = () => {
    setSidebar({ isSidebarOpen: false });
  };

  console.log("setActiveIndex", activeIndex);

  return (
    <aside
      className={cn(
        isSidebarOpen ? "left-0 -top-8" : "-left-full",
        "lg:left-auto bg-background fixed lg:flex top-16 lg:top-20 flex-col p-3 border border-transparent lg:border-inherit rounded-t-md transition-all duration-700 bottom-0 w-full lg:w-72"
      )}
    >
      <ul className="space-y-1 w-full overflow-auto">
        {menuItems.flatMap(
          ({ label, icon, subCategory, colorCode, parentColor }, index) => (
            <>
              <li className="w-full" key={label}>
                <div
                  className={cn(
                    colorCode,
                    "border flex justify-between gap-1 px-2 mb-2 rounded-md mr-3 h-10 items-center transition-all duration-300"
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex gap-1">
                    {icon} {label}{" "}
                  </div>
                  <ChevronRight className="opacity-20" />
                </div>
              </li>
              <div className={cn(activeIndex !== index && "hidden")}>
                {subCategory.map(({ label, href }) => (
                  <li onClick={handleCloseSidebar} key={label}>
                    <Link className="mx-4 block" href={href} prefetch={false}>
                      <div
                        className={cn(
                          "bg-gray-50 w-full whitespace-pre py-2 border-l-8 pl-4 mx-1 my-2 rounded-r-md border-gray-600 border-opacity-10 hover:border-opacity-100 transition-all duration-600"
                        )}
                      >
                        {label}
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
            </>
          )
        )}
      </ul>
    </aside>
  );
}

const DummySideBar = () => {
  const [{ isSidebarOpen }, setSidebar] = useAtom(sidebarAtom);

  const handleCloseSidebar = () => {
    setSidebar({ isSidebarOpen: false });
  };

  return (
    <aside
      className={cn(
        isSidebarOpen ? "left-0 -top-8" : "-left-full",
        "lg:left-auto bg-background fixed lg:flex top-16 lg:top-20 flex-col p-3 border border-transparent lg:border-inherit rounded-t-md transition-all duration-700 bottom-0 w-full lg:w-72"
      )}
    >
      <Accordion defaultValue={menuItems[0].label} type="single" collapsible className="w-full">
        {menuItems.map(({ label, icon, subCategory, colorCode }) => (
          <AccordionItem className="border-none" key={label} value={label}>
            <AccordionTrigger
              className={cn(
                colorCode,
                "mt-2 px-2 border-t-0 rounded-md transition-all duration-300 no-underline hover:no-underline"
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
                      "bg-gray-50 w-full whitespace-pre py-3 border border-l-8 pl-4 my-2 rounded-md border-gray-600 border-opacity-10 hover:border-opacity-100 transition-all duration-600"
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

export default DummySideBar;
