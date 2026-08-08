'use server';

import { headers } from 'next/headers';
import { submitLeadToGoogleSheets } from '@/lib/googleSheets';
import { contactSchema, type ContactFormData } from '@/lib/validation';
import { z } from 'zod';

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

  // Construct fallback message content for older script deployments
  let messageWithMetadata = formData.message || '';
  if (formData.email || formData.companyName || formData.productInterested) {
    const metaDetails = [
      formData.email ? `Email: ${formData.email}` : null,
      formData.companyName ? `Company: ${formData.companyName}` : null,
      formData.productInterested ? `Product: ${formData.productInterested}` : null,
      formData.city || formData.state ? `Location: ${[formData.city, formData.state].filter(Boolean).join(', ')}` : null,
      formData.budget ? `Budget: ${formData.budget}` : null,
      formData.timeline ? `Timeline: ${formData.timeline}` : null,
    ].filter(Boolean).join(' | ');

    if (metaDetails) {
      messageWithMetadata = messageWithMetadata 
        ? `${messageWithMetadata}\n\n[Inquiry Meta] ${metaDetails}` 
        : `[Inquiry Meta] ${metaDetails}`;
    }
  }

  try {
    await submitLeadToGoogleSheets({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      companyName: formData.companyName,
      city: formData.city,
      state: formData.state,
      businessType: formData.businessType,
      requirement: formData.requirement,
      productInterested: formData.productInterested,
      budget: formData.budget,
      timeline: formData.timeline,
      source: formData.source,
      message: messageWithMetadata,
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

export async function submitNewsletterSubscription(email: string) {
  const result = z.string().email({ message: 'Invalid email address' }).safeParse(email);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const headerList = await headers();
  const userAgent = headerList.get('user-agent') || 'Unknown';
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || 'Unknown';

  try {
    await submitLeadToGoogleSheets({
      name: 'Newsletter Subscriber',
      phone: 'N/A',
      email,
      message: `Newsletter Subscription Email: ${email}`, // Fallback for older script versions
      requirement: 'Newsletter Subscription',
      source: 'Blog Newsletter Form',
      ip,
      userAgent,
    });

    return {
      success: true,
      message: 'Thank you! You have successfully subscribed to our technical updates.',
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || 'Failed to subscribe. Please try again later.',
    };
  }
}
