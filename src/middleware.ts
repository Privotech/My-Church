import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  const isDevelopment = process.env.NODE_ENV === 'development';
  const scriptSource = isDevelopment
    ? "'self' 'unsafe-eval' 'unsafe-inline'"
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;
  const developmentConnections = isDevelopment ? ' ws: wss:' : '';
  const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src ${scriptSource}`,
    "script-src-attr 'none'",
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com",
    "font-src 'self' data:",
    `connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com${developmentConnections}`,
    "media-src 'self' blob: https://res.cloudinary.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicy);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
