import { NextResponse } from 'next/server';

export function middleware(request) {
  const referer = request.headers.get('referer');
  const allowedHost = 'https://control-de-kdm.vercel.app';

  // Bloquear si el referer no es tu dominio
  if (referer && !referer.startsWith(allowedHost)) {
    return new Response('Hotlinking no permitido', { status: 403 });
  }

  return NextResponse.next();
}
