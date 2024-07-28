import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const paymentInfoSchema = z.object({
	cardNumber: z
		.string()
		.regex(/^\d{16}$/, {
			message: "Número do cartão inválido. Deve conter 16 dígitos",
		}),
	cardHolder: z
		.string()
		.min(1, { message: "O nome do titular do cartão não pode estar vazio" })
		.max(100, {
			message: "O nome do titular do cartão não pode exceder 100 caracteres",
		}),
	expirationDate: z
		.string()
		.regex(/^\d{2}\/\d{2}$/, {
			message: "Data de validade inválida. Deve estar no formato MM/AA",
		}),
	cvv: z
		.string()
		.regex(/^\d{3}$/, { message: "CVV inválido. Deve conter 3 dígitos" }),
});
