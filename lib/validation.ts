import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(2).max(80),
  password: z.string().min(8).max(64)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64)
});

export const uploadSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().int().positive()
});

export const searchSchema = z.object({
  q: z.string().trim().min(1)
});
