import { getPrismaClient } from './prisma';
import {
  initialSermons,
  initialEvents,
  initialTeam,
  initialTestimonials,
  initialGalleryImages,
} from './church-data';
import {
  SermonItem,
  ProgramEventItem,
  TeamMemberItem,
  ContactMessageInput,
  PrayerRequestInput,
  TestimonialItem,
  TestimonialInput,
  FormSubmissionResult,
  GalleryImageItem,
  ChurchUpdateInput,
  ChurchUpdateItem,
} from './types';

// Static fallback content is used only when no database URL is configured.
const inMemoryTestimonials: TestimonialItem[] = [...initialTestimonials];


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
    const prisma = getPrismaClient();
    if (prisma) {
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
        where: { ...where, deletedAt: null, isPublished: true, AND: [{ OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }] },
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

      return dbSermons.map((s) => ({
        ...s,
        date: s.date.toISOString().split('T')[0],
      }));
    }
  } catch (error) {
    console.error('[DataService] Database query failed for sermons:', error);
    return [];
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
    const prisma = getPrismaClient();
    if (prisma) {
      const dbEvents = await prisma.event.findMany({
        where: { deletedAt: null, isPublished: true, status: { notIn: ['PAST', 'CANCELLED'] }, AND: [{ OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }], ...(category ? { category } : {}) },
        orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
        select: {
          id: true,
          title: true,
          dayOrFrequency: true,
          time: true,
          description: true,
          category: true,
          order: true,
          status: true,
          isFeatured: true,
        },
      });

      return dbEvents.map((e) => ({
        ...e,
        category: e.category as 'WEEKLY' | 'MONTHLY',
      }));
    }
  } catch (error) {
    console.error('[DataService] Database query failed for events:', error);
    return [];
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
    const prisma = getPrismaClient();
    if (prisma) {
      const dbTeam = await prisma.teamMember.findMany({
        where: { deletedAt: null, isPublished: true, AND: [{ OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }] },
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

      return dbTeam;
    }
  } catch (error) {
    console.error('[DataService] Database query failed for team:', error);
    return [];
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
    const prisma = getPrismaClient();
    if (!prisma) return { success: false, message: 'Messages cannot be saved right now. Please try again later.' };
    await prisma.contactMessage.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        subject: data.subject?.trim() || 'General Inquiry',
        message: data.message.trim(),
      },
    });

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
    const prisma = getPrismaClient();
    if (!prisma) return { success: false, message: 'Prayer requests cannot be saved right now. Please try again later.' };
    await prisma.prayerRequest.create({
      data: {
        name: data.name.trim(),
        email: data.email?.trim() || null,
        phone: data.phone?.trim() || null,
        request: data.request.trim(),
        isPrivate: data.isPrivate ?? true,
      },
    });

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

/**
 * Fetches church testimonies of faith and transformation.
 */
export async function getTestimonials(options?: {
  category?: string;
  limit?: number;
}): Promise<TestimonialItem[]> {
  try {
    const prisma = getPrismaClient();
    if (prisma) {
      const where: Record<string, unknown> = { isApproved: true, deletedAt: null, AND: [{ OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }] };
      if (options?.category && options.category !== 'ALL') {
        where.category = options.category;
      }

      const dbTestimonials = await prisma.testimonial.findMany({
        where,
        take: options?.limit ?? 20,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          locationOrRole: true,
          category: true,
          title: true,
          story: true,
          scripture: true,
          createdAt: true,
          isApproved: true,
        },
      });

      return dbTestimonials.map((t) => ({
        ...t,
        date: t.createdAt.toISOString().split('T')[0],
      }));
    }
  } catch (error) {
    console.error('[DataService] Database query failed for testimonials:', error);
    return [];
  }

  // Fallback to in-memory list seeded with initialTestimonials
  let results = [...inMemoryTestimonials];
  if (options?.category && options.category !== 'ALL') {
    results = results.filter((t) => t.category.toLowerCase() === options.category?.toLowerCase());
  }
  if (options?.limit) {
    results = results.slice(0, options.limit);
  }
  return results;
}

/**
 * Server action / mutation: saves a congregation member's testimony of faith.
 */
