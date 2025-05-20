import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  try {
    const url = req.nextUrl.pathname;

    // Allow public access to images & Clerk Webhook API
    if (url.startsWith("/icons") || url.startsWith("/images") || url.startsWith("/api/clerk/clerk-webhook")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Applies middleware to all routes except static files
};
