import { createHmac } from 'node:crypto';
import { headers } from 'next/headers';
import { getPrismaClient } from '@/lib/prisma';

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number } | { allowed: false; unavailable: true };

/** Persistent per-IP limits, so the guard works across serverless instances. */
export async function enforceRequestRateLimit(scope: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const prisma = getPrismaClient();
  if (!prisma) return { allowed: false, unavailable: true };

  try {
    const requestHeaders = await headers();
    const forwarded = requestHeaders.get('x-vercel-forwarded-for') || requestHeaders.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || requestHeaders.get('x-real-ip') || 'unknown';
    const rateKeySecret = process.env.ADMIN_SECRET_KEY || process.env.DATABASE_URL || 'local-rate-limit-key';
    const id = createHmac('sha256', rateKeySecret).update(`${scope}:${ip}`).digest('hex');
    const resetAt = new Date(Date.now() + windowMs);

    const rows = await prisma.$queryRaw<{ count: number; resetAt: Date }[]>`
      INSERT INTO "RateLimitBucket" ("id", "count", "resetAt")
      VALUES (${id}, 1, ${resetAt})
      ON CONFLICT ("id") DO UPDATE SET
        "count" = CASE WHEN "RateLimitBucket"."resetAt" <= CURRENT_TIMESTAMP THEN 1 ELSE "RateLimitBucket"."count" + 1 END,
        "resetAt" = CASE WHEN "RateLimitBucket"."resetAt" <= CURRENT_TIMESTAMP THEN EXCLUDED."resetAt" ELSE "RateLimitBucket"."resetAt" END
      RETURNING "count", "resetAt"
    `;

    if (Math.random() < 0.02) {
      void prisma.rateLimitBucket.deleteMany({ where: { resetAt: { lt: new Date() } } }).catch(() => undefined);
    }

    const bucket = rows[0];
    if (bucket.count <= limit) return { allowed: true };
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt.getTime() - Date.now()) / 1000)) };
  } catch (error) {
    console.error('[RateLimit] Could not check request limit:', error);
    return { allowed: false, unavailable: true };
  }
}
