import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  businessType: z.string().min(1, { message: 'Please select your business type' }),
  requirement: z.string().min(1, { message: 'Please select your primary requirement' }),
  productInterested: z.string().min(1, { message: 'Please select a product category' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  budget: z.string().min(1, { message: 'Please select a budget range' }),
  timeline: z.string().min(1, { message: 'Please select an estimated timeline' }),
  source: z.string().min(1, { message: 'Please select how you heard about us' }),
  website_field: z.string().optional(), // Honeypot field (bot check)
});

export type ContactFormData = z.infer<typeof contactSchema>;
