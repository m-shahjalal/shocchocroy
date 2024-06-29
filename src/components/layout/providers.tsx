"use client";
import React, { ReactNode } from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
