import { cookies } from 'next/headers';
import { verify } from '@/services/jwt/jwt';

export const getUserserver = async () => {

    // read cookies 

    const cookieStore = await cookies();
    const token = cookieStore.get('lrg-token')?.value;
    const verifyToken = await verify(token, process.env.JWT_SECRET || 'default_secret');
    return verifyToken;

}