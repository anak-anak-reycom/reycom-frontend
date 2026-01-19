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

        <Layout style={{ padding: "24px" }}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Line</Breadcrumb.Item>
            <Breadcrumb.Item>System Integration</Breadcrumb.Item>
          </Breadcrumb>

          <Content
            style={{
              minHeight: 360,
              padding: 24,
              background: "var(--ant-layout-content-background, #fff)",
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
