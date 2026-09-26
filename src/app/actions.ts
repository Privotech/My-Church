'use server';

import { createChurchUpdate, saveContactMessage, savePrayerRequest, saveTestimonial } from '@/lib/data-service';
import { clearAdminSession, isAdminConfigured, isValidAdminKey, setAdminSession, hasAdminSession } from '@/lib/admin-auth';
import { FormSubmissionResult, TestimonialItem } from '@/lib/types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/prisma';
import { deleteCloudinaryImage, deleteCloudinaryAsset, uploadCloudinaryImage } from '@/lib/media-storage';


export async function submitContactAction(
  prevState: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  return await saveContactMessage({
    name,
    email,
    phone,
    subject,
    message,
  });
}

export async function submitPrayerRequestAction(
  prevState: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const request = formData.get('request') as string;
  const isPrivate = formData.get('isPrivate') === 'on';

  return await savePrayerRequest({
    name,
    email,
    phone,
    request,
    isPrivate,
  });
}

export async function submitTestimonialAction(
  prevState: FormSubmissionResult<TestimonialItem> | null,
  formData: FormData
): Promise<FormSubmissionResult<TestimonialItem>> {
  const name = formData.get('name') as string;
  const locationOrRole = formData.get('locationOrRole') as string;
  const category = formData.get('category') as string;
  const title = formData.get('title') as string;
  const story = formData.get('story') as string;
  const scripture = formData.get('scripture') as string;

  return await saveTestimonial({
    name,
    locationOrRole,
    category,
    title,
    story,
    scripture,
  });
}

export async function adminLoginAction(
  _prevState: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  const key = String(formData.get('key') || '');
  if (!key) return { success: false, message: 'Enter the admin secret key.' };
  if (!isAdminConfigured()) {
    return { success: false, message: 'Admin login is not set up yet. Add ADMIN_SECRET_KEY to .env and restart the development server.' };
  }

  try {
    if (!isValidAdminKey(key)) {
      return { success: false, message: 'Invalid admin secret key.' };
    }
    await setAdminSession();
    redirect('/admin');
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
    console.error('[Admin] Login failed:', error);
    return { success: false, message: 'Admin login is not configured correctly.' };
  }
}

export async function adminLogoutAction(): Promise<void> {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function createChurchUpdateAction(
  _prevState: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  if (!(await hasAdminSession())) {
    return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  }

  let imageUrl: string | null;
  try {
    imageUrl = await uploadCloudinaryImage(formData.get('image'));
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Could not upload that image.' };
  }

  const result = await createChurchUpdate({
    title: String(formData.get('title') || ''),
    summary: String(formData.get('summary') || ''),
    content: String(formData.get('content') || ''),
    imageUrl: imageUrl || '',
    publishedAt: String(formData.get('publishedAt') || ''),
    isPublished: formData.get('isPublished') === 'on',
    publishAt: field(formData, 'publishAt'),
  });

  if (result.success) {
    const prisma = getPrismaClient();
    if (prisma) await prisma.adminActivity.create({ data: { section: 'updates', action: 'SAVED', title: String(formData.get('title') || 'Update'), entryId: result.data?.id || null } });
    revalidatePath('/admin');
    revalidatePath('/updates');
  }

  return result;
}

type AdminWrite = (prisma: NonNullable<ReturnType<typeof getPrismaClient>>) => Promise<void>;

async function saveAdminContent(
  formData: FormData,
  write: AdminWrite,
  paths: string[],
): Promise<FormSubmissionResult> {
  if (!(await hasAdminSession())) {
    return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  }
  const prisma = getPrismaClient();
  if (!prisma) return { success: false, message: 'Database is not configured. Add DATABASE_URL to .env before publishing.' };

  try {
    await write(prisma);
    await prisma.adminActivity.create({ data: {
      section: field(formData, '_activitySection') || paths[0]?.replace(/^\//, '') || 'content',
      action: field(formData, '_activityAction') || (field(formData, 'id') ? 'UPDATED' : 'SAVED'),
      title: field(formData, '_activityTitle') || field(formData, 'title') || field(formData, 'name') || 'Content item',
      entryId: field(formData, 'id') || null,
    } });
    paths.forEach((path) => revalidatePath(path));
    revalidatePath('/admin');
    return { success: true, message: 'Saved successfully.' };
  } catch (error) {
    console.error('[Admin] Could not save content:', error);
    return { success: false, message: error instanceof Error && /image|storage/i.test(error.message) ? error.message : 'Could not save this content. Check the database and image storage setup.' };
  }
}

function field(formData: FormData, name: string): string {
  return String(formData.get(name) || '').trim();
}

type AdminDelete = (prisma: NonNullable<ReturnType<typeof getPrismaClient>>, id: string) => Promise<void>;

async function removeAdminContent(formData: FormData, remove: AdminDelete, paths: string[]): Promise<FormSubmissionResult> {
  const id = field(formData, 'id');
  if (!id) return { success: false, message: 'Choose an item to remove.' };
  formData.set('_activityAction', 'MOVED TO TRASH');
  formData.set('_activitySection', paths[0]?.replace(/^\//, '') || 'content');
  return saveAdminContent(formData, (prisma) => remove(prisma, id), paths);
}

export async function deleteChurchUpdateAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  return removeAdminContent(formData, async (prisma, id) => {
    await prisma.churchUpdate.update({ where: { id }, data: { deletedAt: new Date() } });
  }, ['/updates']);
}

export async function deleteSermonAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  return removeAdminContent(formData, async (prisma, id) => { await prisma.sermon.update({ where: { id }, data: { deletedAt: new Date() } }); }, ['/sermons']);
}

export async function deleteEventAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  return removeAdminContent(formData, async (prisma, id) => { await prisma.event.update({ where: { id }, data: { deletedAt: new Date() } }); }, ['/programs']);
}

export async function deleteGalleryImageAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  return removeAdminContent(formData, async (prisma, id) => {
    await prisma.galleryImage.update({ where: { id }, data: { deletedAt: new Date() } });
  }, ['/gallery']);
}

