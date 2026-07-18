'use server';

import { headers } from 'next/headers';
import { submitLeadToGoogleSheets } from '@/lib/googleSheets';
import { contactSchema, type ContactFormData } from '@/lib/validation';

export async function submitContactForm(formData: ContactFormData) {
  // 1. Honeypot check (bot prevention)
  if (formData.website_field) {
    // Fail silently to the bot
    return { success: true, message: 'Inquiry processed successfully (honeypot).' };
  }

  // 2. Validate using Zod
  const result = contactSchema.safeParse(formData);
  if (!result.success) {
    const errorMap: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        errorMap[issue.path[0] as string] = issue.message;
      }
    });
    return {
      success: false,
      errors: errorMap,
    };
  }

  // 3. Resolve request headers for IP and User-Agent
  const headerList = await headers();
  const userAgent = headerList.get('user-agent') || 'Unknown';
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || 'Unknown';

  try {
    await submitLeadToGoogleSheets({
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      ip,
      userAgent,
    });


    return {
      success: true,
      message: 'Thank you! Your inquiry has been submitted. Our engineering team will contact you shortly.',
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || 'Failed to submit form. Please check your network and try again.',
    };
  }
}
