import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const profileUpdateSchema = z.object({
	name: z.string().min(1).max(50).optional(),
	email: z.string().email().optional(),
	bio: z.string().max(500).optional(),
	avatarUrl: z.string().url().optional(),
});
