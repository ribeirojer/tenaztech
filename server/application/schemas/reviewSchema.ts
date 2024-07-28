import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const reviewSchema = z.object({
	userId: z
		.string()
		.uuid({ message: "O ID do usuário deve ser um UUID válido" }),
	productId: z
		.string()
		.uuid({ message: "O ID do produto deve ser um UUID válido" }),
	rating: z
		.number()
		.min(1, { message: "A avaliação deve ser pelo menos 1" })
		.max(5, { message: "A avaliação não pode ser maior que 5" }),
	comment: z
		.string()
		.max(1000, { message: "O comentário não pode exceder 1000 caracteres" })
		.optional(),
});
