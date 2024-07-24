import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const notificationSchema = z.object({
	userId: z.string().uuid(),
	message: z.string().min(1).max(500),
	type: z.enum(["info", "warning", "error", "success"]),
	read: z.boolean().default(false),
	createdAt: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Invalid date",
	}),
});
