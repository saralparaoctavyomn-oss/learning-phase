import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('lrg-token');
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}

