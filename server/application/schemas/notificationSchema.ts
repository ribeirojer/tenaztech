import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const notificationSchema = z.object({
	userId: z
		.string()
		.uuid({ message: "O ID do usuário deve ser um UUID válido" }),
	message: z
		.string()
		.min(1, { message: "A mensagem não pode estar vazia" })
		.max(500, { message: "A mensagem não pode exceder 500 caracteres" }),
	type: z.enum(["info", "warning", "error", "success"], {
		message:
			"O tipo de notificação deve ser um dos seguintes valores: info, warning, error, success",
	}),
	read: z.boolean().default(false),
	createdAt: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "A data de criação deve ser uma data válida",
	}),
});