export async function deleteTeamMemberAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  return removeAdminContent(formData, async (prisma, id) => {
    await prisma.teamMember.update({ where: { id }, data: { deletedAt: new Date() } });
  }, ['/team']);
}

export async function deleteTestimonialAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  return removeAdminContent(formData, async (prisma, id) => { await prisma.testimonial.update({ where: { id }, data: { deletedAt: new Date() } }); }, ['/testimonials']);
}

export async function restoreAdminContentAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  const id = field(formData, 'id');
  const section = field(formData, 'section');
  const prisma = getPrismaClient();
  if (!id || !prisma) return { success: false, message: 'Could not restore this content.' };
  try {
    const restore = {
      updates: () => prisma.churchUpdate.update({ where: { id }, data: { deletedAt: null } }),
      sermons: () => prisma.sermon.update({ where: { id }, data: { deletedAt: null } }),
      programs: () => prisma.event.update({ where: { id }, data: { deletedAt: null } }),
      gallery: () => prisma.galleryImage.update({ where: { id }, data: { deletedAt: null } }),
      leadership: () => prisma.teamMember.update({ where: { id }, data: { deletedAt: null } }),
      testimonials: () => prisma.testimonial.update({ where: { id }, data: { deletedAt: null } }),
    }[section];
    if (!restore) return { success: false, message: 'Unknown content section.' };
    await restore();
    await prisma.adminActivity.create({ data: { section, action: 'RESTORED', title: field(formData, 'title') || 'Content item', entryId: id } });
    revalidatePath('/admin');
    revalidatePath(`/${section === 'programs' ? 'programs' : section === 'leadership' ? 'team' : section}`);
    return { success: true, message: 'Content restored.' };
  } catch { return { success: false, message: 'Could not restore this content.' }; }
}

