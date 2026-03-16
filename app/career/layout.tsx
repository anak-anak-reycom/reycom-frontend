// app/line/layout.tsx
"use client";

import React from "react";
import { Layout, Breadcrumb } from "antd";
import CategorySidebar from "../components/navbar/categorySidebar";
import { usePathname } from "next/navigation";

const { Content } = Layout;

export default function CategoryLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname() || "";

  const hideSidebar = 
        pathname === "/career-detail" || pathname.startsWith("career/career-details") || pathname.startsWith('/career/')

  return (
    

    <Layout className="min-h-screen" style={{ background: "white" }}>
      <Layout style={{ background: "white" }}> 

        { !hideSidebar && < CategorySidebar />}

        <Layout className="w-full " style={{ background: "white" }} >
            <div className="w-full flex justify-center " style={{ background: "white" }} >
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
