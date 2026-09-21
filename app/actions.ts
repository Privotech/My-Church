'use server';

import { saveContactMessage, savePrayerRequest } from '@/lib/data-service';
import { FormSubmissionResult } from '@/lib/types';

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
