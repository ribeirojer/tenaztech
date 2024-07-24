import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const passwordUpdateSchema = z
	.object({
		currentPassword: z.string().min(8),
		newPassword: z.string().min(8).max(100),
		confirmNewPassword: z.string().min(8).max(100),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "New passwords do not match",
		path: ["confirmNewPassword"],
	});
