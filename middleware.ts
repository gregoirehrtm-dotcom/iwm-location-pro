import { NextRequest, NextResponse } from 'next/server';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="IWM Location (private preview)"' },
  });
}

export function middleware(req: NextRequest) {
  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;
  if (!username || !password) return unauthorized();

  const header = req.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const i = decoded.indexOf(':');
      if (i >= 0 && decoded.slice(0, i) === username && decoded.slice(i + 1) === password) {
        return NextResponse.next();
      }
    } catch {
      // fall through
    }
  }
  return unauthorized();
}

export const config = {
  matcher: '/:path*',
};
