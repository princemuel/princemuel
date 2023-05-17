import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello World' });
  // const secret = request.nextUrl.searchParams.get('secret');

  // if (secret !== process.env.REVALIDATE_SECRET) {
  //   return new NextResponse(
  //     JSON.stringify({ message: 'Invalid Token for Revalidation' }),
  //     {
  //       status: 401,
  //       statusText: 'Unauthorized',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // }

  // const path = request.nextUrl.searchParams.get('path') || '/';
  // revalidatePath(path);
  // return NextResponse.json({ revalidated: true, now: Date.now() });
}