export async function saveTestimonial(
  data: TestimonialInput
): Promise<FormSubmissionResult<TestimonialItem>> {
  const errors: Record<string, string[]> = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Your name or pseudonym is required (at least 2 characters)'];
  }
  if (!data.title || data.title.trim().length < 3) {
    errors.title = ['Please provide a descriptive title for your testimony'];
  }
  if (!data.story || data.story.trim().length < 15) {
    errors.story = ['Please share at least a few sentences (15+ characters) of what God has done in your life'];
  }
  if (!data.category || data.category.trim().length === 0) {
    errors.category = ['Please select a category for your testimony'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please review the highlighted fields before submitting.',
      errors,
    };
  }

  const newTestimonial: TestimonialItem = {
    id: `test-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    locationOrRole: data.locationOrRole?.trim() || 'Congregation Member',
    category: data.category.trim(),
    title: data.title.trim(),
    story: data.story.trim(),
    scripture: data.scripture?.trim() || null,
    date: new Date().toISOString().split('T')[0],
    isApproved: true,
  };

  try {
    const prisma = getPrismaClient();
    if (!prisma) return { success: false, message: 'Your testimony could not be saved right now. Please try again later.' };
    const created = await prisma.testimonial.create({
      data: {
        name: newTestimonial.name,
        locationOrRole: newTestimonial.locationOrRole,
        category: newTestimonial.category,
        title: newTestimonial.title,
        story: newTestimonial.story,
        scripture: newTestimonial.scripture,
        isApproved: true,
      },
    });
    newTestimonial.id = created.id;

    return {
      success: true,
      message: 'Praise the Lord! Your testimony has been received and shared to glorify God and strengthen the faith of others.',
      data: newTestimonial,
    };
  } catch (error) {
    console.error('[DataService] Error saving testimonial:', error);
    return {
      success: false,
      message: 'Unable to save the testimony right now. Please try again shortly.',
    };
  }
}

/**
 * Fetches gallery photos from recent church events, programs, and outreach missions.
 */
export async function getGalleryImages(options?: {
  category?: string;
  featuredOnly?: boolean;
  limit?: number;
  search?: string;
}): Promise<GalleryImageItem[]> {
  let images: GalleryImageItem[] = [...initialGalleryImages];

  try {
    const prisma = getPrismaClient();
    if (!prisma) return images;
    {
      const dbImages = await prisma.galleryImage.findMany({
        where: { deletedAt: null, isPublished: true, OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] },
        orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }],
        select: {
          id: true,
          title: true,
          category: true,
          description: true,
          imageUrl: true,
          date: true,
          location: true,
        featured: true,
          sortOrder: true,
        },
      });
      images = dbImages.map((image) => ({
        ...image,
        category: image.category as GalleryImageItem['category'],
        date: image.date.toISOString().split('T')[0],
      }));
    }
  } catch (error) {
    console.error('[DataService] Database query failed for gallery:', error);
    images = [];
  }

  if (options?.category && options.category !== 'ALL') {
    const cat = options.category.toUpperCase();
    images = images.filter((img) => img.category === cat);
  }

  if (options?.featuredOnly) {
    images = images.filter((img) => img.featured);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    images = images.filter(
      (img) =>
        img.title.toLowerCase().includes(q) ||
        img.description.toLowerCase().includes(q) ||
        img.location.toLowerCase().includes(q)
    );
  }

  // Sort: featured first, then by date descending
  images.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if ((a.sortOrder ?? 0) !== (b.sortOrder ?? 0)) return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (options?.limit && options.limit > 0) {
    images = images.slice(0, options.limit);
  }

  return images;
}

export async function getChurchUpdates(options?: {
  includeUnpublished?: boolean;
  limit?: number;
}): Promise<ChurchUpdateItem[]> {
  try {
    const prisma = getPrismaClient();
    if (prisma) {
      const updates = await prisma.churchUpdate.findMany({
        where: options?.includeUnpublished ? { deletedAt: null } : { isPublished: true, deletedAt: null, AND: [{ OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }] },
        orderBy: { publishedAt: 'desc' },
        take: options?.limit ?? 50,
      });

      return updates.map((update) => ({
        id: update.id,
        title: update.title,
        summary: update.summary,
        content: update.content,
        imageUrl: update.imageUrl,
        publishedAt: update.publishedAt.toISOString(),
        isPublished: update.isPublished,
      }));
    }
  } catch (error) {
    console.error('[DataService] Database query failed for church updates:', error);
    return [];
  }

  return [];
}

export async function getAdminContentEntries() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return { updates: [], sermons: [], events: [], gallery: [], team: [], testimonials: [], activity: [], imageReferences: [], databaseAvailable: false };
  }

  try {
    const [updates, sermons, events, gallery, team, testimonials, activity] = await Promise.all([
      prisma.churchUpdate.findMany({ orderBy: { publishedAt: 'desc' } }),
      prisma.sermon.findMany({ orderBy: { date: 'desc' } }),
      prisma.event.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.galleryImage.findMany({ orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }] }),
      prisma.teamMember.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.adminActivity.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
    ]);
    const [updateImages, galleryImages, teamImages] = await Promise.all([
      prisma.churchUpdate.findMany({ where: { imageUrl: { not: null } }, select: { imageUrl: true } }),
      prisma.galleryImage.findMany({ select: { imageUrl: true } }),
      prisma.teamMember.findMany({ where: { imageUrl: { not: null } }, select: { imageUrl: true } }),
    ]);
    const imageReferences = [...updateImages, ...galleryImages, ...teamImages].map((image) => image.imageUrl).filter((url): url is string => Boolean(url));
    return { updates, sermons, events, gallery, team, testimonials, activity, imageReferences, databaseAvailable: true };
  } catch (error) {
    console.warn('[DataService] Could not load admin content entries:', error);
    return { updates: [], sermons: [], events: [], gallery: [], team: [], testimonials: [], activity: [], imageReferences: [], databaseAvailable: false };
  }
}

export async function getAdminSubmissions() {
  const prisma = getPrismaClient();
  if (!prisma) return { contactMessages: [], prayerRequests: [], available: false };
  try {
    const [contactMessages, prayerRequests] = await Promise.all([
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
      prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    ]);
    return { contactMessages, prayerRequests, available: true };
  } catch (error) {
    console.warn('[DataService] Could not load admin submissions:', error);
    return { contactMessages: [], prayerRequests: [], available: false };
  }
}

export async function createChurchUpdate(
  data: ChurchUpdateInput
): Promise<FormSubmissionResult<ChurchUpdateItem>> {
  const title = data.title?.trim();
  const summary = data.summary?.trim();
  const content = data.content?.trim();
  const errors: Record<string, string[]> = {};

  if (!title || title.length < 3) errors.title = ['Title must be at least 3 characters.'];
  if (!summary || summary.length < 10) errors.summary = ['Summary must be at least 10 characters.'];
  if (!content || content.length < 20) errors.content = ['Content must be at least 20 characters.'];

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Please complete the required fields.', errors };
  }

  const publishedAt = data.publishedAt ? new Date(data.publishedAt) : new Date();
  const publishAt = data.publishAt ? new Date(data.publishAt) : null;
  if (Number.isNaN(publishedAt.getTime())) {
    return { success: false, message: 'Please provide a valid publication date.' };
  }

  try {
    const prisma = getPrismaClient();
    if (!prisma) return { success: false, message: 'This update could not be saved because the database is unavailable.' };
    {
      const created = await prisma.churchUpdate.create({
        data: {
          title,
          summary,
          content,
          imageUrl: data.imageUrl?.trim() || null,
          publishedAt,
          isPublished: data.isPublished ?? true,
          publishAt,
        },
      });
      return {
        success: true,
        message: 'Church update published successfully.',
        data: {
          id: created.id,
          title: created.title,
          summary: created.summary,
          content: created.content,
          imageUrl: created.imageUrl,
          publishedAt: created.publishedAt.toISOString(),
          isPublished: created.isPublished,
        },
      };
    }

    return { success: false, message: 'This update could not be saved.' };
  } catch (error) {
    console.error('[DataService] Error creating church update:', error);
    return { success: false, message: 'Unable to save the church update right now.' };
  }
}


