"use client";

import React from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
  Server,
  HardDrive,
  Shield,
  Cpu,
  Smartphone,
  Archive,
  Users,
  Zap,
  Briefcase,
  
} from "lucide-react";

const { Sider } = Layout;

const items: MenuProps["items"] = [
  { key: "hardware", label: "Hardware Infrastructure", icon: <HardDrive size={18} /> },
  { key: "server", label: "Server", icon: <Server size={18} /> },
  { key: "storage", label: "Storage", icon: <Archive size={18} /> },
  { key: "security", label: "Security", icon: <Shield size={18} /> },
  { key: "peripherals", label: "Peripheral Devices", icon: <Briefcase size={18} /> },
  { key: "software", label: "Software And Apps", icon: <Cpu size={18} /> },
  { key: "ecm", label: "Enterprise Content Management", icon: <Archive size={18} /> },
  { key: "cx", label: "Customer Experience", icon: <Users size={18} /> },
  { key: "ai", label: "AI And Machine Learn", icon: <Zap size={18} /> },
  { key: "business", label: "Business Application", icon: <Briefcase size={18} /> },
  { key: "services", label: "Services", icon: <Briefcase size={18} /> },
];

export default function SystemIntegrationSidebar({
  defaultSelected = "hardware",
}: {
  defaultSelected?: string;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      width={260}
      style={{ background: colorBgContainer }}
      className="!border-none"
    >
      <div className="px-4 py-6">
        {/* optional heading */}
        <div className="text-lg font-semibold mb-4">System Integrate</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[defaultSelected]}
          style={{ height: "100%", borderInlineEnd: 0, background: "transparent" }}
          items={items}
        />
      </div>
    </Sider>
  );
}
