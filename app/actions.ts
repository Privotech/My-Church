'use server';

import { createChurchUpdate, saveContactMessage, savePrayerRequest, saveTestimonial } from '@/lib/data-service';
import { clearAdminSession, isAdminConfigured, isValidAdminKey, setAdminSession, hasAdminSession } from '@/lib/admin-auth';
import { FormSubmissionResult, TestimonialItem } from '@/lib/types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


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
    return { success: false, message: 'Admin login is not set up yet. Add ADMIN_SECRET_KEY to .env.local and restart the development server.' };
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

  const result = await createChurchUpdate({
    title: String(formData.get('title') || ''),
    summary: String(formData.get('summary') || ''),
    content: String(formData.get('content') || ''),
    imageUrl: String(formData.get('imageUrl') || ''),
    publishedAt: String(formData.get('publishedAt') || ''),
    isPublished: formData.get('isPublished') === 'on',
  });

  if (result.success) {
    revalidatePath('/admin');
    revalidatePath('/updates');
  }

  return result;
}
