import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mediul de proba se inchide complet: cere autentificare de baza si marcheaza
// fiecare raspuns cu noindex. Fara SITE_ENV=staging, middleware-ul nu adauga nimic,
// ca productia sa nu mosteneasca noindex-ul din staging.
export function middleware(request: NextRequest) {
  if (process.env.SITE_ENV !== 'staging') {
    return NextResponse.next()
  }

  const user = process.env.BASIC_AUTH_USER
  const pass = process.env.BASIC_AUTH_PASS

  if (user && pass) {
    const header = request.headers.get('authorization')
    const asteptat = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64')
    if (header !== asteptat) {
      return new NextResponse('Autentificare necesara', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="3S staging", charset="UTF-8"',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }
  }

  const raspuns = NextResponse.next()
  raspuns.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return raspuns
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
