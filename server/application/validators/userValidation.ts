import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const userSchema = z.object({
	name: z.string().min(3).max(30),
	email: z.string().email(),
});
