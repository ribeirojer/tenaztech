import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const paymentInfoSchema = z.object({
	cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
	cardHolder: z.string().min(1).max(100),
	expirationDate: z.string().regex(/^\d{2}\/\d{2}$/, "Invalid expiration date"),
	cvv: z.string().regex(/^\d{3}$/, "Invalid CVV"),
});
