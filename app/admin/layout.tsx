// app/admin/layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import AdminSidebar from "../components/admin/SidebarAdmin";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token) {
            // jika tidak ada token => redirect ke halaman login admi
            router.replace("/login");
            return;
        }


        setChecked(true);
    }, [router]);

    if (!checked) {
        return null; //
    }


return (
  <Layout 
    className="min-h-screen" 
    style={{ 
      marginTop: "-80px",  
      background: "white" 
    }}
  >
    <Layout>
      <AdminSidebar />
      <Layout className="w-full" style={{ background: "white" }}>
        <div className="w-full flex justify-center" style={{ background: "white" }}>
          <div className="w-full lg:max-w-[1400px] px-3 sm:px-6 md:px-8">
            <Layout.Content
              style={{
                minHeight: 360,
                padding: 24,
                background: "white",  
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