import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const registrationSchema = z
	.object({
		username: z.string().min(3).max(20),
		email: z.string().email(),
		password: z.string().min(8).max(100),
		confirmPassword: z.string().min(8).max(100),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
