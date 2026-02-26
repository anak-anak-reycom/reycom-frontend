// middleware.ts (simple pass-through)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // jangan lakukan apa-apa, biarkan client-side yang handle auth
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};