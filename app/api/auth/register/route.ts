import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation';
import { setAuthCookie, signAuthToken } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash
    }
  });

  const token = await signAuthToken({ sub: user.id, email: user.email, name: user.name });
  setAuthCookie(token);

  return NextResponse.json({ id: user.id, email: user.email, name: user.name }, { status: 201 });
}
