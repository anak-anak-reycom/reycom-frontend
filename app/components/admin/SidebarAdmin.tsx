// SidebarAdmin.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { Home, Server, HardDrive, Archive } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const { Sider } = Layout;

const MENU_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <Home size={18} />, route: "/admin" },
  { key: "career", label: "Applier", icon: <Home size={18} />, route: "/admin/admin-page/career" },
  { key: "jobs", label: "Job List", icon: <Home size={18} />, route: "/admin/admin-page/jobs" },
  { key: "news", label: "News", icon: <HardDrive size={18} />, route: "/admin/admin-page/news" },
  { key: "branch", label: "Branches", icon: <Server size={18} />, route: "/admin/admin-page/branch" },
  { key: "video", label: "Videos", icon: <Archive size={18} />, route: "/admin/admin-page/video" },
];

export default function SidebarAdmin({ defaultSelected = "started" }: { defaultSelected?: string }) {
  const router = useRouter();
  const pathname = usePathname() || "";

 
  useAuthGuard();

  const parts = pathname.split("/").filter(Boolean);
  const activeKey = parts[2] ?? defaultSelected;

  const { token: { colorBgContainer } } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = useMemo(
    () => MENU_ITEMS.map((it) => ({ key: it.key, icon: it.icon, label: it.label })),
    []
  );

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    const found = MENU_ITEMS.find((it) => it.key === key);
    if (found) router.push(found.route);
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    router.replace("/"); 
  }

  return (
    <Sider
      width={260}
      collapsedWidth={80}
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onBreakpoint={(broken) => setCollapsed(broken)}
      trigger={null}
      style={{
        background: colorBgContainer,
        position: "sticky",
        top: 0,
        height: "100vh",
        alignSelf: "flex-start",
        overflowY: "auto",
      }}
    >
      <div className="px-1 py-6 h-full flex flex-col">
        <div className="mb-4">
          <div className={`text-3xl font-semibold transition-all overflow-hidden ${collapsed ? "opacity-0 h-0" : "opacity-100"}`}>
            DATA LIST
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

        {/* Logout button */}
        <div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 hover:bg-[#1a3a4d] transition-colors"
          >
            {collapsed ? "↩" : "LOGOUT"}
          </button>
        </div>
      </div>
    </Sider>
  );
}