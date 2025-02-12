import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value || request.headers.get("isLoggedIn")

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url)) // Redirect to login page
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/valentine"], // Protect the `/valentine` route
}