export async function moveGalleryImageAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  const id = field(formData, 'id');
  const direction = field(formData, 'direction');
  const prisma = getPrismaClient();
  if (!prisma || !id || !['up', 'down'].includes(direction)) return { success: false, message: 'Could not reorder this photo.' };
  try {
    const items = await prisma.galleryImage.findMany({ where: { deletedAt: null }, orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }], select: { id: true } });
    const index = items.findIndex((item) => item.id === id);
    const target = direction === 'up' ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= items.length) return { success: false, message: 'This photo is already at the edge.' };
    [items[index], items[target]] = [items[target], items[index]];
    await prisma.$transaction(items.map((item, order) => prisma.galleryImage.update({ where: { id: item.id }, data: { sortOrder: order } })));
    await prisma.adminActivity.create({ data: { section: 'gallery', action: 'REORDERED', title: 'Gallery photos', entryId: id } });
    revalidatePath('/admin'); revalidatePath('/gallery');
    return { success: true, message: 'Gallery order saved.' };
  } catch { return { success: false, message: 'Could not reorder this photo.' }; }
}

export async function deleteUnusedCloudinaryImageAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  const publicId = field(formData, 'publicId');
  const prisma = getPrismaClient();
  if (!publicId || !prisma) return { success: false, message: 'Could not remove this image.' };
  try {
    const [updates, gallery, team] = await Promise.all([
      prisma.churchUpdate.findMany({ where: { imageUrl: { contains: publicId } }, select: { id: true } }),
      prisma.galleryImage.findMany({ where: { imageUrl: { contains: publicId } }, select: { id: true } }),
      prisma.teamMember.findMany({ where: { imageUrl: { contains: publicId } }, select: { id: true } }),
    ]);
    if (updates.length || gallery.length || team.length) return { success: false, message: 'This image is still linked to website content.' };
    await deleteCloudinaryAsset(publicId);
    await prisma.adminActivity.create({ data: { section: 'media', action: 'DELETED UNUSED IMAGE', title: publicId } });
    revalidatePath('/admin');
    return { success: true, message: 'Unused image removed.' };
  } catch { return { success: false, message: 'Could not remove this image.' }; }
}

export async function updateChurchUpdateAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  const id = field(formData, 'id');
  const title = field(formData, 'title');
  const summary = field(formData, 'summary');
  const content = field(formData, 'content');
  const publishAt = optionalDate(field(formData, 'publishAt'));
  const publishedAt = new Date(field(formData, 'publishedAt') || new Date().toISOString());
  if (!id || title.length < 3 || summary.length < 10 || content.length < 20 || Number.isNaN(publishedAt.getTime())) {
    return { success: false, message: 'Check the title, summary, content, and date before saving.' };
  }
  let imageUrl: string | null;
  try { imageUrl = await uploadCloudinaryImage(formData.get('image')); }
  catch (error) { return { success: false, message: error instanceof Error ? error.message : 'Could not upload that image.' }; }
  return saveAdminContent(formData, async (prisma) => {
    await prisma.churchUpdate.update({ where: { id }, data: { title, summary, content, publishedAt, isPublished: formData.get('isPublished') === 'on', publishAt, ...(imageUrl ? { imageUrl } : {}) } });
  }, ['/updates']);
}

export async function updateSermonAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const id = field(formData, 'id');
  const title = field(formData, 'title');
  const speaker = field(formData, 'speaker');
  const description = field(formData, 'description');
  const date = new Date(field(formData, 'date') || new Date().toISOString());
  if (!id || title.length < 3 || speaker.length < 2 || description.length < 10 || Number.isNaN(date.getTime())) return { success: false, message: 'Check the title, speaker, description, and date before saving.' };
  return saveAdminContent(formData, async (prisma) => { await prisma.sermon.update({ where: { id }, data: { title, speaker, description, date, series: field(formData, 'series') || null, videoUrl: field(formData, 'videoUrl') || null, audioUrl: field(formData, 'audioUrl') || null, isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData, 'publishAt')) } }); }, ['/sermons']);
}

