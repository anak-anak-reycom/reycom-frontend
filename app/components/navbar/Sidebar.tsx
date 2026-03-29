"use client";

import React, { useMemo } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  HardDrive,
  Router,
  Box,
  Lock,
  Monitor,
  MonitorPlay,
  User,
  Cog,
  Handshake,
  Wrench,
} from "lucide-react";

const { Sider } = Layout;

const MENU_ITEMS = [
  {
    key: "started",
    label: "Getting Started",
    icon: <Home size={18} />,
    route: "/line/systemIntegration/started",
  },
  {
    key: "hardware",
    label: "Hardware Infrastructure",
    icon: <HardDrive size={18} />,
    route: "/line/systemIntegration/hardware",
  },
  {
    key: "server",
    label: "Server",
    icon: <Router size={18} />,
    route: "/line/systemIntegration/server",
  },
  {
    key: "storage",
    label: "Storage",
    icon: <Box size={18} />,
    route: "/line/systemIntegration/storage",
  },
  {
    key: "security",
    label: "Security",
    icon: <Lock size={18} />,
    route: "/line/systemIntegration/security",
  },
  {
    key: "peripherals",
    label: "Peripheral Devices",
    icon: <Router size={18} />,
    route: "/line/systemIntegration/peripheral",
  },
  {
    key: "apps",
    label: "Software And Apps",
    icon: <Monitor size={18} />,
    route: "/line/systemIntegration/apps",
  },
  {
    key: "ecm",
    label: "Enterprise Content Management",
    icon: <MonitorPlay size={18} />,
    route: "/line/systemIntegration/enterprise",
  },
  {
    key: "cx",
    label: "Customer Experience",
    icon: <User size={18} />,
    route: "/line/systemIntegration/experience",
  },
  {
    key: "ai",
    label: "AI And Machine Learn",
    icon: <Cog size={18} />,
    route: "/line/systemIntegration/machine",
  },
  {
    key: "business",
    label: "Business Application",
    icon: <Handshake size={18} />,
    route: "/line/systemIntegration/application",
  },
  {
    key: "services",
    label: "Services",
    icon: <Wrench size={18} />,
    route: "/line/systemIntegration/services",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_GAP = 4;

type Props = {
  defaultSelected?: string;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

export default function SystemIntegrationSidebar({
  defaultSelected = "started",
  collapsed,
  onCollapse,
}: Props) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener("change", handler as any);
    return () => mq.removeEventListener("change", handler as any);
  }, []);

  const activeIndex = useMemo(() => {
    const idx = MENU_ITEMS.findIndex((it) => pathname.startsWith(it.route));
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const transformY = activeIndex * (ITEM_HEIGHT + ITEM_GAP);

  const handleClick = (idx: number) => {
    router.push(MENU_ITEMS[idx].route);
    if (!isDesktop) onCollapse(true);
  };

  return (
    <ConfigProvider theme={{ token: { fontFamily: "var(--font-plus-jakarta-sans), sans-serif" } }}>
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
          transform: !isDesktop && collapsed ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 300ms",
          alignSelf: "flex-start",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="px-3 py-6 h-full flex flex-col">
          <div
            className={`font-sans text-lg font-semibold mb-4 px-2 transition-all overflow-hidden ${
              collapsed ? "opacity-0 h-0" : "opacity-100"
            }`}
          >
            System Integrate
          </div>

          <div className="relative flex-1">
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                width: 4,
                height: 36,
                borderRadius: 9999,
                background: "#234b68",
                top: (ITEM_HEIGHT - 36) / 2,
                transform: `translateY(${transformY}px)`,
                transition: "transform 320ms cubic-bezier(.2,.9,.2,1)",
              }}
            />

            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 8,
                right: 8,
                height: ITEM_HEIGHT,
                transform: `translateY(${transformY}px)`,
                transition: "transform 320ms cubic-bezier(.2,.9,.2,1)",
                borderRadius: 12,
                background: "rgba(35, 75, 104, 0.08)",
                zIndex: 0,
              }}
            />

            <ul className="relative z-10">
              {MENU_ITEMS.map((it, idx) => {
                const active = idx === activeIndex;
                return (
                  <li
                    key={it.key}
                    onClick={() => handleClick(idx)}
                    role="button"
                    aria-current={active ? "true" : undefined}
                    className="flex items-center gap-3 cursor-pointer select-none font-sans"
                    style={{
                      height: ITEM_HEIGHT,
                      padding: "0 12px",
                      marginBottom: ITEM_GAP,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: active ? "#234b68" : "transparent",
                        color: active ? "#fff" : "#234b68",
                        transition: "background 300ms, color 300ms",
                      }}
                    >
                      {it.icon}
                    </div>

                    <span
                      className="text-sm font-sans"
                      style={{
                        fontWeight: active ? 600 : 400,
                        color: active ? "#234b68" : "#444",
                        transition: "color 300ms, font-weight 300ms",
                      }}
                    >
                      {it.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Sider>
    </ConfigProvider>
  );
}