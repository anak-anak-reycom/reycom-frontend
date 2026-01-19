// app/line/system-integration/page.tsx
"use client";

import { Layout, Breadcrumb } from "antd";
import SystemIntegrationSidebar from "@/app/components/navbar/Sidebar";

const { Content } = Layout;

export default function SystemIntegrationPage() {
  return (
    <Layout className="min-h-screen pt-[80px]">
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
              background: "var(--ant-layout-content-background, #fff)",
              padding: 24,
              borderRadius: 8,
            }}
          >
            {/* Konten utama halaman—ganti sesuai kebutuhan */}
            <h1 className="text-2xl font-semibold mb-4">System Integrate</h1>

            <p className="mb-4">Pilih sub-topik di sidebar untuk melihat detail masing-masing layanan.</p>

            <div className="bg-white rounded-lg shadow-sm p-6">
              Konten default / overview System Integration — tambahkan deskripsi, gambar, dll.
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
