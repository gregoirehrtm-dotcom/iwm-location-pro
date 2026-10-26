import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;
  
  if (!user || !pass) {
    // Sans identifiants configurés, le site reste fermé en production au lieu de devenir public.
    if (process.env.NODE_ENV === "production") {
      return new NextResponse(
        "Accès protégé non configuré : définissez BASIC_AUTH_USER et BASIC_AUTH_PASSWORD.",
        { status: 503 }
      );
    }
    return NextResponse.next();
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(":");
      if (u === user && rest.join(":") === pass) return NextResponse.next();
    } catch {
      //
    }
  }
  
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="IWM Location"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
