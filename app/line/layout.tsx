// SystemIntegrationLayout.tsx - FIXED
"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import SystemIntegrationSidebar from "../components/navbar/Sidebar";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";

const { Content } = Layout;

export default function SystemIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [isLarge, setIsLarge]     = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsLarge(!!e.matches);
      setCollapsed(!e.matches);
    };
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  useEffect(() => {
    const mobile = !isLarge;
    if (!collapsed && mobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [collapsed, isLarge]);

  return (
    
    <Layout className="min-h-screen" style={{ background: "white" }}>
      <Layout className="items-start" style={{ background: "white", overflow: "visible" }}>
        <SystemIntegrationSidebar
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />

          <Layout className="w-full min-w-0" style={{ background: "white" }}>
          <div
            style={{
              padding: "4px 8px",      
              height: "auto",          
              lineHeight: "normal",
              display: "flex",
              alignItems: "center",
              position: "sticky",   
              top: 80,             
              justifyContent: "flex-start",
            }}
          >
             <button
                onClick={() => setCollapsed(prev => !prev)}
                className="p-2 rounded-md hover:bg-slate-100 lg:hidden"
                aria-label={collapsed ? "Open menu" : "Close menu"}
              >
                {collapsed ? <MenuIcon size={18} /> : <XIcon size={18} />}
              </button>
          </div>

          {/* Mobile overlay */}
          <div
            className={`fixed inset-0 z-30transition-opacity lg:hidden ${
              !collapsed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setCollapsed(true)}
            aria-hidden="true"
            style={{ background: "transparent" }}
          />

        <div className="w-full flex justify-center" style={{ background: "white" }}>
            <div className="w-full lg:max-w-[1000px] px-3 sm:px-6 md:px-8">
              <Content
                style={{
                  minHeight: 360,
                  padding: 24,
                  background: "white",
                  borderRadius: 8,
                }}
              >
                {children}
              </Content>
            </div>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}