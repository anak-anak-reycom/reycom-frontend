// app/line/layout.tsx
"use client";

import React from "react";
import { Layout, Breadcrumb } from "antd";
import CategorySidebar from "../components/navbar/categorySidebar";

const { Content } = Layout;

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="min-h-screen">
      <Layout> 
        <CategorySidebar />

        <Layout className="w-full " >
            <div className="w-full flex justify-center bg-white" >
                <div className="w-full lg:max-w-[1400px] px-3 sm:px-6 md:px-8">
                  
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
