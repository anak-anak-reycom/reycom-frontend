// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const LOGIN_PATH = "/admin-x7k2p9";  
const GATE_COOKIE = "admin_gate";
const GATE_SECRET = process.env.ADMIN_GATE_SECRET ?? "";

export default function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

 
  if (pathname === "/unlock") {
    const key = searchParams.get("key");
    if (key && key === GATE_SECRET) {
      const res = NextResponse.redirect(new URL(LOGIN_PATH, req.url));
      res.cookies.set(GATE_COOKIE, "1", {
        httpOnly: true,   
        secure: process.env.NODE_ENV === "production",     
        sameSite: "strict",
        maxAge: 60 * 30,  
        path: "/",
      });
      return res;
    }
   
    return NextResponse.redirect(new URL("/", req.url));
  }


  if (pathname === LOGIN_PATH) {
    const gate = req.cookies.get(GATE_COOKIE);
    if (!gate || gate.value !== "1") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/unlock", "/admin-x7k2p9"], 
};