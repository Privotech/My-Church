import { PrismaClient } from '@prisma/client';

/**
 * Checks whether DATABASE_URL is a valid PostgreSQL connection string.
 * Valid URLs must begin with postgresql:// or postgres://.
 */
export function isPostgresConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('postgresql://') || url.startsWith('postgres://');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

/**
 * Returns the PrismaClient instance if a valid PostgreSQL DATABASE_URL is configured,
 * otherwise returns null without throwing or triggering validation errors.
 */
export function getPrismaClient(): PrismaClient | null {
  if (!isPostgresConfigured()) {
    return null;
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client;
    }

    return client;
  } catch (err) {
    console.warn('[Prisma] Could not initialize PrismaClient:', err);
    return null;
  }
}

// Deprecated export for backwards compatibility
export const prisma = getPrismaClient();

