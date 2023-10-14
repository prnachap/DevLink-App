import { isEqual } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const protectedPath = ["/dashboard", "/profile"];
  const isPathProtected = protectedPath.some((path) =>
    isEqual(path, request.nextUrl.pathname)
  );

  if (isPathProtected) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/login`, request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
