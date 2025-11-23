import React from "react";
import Link from "next/link";
import {
  PlusCircle,
  UserPlus,
  Truck,
  Package,
  List,
  FileText,
  User,
  Star,
  Printer,
  BarChart2,
} from "lucide-react";

type MenuItem = {
  key: string;
  label: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const menu: MenuItem[] = [
  { key: "add-product", label: "إضافة منتج", href: "/locale/sas/add-product", Icon: PlusCircle },
  { key: "add-customer", label: "إضافة عميل", href: "/locale/sas/add-customer", Icon: UserPlus },
  { key: "add-truck", label: "إضافة شاحنة", href: "/locale/sas/add-truck", Icon: Truck },
  { key: "new-shipment", label: "شحنة جديدة", href: "/locale/sas/new-shipment", Icon: Package },
  { key: "my-shipments", label: "شحناتي", href: "/locale/sas/my-shipments", Icon: List },
  { key: "account-statement", label: "كشف حساب", href: "/locale/sas/account-statement", Icon: FileText },
  { key: "profile", label: "الملف الشخصي", href: "/locale/sas/profile", Icon: User },
  { key: "rate-driver", label: "تقييم الشاحن", href: "/locale/sas/rate-driver", Icon: Star },
  { key: "print-bill", label: "طباعة البوليصة", href: "/locale/sas/print-bill", Icon: Printer },
  { key: "reports", label: "تقارير", href: "/locale/sas/reports", Icon: BarChart2 },
];

type Props = {
  currentPath?: string;
};

const Sidebar: React.FC<Props> = ({ currentPath }) => {
  return (
    <aside className="w-64 min-h-screen border-r bg-indigo-800 dark:bg-slate-900 dark:border-slate-700 text-white text-2xl">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">SAS</h3>
      </div>
      <nav className="p-2 text-white  text-sm">
        <ul className="space-y-1 text-2xl text-white">
          {menu.map((m) => {
            const active = currentPath ? currentPath.startsWith(m.href) : false;
            return (
              <li key={m.key}>
                <Link
                  href={m.href}
                  className={`flex items-center gap-3 px-3 text-white py-2 rounded-md transition-colors text-2xl ${
                    active ? "bg-sky-100 text-white" : "text-slate-700 hover:bg-red-500"
                  }`}
                >
                  <m.Icon className="h-5 w-5" aria-hidden />
                  <span className="flex-1">{m.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
