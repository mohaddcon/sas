"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const SidebarClient: React.FC = () => {
  const pathname = usePathname();
  return <Sidebar currentPath={pathname ?? undefined} />;
};

export default SidebarClient;
