import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1),
  iconSlug: z.string().min(1),
  category: z.string().min(1),
  level: z.number().min(1).max(5).default(3),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export type SkillInput = z.infer<typeof skillSchema>;
