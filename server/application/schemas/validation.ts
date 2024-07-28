import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export function isValidEmail(email: string) {
	const emailSchema = z
		.string()
		.email("Este não é um endereço de email válido.");

	try {
		emailSchema.parse(email);
		return true; // Email é válido
	} catch (error) {
		console.error(error.errors); // Exibe os erros de validação
		return false; // Email não é válido
	}
}
