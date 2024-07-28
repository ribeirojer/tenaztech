import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const supportTicketSchema = z.object({
	userId: z
		.string()
		.uuid({ message: "O ID do usuário deve ser um UUID válido" }),
	subject: z
		.string()
		.min(1, { message: "O assunto não pode estar vazio" })
		.max(100, { message: "O assunto não pode exceder 100 caracteres" }),
	description: z
		.string()
		.min(1, { message: "A descrição não pode estar vazia" })
		.max(1000, { message: "A descrição não pode exceder 1000 caracteres" }),
	priority: z.enum(["low", "medium", "high"], {
		message:
			"A prioridade deve ser um dos seguintes valores: low, medium, high",
	}),
	status: z.enum(["open", "in_progress", "resolved", "closed"], {
		message:
			"O status deve ser um dos seguintes valores: open, in_progress, resolved, closed",
	}),
	createdAt: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "A data de criação deve ser uma data válida",
	}),
});
