// components/sidebars/SystemIntegrationSidebar.tsx
"use client";

import React from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
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
  { key: "hardware", label: "Hardware Infrastructure", icon: <HardDrive size={18} />, route: "/line/system-integration/hardware" },
  { key: "server", label: "Server", icon: <Server size={18} />, route: "/line/system-integration/server" },
  { key: "storage", label: "Storage", icon: <Archive size={18} />, route: "/line/system-integration/storage" },
  { key: "security", label: "Security", icon: <Shield size={18} />, route: "/line/system-integration/security" },
  { key: "peripherals", label: "Peripheral Devices", icon: <Zap size={18} />, route: "/line/system-integration/peripherals" },
  { key: "software", label: "Software And Apps", icon: <Cpu size={18} />, route: "/line/system-integration/software" },
  { key: "ecm", label: "Enterprise Content Management", icon: <Archive size={18} />, route: "/line/system-integration/ecm" },
  { key: "cx", label: "Customer Experience", icon: <Users size={18} />, route: "/line/system-integration/cx" },
  { key: "ai", label: "AI And Machine Learn", icon: <Zap size={18} />, route: "/line/system-integration/ai-and-machine-learning" },
  { key: "business", label: "Business Application", icon: <Briefcase size={18} />, route: "/line/system-integration/business" },
  { key: "services", label: "Services", icon: <Briefcase size={18} />, route: "/line/system-integration/services" },
];

export default function SystemIntegrationSidebar({ defaultSelected = "hardware" }: { defaultSelected?: string }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  // get last segment (e.g. "hardware" from /line/system-integration/hardware)
  const parts = pathname.split("/").filter(Boolean);
  const activeKey = parts[2] ?? defaultSelected;

  const { token: { colorBgContainer } } = theme.useToken();

  const items: MenuProps["items"] = MENU_ITEMS.map(it => ({
    key: it.key,
    icon: it.icon,
    label: it.label,
  }));

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    const found = MENU_ITEMS.find(it => it.key === key);
    if (found) router.push(found.route);
  };

  return (
    <Sider width={260} style={{ background: colorBgContainer }} className="!border-none">
      <div className="px-4 py-6">
        <div className="text-lg font-semibold mb-4">System Integrate</div>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleClick}
          style={{ height: "100%", borderInlineEnd: 0, background: "transparent" }}
          items={items}
        />
      </div>
    </Sider>
  );
}
