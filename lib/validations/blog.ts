import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export type BlogInput = z.infer<typeof blogSchema>;
