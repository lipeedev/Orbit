import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('orbit.token')?.value

  const publicRoutes = ['/auth/signin', '/auth/signup'];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    try {
      await jwtVerify(token ?? '', secret);
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (err) {
      return NextResponse.next();
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

