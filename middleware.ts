import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const adminData = request.cookies.get("adminData")?.value;
  console.log(adminData)

  if(!adminData){    
      return NextResponse.redirect(new URL('/auth/login', request.url))    
  }

  return NextResponse.next();
}

 
export const config = {
  matcher: '/dashboard/:path*',
}
