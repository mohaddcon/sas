"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const SidebarClient: React.FC = () => {
  const pathname = usePathname();
   const { locale } = useParams();
  return <Sidebar currentPath={pathname ?? undefined} />;
};

export default SidebarClient;
