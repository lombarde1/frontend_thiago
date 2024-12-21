import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userId = request.cookies.get('userId');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // If no auth and trying to access protected route
  if (!token && !userId && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access auth routes
  if (token && userId && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};