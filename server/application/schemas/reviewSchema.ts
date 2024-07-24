import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const reviewSchema = z.object({
	userId: z.string().uuid(),
	productId: z.string().uuid(),
	rating: z.number().min(1).max(5),
	comment: z.string().max(1000).optional(),
});
