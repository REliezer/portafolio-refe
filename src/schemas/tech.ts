
import { z } from "astro:content";

export const TechSchema = z.object({
  label: z.string(),
  level: z.number().min(10).max(100).optional(),
  group: z.string(),
});

