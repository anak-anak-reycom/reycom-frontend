// app/line/layout.tsx
"use client";

import React from "react";
import { Layout, Breadcrumb } from "antd";
import SystemIntegrationSidebar from "../components/navbar/Sidebar";

const { Content } = Layout;

export default function SystemIntegrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="min-h-screen">
      <Layout>
        
        <SystemIntegrationSidebar />

        <Layout className="w-full">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1000px] px-6">
                  
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
