import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { getPrismaClient } from '@/lib/prisma';

const ADMIN_COOKIE = 'asws_admin_session';
const SESSION_LIFETIME_MS = 8 * 60 * 60 * 1000;

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET_KEY?.trim();
  if (!secret) throw new Error('ADMIN_SECRET_KEY is not configured.');
  return secret;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET_KEY?.trim());
}

function sessionId(token: string): string {
  return createHmac('sha256', getAdminSecret()).update(`asws-admin-session:${token}`).digest('hex');
}

export function isValidAdminKey(key: string): boolean {
  const expected = Buffer.from(getAdminSecret());
  if (Buffer.byteLength(key) !== expected.length) return false;
  const supplied = Buffer.from(key);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function hasAdminSession(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token || !/^[A-Za-z0-9_-]{40,50}$/.test(token)) return false;

  const prisma = getPrismaClient();
  if (!prisma) return false;
  try {
    const session = await prisma.adminSession.findUnique({ where: { id: sessionId(token) }, select: { expiresAt: true } });
    return Boolean(session && session.expiresAt.getTime() > Date.now());
  } catch (error) {
    console.error('[Admin] Could not validate session:', error);
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const prisma = getPrismaClient();
  if (!prisma) throw new Error('The database is required to start an admin session.');

  const token = randomBytes(32).toString('base64url');
  const id = sessionId(token);
  const expiresAt = new Date(Date.now() + SESSION_LIFETIME_MS);
  await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  await prisma.adminSession.create({ data: { id, expiresAt } });

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (token && /^[A-Za-z0-9_-]{40,50}$/.test(token)) {
    const prisma = getPrismaClient();
    if (prisma) {
      try { await prisma.adminSession.deleteMany({ where: { id: sessionId(token) } }); }
      catch (error) { console.error('[Admin] Could not revoke session:', error); }
    }
  }
  cookieStore.delete(ADMIN_COOKIE);
}
