// app/admin/layout.tsx
"use client";


import React from "react";
import { Layout, Breadcrumb } from "antd";
import AdminSidebar from "../components/admin/SidebarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="min-h-screen">
      <Layout>
        <AdminSidebar />

        <Layout className="w-full">
          <div className="w-full flex justify-center bg-white">
            <div className="w-full lg:max-w-[1000px] px-3 sm:px-6 md:px-8">
              <Layout.Content
                style={{
                  minHeight: 360,
                  padding: 24,
                  background: "var(--ant-layout-content-background, #fff)",
                  borderRadius: 8,
                }}
              >
                {children}
              </Layout.Content>
            </div>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}
