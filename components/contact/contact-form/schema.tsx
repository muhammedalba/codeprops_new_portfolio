import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid business email"),
  subject: z.string().min(2, "Subject is required"),
  projectType: z.string().min(1, "Please select a service interest"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;