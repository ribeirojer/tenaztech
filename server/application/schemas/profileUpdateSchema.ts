import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const profileUpdateSchema = z.object({
	name: z
		.string()
		.min(1, { message: "O nome não pode estar vazio" })
		.max(50, { message: "O nome não pode exceder 50 caracteres" })
		.optional(),
	email: z
		.string()
		.email({ message: "Por favor, insira um email válido" })
		.optional(),
	bio: z
		.string()
		.max(500, { message: "A bio não pode exceder 500 caracteres" })
		.optional(),
	avatarUrl: z
		.string()
		.url({ message: "Por favor, insira uma URL válida para o avatar" })
		.optional(),
});
