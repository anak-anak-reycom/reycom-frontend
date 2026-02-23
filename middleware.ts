// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


function parseJwtPayload(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

   
    const decoded = atob(b64);
    try {
      return JSON.parse(decoded);
    } catch {
      const uriDecoded = decodeURIComponent(
        Array.prototype
          .map
          .call(decoded, (c: string) => {
            const h = c.charCodeAt(0).toString(16).padStart(2, "0");
            return "%" + h;
          })
          .join("")
      );
      return JSON.parse(uriDecoded);
    }
  } catch (e) {
    return null;
  }
}
 
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

 
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  
  const token = req.cookies.get("token")?.value ?? req.cookies.get("admin_token")?.value;

 
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

 
  const payload = parseJwtPayload(token);
  if (!payload) {
    
    return NextResponse.redirect(new URL("/login", req.url));
  }


  const nowSeconds = Math.floor(Date.now() / 1000);
  if (payload.exp && typeof payload.exp === "number" && payload.exp <= nowSeconds) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

 
  if (!payload.name_admin && !payload.role && !payload.isAdmin) {
 
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};