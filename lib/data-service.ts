import { prisma } from './prisma';
import {
  initialSermons,
  initialEvents,
  initialTeam,
} from './church-data';
import {
  SermonItem,
  ProgramEventItem,
  TeamMemberItem,
  ContactMessageInput,
  PrayerRequestInput,
  FormSubmissionResult,
} from './types';

/**
 * Optimized query: fetches recent sermons.
 * Uses index on date(desc) and speaker, selects only necessary fields.
 */
export async function getSermons(options?: {
  limit?: number;
  speaker?: string;
  search?: string;
}): Promise<SermonItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const where: Record<string, unknown> = {};
      if (options?.speaker) {
        where.speaker = options.speaker;
      }
      if (options?.search) {
        where.OR = [
          { title: { contains: options.search, mode: 'insensitive' } },
          { description: { contains: options.search, mode: 'insensitive' } },
        ];
      }

      const dbSermons = await prisma.sermon.findMany({
        where,
        take: options?.limit ?? 12,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
          speaker: true,
          date: true,
          description: true,
          videoUrl: true,
          audioUrl: true,
          series: true,
        },
      });

      if (dbSermons && dbSermons.length > 0) {
        return dbSermons.map((s) => ({
          ...s,
          date: s.date.toISOString().split('T')[0],
        }));
      }
    }
  } catch (error) {
    console.warn('[DataService] Database query failed, falling back to static data:', error);
  }

  // Fallback to static seed data
  let filtered = [...initialSermons];
  if (options?.speaker) {
    filtered = filtered.filter((s) => s.speaker === options.speaker);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }
  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }
  return filtered;
}

/**
 * Optimized query: fetches church events/programs categorized by weekly/monthly.
 */
export async function getEvents(category?: 'WEEKLY' | 'MONTHLY'): Promise<ProgramEventItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbEvents = await prisma.event.findMany({
        where: category ? { category } : undefined,
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          dayOrFrequency: true,
          time: true,
          description: true,
          category: true,
          order: true,
        },
      });

      if (dbEvents && dbEvents.length > 0) {
        return dbEvents.map((e) => ({
          ...e,
          category: e.category as 'WEEKLY' | 'MONTHLY',
        }));
      }
    }
  } catch (error) {
    console.warn('[DataService] Database query failed for events, falling back:', error);
  }

  return category
    ? initialEvents.filter((e) => e.category === category)
    : initialEvents;
}

/**
 * Optimized query: fetches church leadership team members in order.
 */
export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbTeam = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          role: true,
          quoteOrDescription: true,
          imageUrl: true,
          order: true,
        },
      });

      if (dbTeam && dbTeam.length > 0) {
        return dbTeam;
      }
    }
  } catch (error) {
    console.warn('[DataService] Database query failed for team, falling back:', error);
  }

  return initialTeam;
}

/**
 * Server action / mutation: saves a contact message to PostgreSQL.
 */
export async function saveContactMessage(
  data: ContactMessageInput
): Promise<FormSubmissionResult> {
  // Server-side validation
  const errors: Record<string, string[]> = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Name is required (at least 2 characters)'];
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ['A valid email address is required'];
  }
  if (!data.message || data.message.trim().length < 5) {
    errors.message = ['Message is required (at least 5 characters)'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted form errors.',
      errors,
    };
  }

  try {
    if (process.env.DATABASE_URL) {
      await prisma.contactMessage.create({
        data: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || null,
          subject: data.subject?.trim() || 'General Inquiry',
          message: data.message.trim(),
        },
      });
    } else {
      console.log('[Contact] Received message (offline store):', data);
    }

    return {
      success: true,
      message: 'Thank you for reaching out to us. We will get back to you shortly!',
    };
  } catch (error) {
    console.error('[DataService] Error saving contact message:', error);
    return {
      success: false,
      message: 'Unable to send message at this time. Please call us directly at 08035745728.',
    };
  }
}

/**
 * Server action / mutation: saves a prayer request to PostgreSQL.
 */
export async function savePrayerRequest(
  data: PrayerRequestInput
): Promise<FormSubmissionResult> {
  const errors: Record<string, string[]> = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Your name is required'];
  }
  if (!data.request || data.request.trim().length < 5) {
    errors.request = ['Prayer request is required'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please provide all required fields.',
      errors,
    };
  }

  try {
    if (process.env.DATABASE_URL) {
      await prisma.prayerRequest.create({
        data: {
          name: data.name.trim(),
          email: data.email?.trim() || null,
          phone: data.phone?.trim() || null,
          request: data.request.trim(),
          isPrivate: data.isPrivate ?? true,
        },
      });
    } else {
      console.log('[PrayerRequest] Received prayer request (offline store):', data);
    }

    return {
      success: true,
      message: 'Your prayer request has been received. Our pastoral team and prayer warriors are standing in faith with you.',
    };
  } catch (error) {
    console.error('[DataService] Error saving prayer request:', error);
    return {
      success: false,
      message: 'Unable to submit prayer request at this moment. Please try again.',
    };
  }
}
