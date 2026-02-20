import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const TOKEN_NAME = "auth_token";
const encoder = new TextEncoder();

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return encoder.encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ sub: userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<{ sub: string; email: string }> {
  const verified = await jwtVerify(token, getSecret());
  const sub = verified.payload.sub;
  const email = verified.payload.email;

  if (typeof sub !== "string" || typeof email !== "string") {
    throw new Error("Invalid token payload");
  }

  return { sub, email };
}

export function setAuthCookie(token: string): void {
  cookies().set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });
}

export function clearAuthCookie(): void {
  cookies().set({ name: TOKEN_NAME, value: "", path: "/", maxAge: 0 });
}

export function getRequestToken(request: NextRequest): string | null {
  return request.cookies.get(TOKEN_NAME)?.value ?? null;
}

export function getServerToken(): string | null {
  return cookies().get(TOKEN_NAME)?.value ?? null;
}
