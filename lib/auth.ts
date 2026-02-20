import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const COOKIE_NAME = 'auth_token';
const encoder = new TextEncoder();

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing');
  }
  return encoder.encode(secret);
}

export type AuthPayload = {
  sub: string;
  email: string;
  name: string;
};

export async function signAuthToken(payload: AuthPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret());
}

export async function verifyAuthToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify<AuthPayload>(token, getJwtSecret());
    return payload;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string): void {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAuthCookie(): void {
  cookies().delete(COOKIE_NAME);
}

export function getAuthCookieFromRequest(request: NextRequest): string | undefined {
  return request.cookies.get(COOKIE_NAME)?.value;
}

export async function getCurrentUserFromCookies(): Promise<AuthPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyAuthToken(token);
}
