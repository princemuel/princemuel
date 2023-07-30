import { promises as ps } from 'fs';
import { NextResponse } from 'next/server';
import { feed } from '../scripts';

export async function GET(request: Request) {
  const [path, data] = await feed();
  await ps.writeFile(`${path}/atom1.xml`, data.atom1());

  return NextResponse.redirect(new URL('/atom1.xml', request.url));
}
