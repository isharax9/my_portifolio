import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional().nullable(),
  location: z.string().min(1),
  description: z.string().min(1),
  logoUrl: z.string().url().optional().or(z.literal("")).nullable(),
  order: z.number().default(0),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
