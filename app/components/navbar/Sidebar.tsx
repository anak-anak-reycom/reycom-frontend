"use client";
import Link from "next/link";
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
  { key: "hardware", label:<link href="\line\hardwareInsfrastructure" > Hardware Infrastructure </link> , icon: <HardDrive size={18} /> },
  { key: "server", label:<link href="\line\server"> Server </link> , icon: <Server size={18} /> },
  { key: "storage", label: <Link href="\line\storage" >Storage </Link>, icon: <Archive size={18} /> },
  { key: "security", label:<Link href="\line\security" > Security </Link>, icon: <Shield size={18} /> },
  { key: "peripherals", label: <Link href="\line\peripheral" >Peripheral Devices </Link>, icon: <Briefcase size={18} /> },
  { key: "software", label: <Link href="\line\softwareAndApps" > Software And Apps </Link>, icon: <Cpu size={18} /> },
  { key: "ecm", label: <Link href="\line\enterpriseContentManagement" > Enterprise Content Management </Link>, icon: <Archive size={18} /> },
  { key: "cx", label: <Link href="\line\customerExperience" >Customer Experience </Link>, icon: <Users size={18} /> },
  { key: "ai", label: <Link href="\line\aiAndMachineLearning" >AI And Machine Learn </Link>, icon: <Zap size={18} /> },
  { key: "business", label:<Link href="\line\businessApplication" > Business Application </Link> , icon: <Briefcase size={18} /> },
  { key: "services", label: <Link href="\line\services" > Services </Link>, icon: <Briefcase size={18} /> },
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
