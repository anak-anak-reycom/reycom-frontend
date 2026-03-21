  // SystemIntegrationSidebar.tsx - FIXED
  "use client";

  import React, { useMemo } from "react";
  import { Layout, Menu, theme } from "antd";
  import type { MenuProps } from "antd";
  import { usePathname, useRouter } from "next/navigation";
  import {
    Home, Server, HardDrive, Shield, Cpu,
    Archive, Users, Zap, Briefcase,
  } from "lucide-react";

  const { Sider } = Layout;

  const MENU_ITEMS = [
    { key: "started",    label: "Getting Started",              icon: <Home size={18} />,     route: "/line/systemIntegration/started" },
    { key: "hardware",   label: "Hardware Infrastructure",      icon: <HardDrive size={18} />, route: "/line/systemIntegration/hardware" },
    { key: "server",     label: "Server",                       icon: <Server size={18} />,   route: "/line/systemIntegration/server" },
    { key: "storage",    label: "Storage",                      icon: <Archive size={18} />,  route: "/line/systemIntegration/storage" },
    { key: "security",   label: "Security",                     icon: <Shield size={18} />,   route: "/line/systemIntegration/security" },
    { key: "peripherals",label: "Peripheral Devices",           icon: <Zap size={18} />,      route: "/line/systemIntegration/peripheral" },
    { key: "apps",       label: "Software And Apps",            icon: <Cpu size={18} />,      route: "/line/systemIntegration/apps" },
    { key: "ecm",        label: "Enterprise Content Management",icon: <Archive size={18} />,  route: "/line/systemIntegration/enterprise" },
    { key: "cx",         label: "Customer Experience",          icon: <Users size={18} />,    route: "/line/systemIntegration/experience" },
    { key: "ai",         label: "AI And Machine Learn",         icon: <Zap size={18} />,      route: "/line/systemIntegration/machine" },
    { key: "business",   label: "Business Application",         icon: <Briefcase size={18} />,route: "/line/systemIntegration/application" },
    { key: "services",   label: "Services",                     icon: <Briefcase size={18} />,route: "/line/systemIntegration/services" },
  ];

  type Props = {
    defaultSelected?: string;
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
  };

  export default function SystemIntegrationSidebar({ defaultSelected = "started", collapsed, onCollapse }: Props) {
    const router = useRouter();
    const pathname = usePathname() || "";
    const [isDesktop, setIsDesktop] = React.useState(false); // ✅ tambah ini

   
    React.useEffect(() => {
      const mq = window.matchMedia("(min-width: 1024px)");
      const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
      handler(mq);
      mq.addEventListener("change", handler as any);
      return () => mq.removeEventListener("change", handler as any);
    }, []);

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
        if (!isDesktop) onCollapse(true);
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
        style={{
        background: colorBgContainer,
        position: isDesktop ? "sticky" : "fixed",
        height: "calc(100vh - 80px)",  
        top: 80,                        
        zIndex: isDesktop ? 10 : 40,  
        transform: (!isDesktop && collapsed) ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 300ms",
        alignSelf: "flex-start",
        overflowY: "auto",
      }}
      >
        <div className="px-1 py-6 h-full flex flex-col">
          <div className="mb-4">
            <div className={`font-sans text-lg font-semibold transition-all overflow-hidden ${collapsed ? "opacity-0 h-0" : "opacity-100"}`}>
              System Integrate
            </div>
          </div>
          <div className="flex-1">
            <Menu
              mode="inline"
              selectedKeys={[activeKey]}
              onClick={handleClick}
              inlineCollapsed={false}
              style={{ height: "100%", borderInlineEnd: 0, background: "transparent" }}
              items={items}
              className="font-sans"
            />
          </div>
        </div>
      </Sider>
    );
  }