import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid Token for Revalidation' }),
      {
        status: 401,
        statusText: 'UNAUTHORIZED',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const path = request.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
