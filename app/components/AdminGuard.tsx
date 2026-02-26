// components/AdminGuard.tsx (client component)
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
            return;
        }
        // decode payload sederhana:
        try {
            const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
            if (payload.role !== "admin") {
                router.replace("/not-found");
            }
        } catch {
            router.replace("/login");
        }
    }, [router]);

    return <>{children}</>;
}