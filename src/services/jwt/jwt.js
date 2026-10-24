import { SignJWT, jwtVerify } from 'jose';


export const jwtSign = async (payload, secret) => {
    const jwt = new SignJWT(payload)
    return jwt.setProtectedHeader({ alg: 'HS256' }).sign(new TextEncoder().encode(secret))
}

export const verify = async (token, secret) => {
    if (!token) {
        return null;
    }
    const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
    )

    return payload
}
