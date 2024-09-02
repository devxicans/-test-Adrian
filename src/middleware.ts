import { NextRequest, NextResponse } from "next/server";
import { getLocale, supportedLocales } from "@/lib";
import { decrypt } from "@/lib";
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/', '/en/contact', '/es/contact', '/en/profile', '/es/profile', '/es/contacts' , '/en/contacts', '/en', '/es']
const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const { pathname } = request.nextUrl
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isPublicRoute = publicRoutes.includes(pathname)

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // 6. Redirect to / if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !request.nextUrl.pathname.startsWith('/login' || 'register')
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // Check if there is any supported locale in the pathname

  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    "/((?!api|assets|.*\\..*|_next).*)"
  ],
}