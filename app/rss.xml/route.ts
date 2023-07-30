import { promises as ps } from 'fs';
import { NextResponse } from 'next/server';
import { feed } from '../scripts';

export async function GET(request: Request) {
  const [path, data] = await feed();
  await ps.writeFile(`${path}/feed.xml`, data.rss2());

  return NextResponse.redirect(new URL('/feed.xml', request.url));
}
