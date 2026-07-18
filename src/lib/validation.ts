import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  website_field: z.string().optional(), // Honeypot field (bot check)
});

export type ContactFormData = z.infer<typeof contactSchema>;

