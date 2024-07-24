import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const productSchema = z.object({
	name: z.string().min(1).max(100),
	description: z.string().max(1000).optional(),
	price: z.number().positive(),
	categoryId: z.string().uuid(),
	stock: z.number().int().nonnegative(),
});
