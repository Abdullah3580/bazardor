import {NextResponse} from "next/server";
import {getSessionCookie} from "better-auth/cookies";
export function middleware(req){
  if(getSessionCookie(req))return NextResponse.next();
  const u=new URL("/signin",req.url);
  u.searchParams.set("redirect",req.nextUrl.pathname);u.searchParams.set("protected","1");
  return NextResponse.redirect(u);
}
export const config={matcher:["/product/:path*","/profile/:path*"]};
