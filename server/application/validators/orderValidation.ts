import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const orderSchema = z.object({
	customerId: z.string().uuid(),
	productIds: z.array(z.string().uuid()),
	totalAmount: z.number().positive(),
});
