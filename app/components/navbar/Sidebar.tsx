"use client";

import React, { useMemo } from "react";
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
  { key: "started", label: "Gettin Started", icon: <Home size={18} />, route: "/line/systemIntegration/started" },
  { key: "hardware", label: "Hardware Infrastructure", icon: <HardDrive size={18} />, route: "/line/systemIntegration/hardware" },
  { key: "server", label: "Server", icon: <Server size={18} />, route: "/line/systemIntegration/server" },
  { key: "storage", label: "Storage", icon: <Archive size={18} />, route: "/line/systemIntegration/storage" },
  { key: "security", label: "Security", icon: <Shield size={18} />, route: "/line/systemIntegration/security" },
  { key: "peripherals", label: "Peripheral Devices", icon: <Zap size={18} />, route: "/line/systemIntegration/peripheral" },
  { key: "apps", label: "Software And Apps", icon: <Cpu size={18} />, route: "/line/systemIntegration/apps" },
  { key: "ecm", label: "Enterprise Content Management", icon: <Archive size={18} />, route: "/line/systemIntegration/enterprise" },
  { key: "cx", label: "Customer Experience", icon: <Users size={18} />, route: "/line/systemIntegration/experience" },
  { key: "ai", label: "AI And Machine Learn", icon: <Zap size={18} />, route: "/line/systemIntegration/machine" },
  { key: "business", label: "Business Application", icon: <Briefcase size={18} />, route: "/line/systemIntegration/application" },
  { key: "services", label: "Services", icon: <Briefcase size={18} />, route: "/line/systemIntegration/services" },
];

type Props = {
  defaultSelected?: string;
  collapsed: boolean; 
  onCollapse: (collapsed: boolean) => void;
};

export default function SystemIntegrationSidebar({ defaultSelected = "started", collapsed, onCollapse }: Props) {
  const router = useRouter();
  const pathname = usePathname() || "";

  const parts = pathname.split("/").filter(Boolean);
  const activeKey = parts[2] ?? defaultSelected;

  const { token: { colorBgContainer } } = theme.useToken();

  const items: MenuProps["items"] = useMemo(
    () => MENU_ITEMS.map(it => ({ key: it.key, icon: it.icon, label: it.label })),
    []
  );

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    const found = MENU_ITEMS.find(it => it.key === key);
    if (found) {
      router.push(found.route);
      
      if (typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches) {
        onCollapse(true); 
      }
    }
  };

  return (
    <Sider
      width={260}
      collapsedWidth={0}
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onBreakpoint={(broken) => onCollapse(broken)}
      trigger={null}
      style={{ background: colorBgContainer }}
      className={`border-none! fixed top-0 left-0 h-full z-50 lg:static lg:h-auto transform transition-transform duration-300 ${collapsed ? "-translate-x-full" : "translate-x-0"}`}
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
            inlineCollapsed={false} // biarkan ant menu menampilkan label ketika desktop; pada mobile kita hide seluruh sidebar
            style={{ height: "100%", borderInlineEnd: 0, background: "transparent" }}
            items={items}
          />
        </div>
      </div>
    </Sider>
  );
}