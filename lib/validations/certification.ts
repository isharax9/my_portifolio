import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issuedDate: z.string().min(1),
  credentialUrl: z.string().url().optional().or(z.literal("")).nullable(),
  badgeUrl: z.string().url().optional().or(z.literal("")).nullable(),
  order: z.number().default(0),
});

export type CertificationInput = z.infer<typeof certificationSchema>;
