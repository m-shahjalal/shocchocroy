import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="">{children}</main>;
};

export default Layout;
