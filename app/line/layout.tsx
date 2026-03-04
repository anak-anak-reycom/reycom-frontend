"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import SystemIntegrationSidebar from "../components/navbar/Sidebar";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";

const { Header, Content } = Layout;

export default function SystemIntegrationLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true); 
  const [isLarge, setIsLarge] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(min-width: 1024px)"); // lg
      const handler = (e: MediaQueryListEvent | MediaQueryList) => {
        setIsLarge(!!e.matches);
        setCollapsed(!e.matches);
      };
      handler(mq);
      
      if ("addEventListener" in mq) {
       
        mq.addEventListener("change", handler as any);
      } 
      return () => {
        if ("removeEventListener" in mq) {
          mq.removeEventListener("change", handler as any);
        } 
      };
    }
  }, []);

  
  useEffect(() => {
    const body = document.body;
    const mobile = !isLarge;
    if (!collapsed && mobile) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => body.classList.remove("overflow-hidden");
  }, [collapsed, isLarge]);

  return (
    <Layout className="min-h-screen">
      <Layout>
        <SystemIntegrationSidebar
          collapsed={collapsed}
          onCollapse={(val) => setCollapsed(val)}
        />

        <Layout className="w-full">
          
          <Header style={{ padding: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <button
              onClick={() => setCollapsed(prev => !prev)}
              className="p-2 rounded-md hover:bg-slate-100 lg:hidden"
              aria-label={collapsed ? "Open menu" : "Close menu"}
            >
              {collapsed ? <MenuIcon size={18} /> : <XIcon size={18} />}
            </button>
          </Header>

          <div
            className={`fixed inset-0 z-40 transition-opacity lg:hidden ${!collapsed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={() => setCollapsed(true)}
            aria-hidden="true"
            style={{ background: "transparent" }} 
          />

              <div className="w-full flex justify-center bg-white">
                <div className="w-full lg:max-w-[1000px] px-3 sm:px-6 md:px-8">
                  <Content
                    style={{
                      minHeight: 360,
                      padding: 24,
                      background: "var(--ant-layout-content-background, #fffF)",
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