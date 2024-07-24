import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const supportTicketSchema = z.object({
	userId: z.string().uuid(),
	subject: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	priority: z.enum(["low", "medium", "high"]),
	status: z.enum(["open", "in_progress", "resolved", "closed"]),
	createdAt: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Invalid date",
	}),
});
