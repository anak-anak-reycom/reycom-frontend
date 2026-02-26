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