import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional(),
  coverUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
