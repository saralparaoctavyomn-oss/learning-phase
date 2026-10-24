import { NextResponse } from 'next/server'
import { getUserserver } from '@/lib/getUserserver'

const PUBLIC_PATHS = [
  '/',
  '/auth',
  '/api/auth',
  '/api/getpost',
  '/',
  '/_next',
  '/favicon.ico',
  '/13491650_3840_2160_50fps.mp4',
  '/scholl-view.jpg',
  '/techer.webp',
  '/principle.webp',
  '/academic.webp',
  '/campus.webp',
  '/student.webp',
  '/class.webp'
]

const LOGIN_PATH = '/'


// Define which routes each role can access
const ROLE_ACCESS = {
  admin: ['/admin', '/admin/students', "/api/admin"],
  teacher: ['/teacher'],
  student: ['/student'],
}

export async function proxy(request) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (
    PUBLIC_PATHS.some(
      (path) =>
        pathname === path ||
        (path !== '/' && pathname.startsWith(`${path}/`))
    )
  ) {
    return NextResponse.next()
  }

  // Get the authenticated user
  const token = await getUserserver()

  // Redirect unauthenticated users to login
  if (!token?.role) {
    // console.log("run no entry")
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = LOGIN_PATH
    return NextResponse.redirect(loginUrl)
  }

  const { role } = token
  // console.log(role)

  // Check whether the role is valid
  if (!ROLE_ACCESS[role]) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }

  // Check role permissions
  const hasAccess = ROLE_ACCESS[role].some(
    (path) =>
      pathname === path || pathname.startsWith(`${path}/`)
  )

  if (!hasAccess) {
    const destination = request.nextUrl.clone()
    destination.pathname = LOGIN_PATH
    return NextResponse.redirect(destination)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}