'use server';

import { saveContactMessage, savePrayerRequest, saveTestimonial } from '@/lib/data-service';
import { FormSubmissionResult, TestimonialItem } from '@/lib/types';


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

