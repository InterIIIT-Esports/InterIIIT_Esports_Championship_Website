import { NextResponse } from 'next/server'

export default function proxy(request) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for the adminAuth cookie flag
    const hasAdminCookie = request.cookies.has('adminAuth')
    
    if (!hasAdminCookie) {
      // Instantly redirect to admin login before serving any React/JS bundles
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
