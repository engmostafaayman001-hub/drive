import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, hashPassword, setAuthCookie } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash
    }
  });

  const token = await createToken(user.id, user.email);
  setAuthCookie(token);

  return NextResponse.json({ id: user.id, email: user.email });
}
