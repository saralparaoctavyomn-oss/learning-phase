import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ["/", "/login", "/_next", "/favicon.ico"];
const LOGIN_PATH = "/login";

export default function proxy(request) {
    const { pathname } = request.nextUrl;
    console.log("Proxy Middleware: Request Pathname:", pathname);

    // If it matches a public path, allow access
    if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }


    // Correct
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};