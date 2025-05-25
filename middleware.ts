// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/en' 
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// ↓↓↓ مهم جداً عشان الميدل وير يتنفذ بس على المسارات المطلوبة
export const config = {
  matcher: ['/', '/((?!_next|favicon.ico).*)'],
}
