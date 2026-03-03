import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'required'),
  lastName: z.string().min(1, 'required'),
  email: z.string().email('invalidEmail'),
  phone: z.string().min(1, 'required').regex(/^[\d\s+()-]{6,20}$/, 'invalidPhone'),
  company: z.string().min(1, 'required'),
  positions: z.string().optional(),
  location: z.string().optional(),
  type: z.string().min(1, 'required'),
  source: z.string().optional(),
  message: z.string().min(1, 'required'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
