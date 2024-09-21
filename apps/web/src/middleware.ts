import { NextRequest, NextResponse } from "next/server";
import { getLocale, supportedLocales } from "@/lib";
import { decrypt } from "@/lib";
import { cookies } from 'next/headers'

const protectedRoutes = ['/', '/en/contact', '/es/contact', '/en/profile', '/es/profile', '/es/contacts' , '/en/contacts', '/en', '/es']
const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isPublicRoute = publicRoutes.includes(pathname)

  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url));
  }

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !request.nextUrl.pathname.startsWith('/login' || 'register')
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|assets|.*\\..*|_next).*)"
  ],
}