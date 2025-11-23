import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'site_auth';
const COOKIE_MAX_AGE = 5 * 24 * 60 * 60; // 5 days in seconds

export function middleware(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;
  
  // If no password is set, allow all requests
  if (!sitePassword) {
    return NextResponse.next();
  }

  // Check for valid auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === sitePassword) {
    return NextResponse.next();
  }

  // Check for Basic Auth header
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const base64Credentials = authHeader.split(' ')[1];
    if (base64Credentials) {
      try {
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        
        // For basic auth, we'll accept any username as long as password matches
        if (password === sitePassword) {
          // Create response and set cookie
          const response = NextResponse.next();
          const expires = new Date(Date.now() + COOKIE_MAX_AGE * 1000);
          
          response.cookies.set(COOKIE_NAME, sitePassword, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires,
            sameSite: 'lax',
            path: '/',
          });
          
          return response;
        }
      } catch (error) {
        // Invalid base64, continue to show auth prompt
      }
    }
  }

  // Not authenticated - return 401 with Basic Auth challenge
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Site Access"',
    },
  });
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};