export async function updateEventAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const id = field(formData, 'id');
  const title = field(formData, 'title');
  const dayOrFrequency = field(formData, 'dayOrFrequency');
  const time = field(formData, 'time');
  const category = field(formData, 'category');
  if (!id || title.length < 3 || !dayOrFrequency || !time || !['WEEKLY', 'MONTHLY'].includes(category)) return { success: false, message: 'Check the program name, schedule, and type before saving.' };
  return saveAdminContent(formData, async (prisma) => { await prisma.event.update({ where: { id }, data: { title, dayOrFrequency, time, category, description: field(formData, 'description') || null, status: ['UPCOMING','PAST','CANCELLED'].includes(field(formData,'status')) ? field(formData,'status') : 'UPCOMING', eventDate: optionalDate(field(formData,'eventDate')), isFeatured: formData.get('isFeatured') === 'on', isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')) } }); }, ['/programs']);
}

export async function updateGalleryImageAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const id = field(formData, 'id');
  const title = field(formData, 'title');
  const category = field(formData, 'category');
  const description = field(formData, 'description');
  const date = new Date(field(formData, 'date') || new Date().toISOString());
  if (!id || title.length < 3 || description.length < 5 || Number.isNaN(date.getTime()) || !['EVENTS', 'PROGRAMS', 'OUTREACH', 'WORSHIP'].includes(category)) return { success: false, message: 'Check the title, category, description, and date before saving.' };
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  let imageUrl: string | null;
  try { imageUrl = await uploadCloudinaryImage(formData.get('image')); }
  catch (error) { return { success: false, message: error instanceof Error ? error.message : 'Could not upload that image.' }; }
  return saveAdminContent(formData, async (prisma) => { await prisma.galleryImage.update({ where: { id }, data: { title, category, description, date, location: field(formData, 'location') || '', featured: formData.get('featured') === 'on', isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')), ...(imageUrl ? { imageUrl } : {}) } }); }, ['/gallery']);
}

export async function updateTeamMemberAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const id = field(formData, 'id');
  const name = field(formData, 'name');
  const role = field(formData, 'role');
  const quoteOrDescription = field(formData, 'description');
  if (!id || name.length < 2 || role.length < 2 || quoteOrDescription.length < 5) return { success: false, message: 'Check the name, role, and introduction before saving.' };
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  let imageUrl: string | null;
  try { imageUrl = await uploadCloudinaryImage(formData.get('image')); }
  catch (error) { return { success: false, message: error instanceof Error ? error.message : 'Could not upload that image.' }; }
  return saveAdminContent(formData, async (prisma) => { await prisma.teamMember.update({ where: { id }, data: { name, role, quoteOrDescription, isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')), ...(imageUrl ? { imageUrl } : {}) } }); }, ['/team']);
}

export async function updateTestimonialAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const id = field(formData, 'id');
  const name = field(formData, 'name');
  const title = field(formData, 'title');
  const story = field(formData, 'story');
  const category = field(formData, 'category');
  if (!id || name.length < 2 || title.length < 3 || story.length < 15 || !category) return { success: false, message: 'Check the name, title, category, and story before saving.' };
  return saveAdminContent(formData, async (prisma) => { await prisma.testimonial.update({ where: { id }, data: { name, title, story, category, locationOrRole: field(formData, 'locationOrRole') || null, scripture: field(formData, 'scripture') || null, isApproved: formData.get('isApproved') === 'on', publishAt: optionalDate(field(formData,'publishAt')) } }); }, ['/testimonials']);
}

export async function createSermonAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const title = field(formData, 'title');
  const speaker = field(formData, 'speaker');
  const description = field(formData, 'description');
  const date = new Date(field(formData, 'date') || new Date().toISOString());
  if (title.length < 3 || speaker.length < 2 || description.length < 10 || Number.isNaN(date.getTime())) {
    return { success: false, message: 'Add a title, speaker, description, and valid date.' };
  }
  return saveAdminContent(formData, async (prisma) => {
    await prisma.sermon.create({ data: { title, speaker, description, date, videoUrl: field(formData, 'videoUrl') || null, audioUrl: field(formData, 'audioUrl') || null, series: field(formData, 'series') || null, isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')) } });
  }, ['/sermons']);
}

export async function createEventAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const title = field(formData, 'title');
  const dayOrFrequency = field(formData, 'dayOrFrequency');
  const time = field(formData, 'time');
  const category = field(formData, 'category');
  if (title.length < 3 || !dayOrFrequency || !time || !['WEEKLY', 'MONTHLY'].includes(category)) {
    return { success: false, message: 'Add a title, day or frequency, time, and program type.' };
  }
  return saveAdminContent(formData, async (prisma) => {
    await prisma.event.create({ data: { title, dayOrFrequency, time, category, description: field(formData, 'description') || null, order: 0, status: 'UPCOMING', eventDate: optionalDate(field(formData,'eventDate')), isFeatured: formData.get('isFeatured') === 'on', isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')) } });
  }, ['/programs']);
}

export async function createTeamMemberAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const name = field(formData, 'name');
  const role = field(formData, 'role');
  const quoteOrDescription = field(formData, 'description');
  if (name.length < 2 || role.length < 2 || quoteOrDescription.length < 5) {
    return { success: false, message: 'Add the personâ€™s name, role, and a short introduction.' };
  }
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  let imageUrl: string | null;
  try { imageUrl = await uploadCloudinaryImage(formData.get('image')); }
  catch (error) { return { success: false, message: error instanceof Error ? error.message : 'Could not upload that image.' }; }
  return saveAdminContent(formData, async (prisma) => {
    await prisma.teamMember.create({ data: { name, role, quoteOrDescription, imageUrl, order: 0, isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')) } });
  }, ['/team']);
}

export async function createGalleryImageAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const title = field(formData, 'title');
  const category = field(formData, 'category');
  const description = field(formData, 'description');
  const date = new Date(field(formData, 'date') || new Date().toISOString());
  if (title.length < 3 || description.length < 5 || Number.isNaN(date.getTime()) || !['EVENTS', 'PROGRAMS', 'OUTREACH', 'WORSHIP'].includes(category)) {
    return { success: false, message: 'Add a title, category, description, and valid date.' };
  }
  if (!(await hasAdminSession())) return { success: false, message: 'Your admin session has expired. Please sign in again.' };
  const files = formData.getAll('images').filter((value): value is File => value instanceof File && value.size > 0);
  const totalSize = files.reduce((size, file) => size + file.size, 0);
  if (files.length === 0) return { success: false, message: 'Choose at least one photo from your device.' };
  if (files.length > 5) return { success: false, message: 'Choose no more than 5 photos at once.' };
  if (totalSize > 40 * 1024 * 1024) return { success: false, message: 'The selected photos must total 40 MB or less.' };
  const uploadedUrls: string[] = [];
  try {
    for (const file of files) {
      const imageUrl = await uploadCloudinaryImage(file);
      if (!imageUrl) throw new Error('One of the selected photos could not be uploaded.');
      uploadedUrls.push(imageUrl);
    }
  } catch (error) {
    await Promise.allSettled(uploadedUrls.map((imageUrl) => deleteCloudinaryImage(imageUrl)));
    return { success: false, message: error instanceof Error ? error.message : 'Could not upload the selected photos.' };
  }

  const result = await saveAdminContent(formData, async (prisma) => {
    await prisma.galleryImage.createMany({
      data: uploadedUrls.map((imageUrl, index) => ({ title: files.length > 1 ? `${title} (${index + 1})` : title, category, description, date, location: field(formData, 'location') || 'Ogbomosho', imageUrl, featured: formData.get('featured') === 'on', isPublished: formData.get('isPublished') === 'on', publishAt: optionalDate(field(formData,'publishAt')) })),
    });
  }, ['/gallery']);
  if (!result.success) await Promise.allSettled(uploadedUrls.map((imageUrl) => deleteCloudinaryImage(imageUrl)));
  return { ...result, message: result.success ? `${uploadedUrls.length} photo${uploadedUrls.length === 1 ? '' : 's'} added to the gallery.` : result.message };
}

export async function createTestimonialAction(_state: FormSubmissionResult | null, formData: FormData): Promise<FormSubmissionResult> {
  const name = field(formData, 'name');
  const title = field(formData, 'title');
  const story = field(formData, 'story');
  const category = field(formData, 'category');
  if (name.length < 2 || title.length < 3 || story.length < 15 || !category) {
    return { success: false, message: 'Add a name, testimony title, category, and story (at least 15 characters).' };
  }
  return saveAdminContent(formData, async (prisma) => {
    await prisma.testimonial.create({ data: { name, title, story, category, locationOrRole: field(formData, 'locationOrRole') || null, scripture: field(formData, 'scripture') || null, isApproved: formData.get('isApproved') === 'on', publishAt: optionalDate(field(formData,'publishAt')) } });
  }, ['/testimonials']);
}

function optionalDate(value: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
