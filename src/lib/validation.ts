import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  message: z.string().optional(),
  website_field: z.string().optional(), // Honeypot field (bot check)
  // Optional fields for product inquiries & newsletter submissions
  email: z.string().email().optional().or(z.literal('')),
  companyName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  businessType: z.string().optional(),
  requirement: z.string().optional(),
  productInterested: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  source: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;


