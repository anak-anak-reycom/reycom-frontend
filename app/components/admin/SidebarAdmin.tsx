// SidebarAdmin.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Server,
  HardDrive,
  Shield,
  Cpu,
  Archive,
  Users,
  Zap,
  Briefcase,
} from "lucide-react";

const { Sider } = Layout;

const MENU_ITEMS: { key: string; label: string; icon: React.ReactNode; route: string }[] = [
  { key: "applier", label: "Applier", icon: <Home size={18} />, route: "/admin/admin-page/career" },
  { key: "news", label: "News", icon: <HardDrive size={18} />, route: "/admin/news" },
  { key: "branch", label: "Branches", icon: <Server size={18} />, route: "/admin/admin-page/branch" },
  { key: "storage", label: "Storage", icon: <Archive size={18} />, route: "/admin/storage" }

];

export default function SidebarAdmin({ defaultSelected = "started" }: { defaultSelected?: string }) {
  const router = useRouter();
  const pathname = usePathname() || "";

  // Dapatkan segmen terakhir yang relevan: /line/systemIntegration/<key>
  const parts = pathname.split("/").filter(Boolean);
  const activeKey = parts[2] ?? defaultSelected;

  const { token: { colorBgContainer } } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  // Ant Design Menu items structure
  const items: MenuProps["items"] = useMemo(
    () => MENU_ITEMS.map(it => ({ key: it.key, icon: it.icon, label: it.label })),
    []
  );

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    const found = MENU_ITEMS.find(it => it.key === key);
    if (found) router.push(found.route);
  };

  return (
    <Sider
      width={260}
      collapsedWidth={80}           
      breakpoint="lg"             
      collapsible
      collapsed={collapsed}
      onBreakpoint={(broken) => setCollapsed(broken)} // auto collapse saat breakpoint terpenuhi
      trigger={null}
      style={{ background: colorBgContainer }}
      className="border-none!"
    >
      <div className="px-1 py-6 h-full flex flex-col">
        <div className="mb-4">
          
          <div className={`text-lg font-semibold transition-all overflow-hidden ${collapsed ? "opacity-0 h-0" : "opacity-100"}`}>
            System Integrate
          </div>
        </div>

        <div className="flex-1">
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={handleClick}
            inlineCollapsed={collapsed} 
            style={{ height: "100%", borderInlineEnd: 0, background: "transparent" }}
            items={items}
          />
        </div>
      </div>
    </Sider>
  );
}
