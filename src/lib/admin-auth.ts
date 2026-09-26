import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const ADMIN_COOKIE = 'asws_admin_session';

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET_KEY?.trim();
  if (!secret) {
    throw new Error('ADMIN_SECRET_KEY is not configured.');
  }
  return secret;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET_KEY?.trim());
}

function expectedSession(): string {
  return createHmac('sha256', getAdminSecret()).update('asws-admin').digest('hex');
}

export function isValidAdminKey(key: string): boolean {
  const supplied = Buffer.from(key);
  const expected = Buffer.from(getAdminSecret());
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function hasAdminSession(): Promise<boolean> {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!session) return false;
  const supplied = Buffer.from(session);
  const expected = Buffer.from(expectedSession());
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function setAdminSession(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, expectedSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
}
