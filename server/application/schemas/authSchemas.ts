import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const loginSchema = z.object({
	email: z.string().email({ message: "Por favor, insira um email válido" }),
	password: z
		.string()
		.min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
	rememberMe: z.boolean().optional(),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
			.max(20, { message: "O nome não pode exceder 20 caracteres" }),
		email: z.string().email({ message: "Por favor, insira um email válido" }),
		password: z
			.string()
			.min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
			.max(100, { message: "A senha não pode exceder 100 caracteres" })
			.refine((value) => /[a-z]/.test(value), {
				message: "A senha deve conter pelo menos uma letra minúscula",
			})
			.refine((value) => /[A-Z]/.test(value), {
				message: "A senha deve conter pelo menos uma letra maiúscula",
			})
			.refine((value) => /\d/.test(value), {
				message: "A senha deve conter pelo menos um número",
			})
			.refine((value) => /[!@#$%^&*(),.?":{}|<>]/g.test(value), {
				message: "A senha deve conter pelo menos um caractere especial",
			}),
		confirmPassword: z
			.string()
			.min(8, {
				message: "A senha de confirmação deve ter pelo menos 8 caracteres",
			})
			.max(100, {
				message: "A senha de confirmação não pode exceder 100 caracteres",
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export const resetPasswordSchema = z.object({
	token: z.string({ message: "Token é obrigatório" }),
	password: z
		.string()
		.min(6, { message: "A nova senha deve ter pelo menos 6 caracteres" }),
});

export const recoverPasswordSchema = z.object({
	email: z.string().email({ message: "Por favor, insira um email válido" }),
});

export const verifyEmailSchema = z.object({
	token: z.string({ message: "Token é obrigatório" }),
});

export const refreshTokenSchema = z.object({
	refreshToken: z.string({ message: "Token de atualização é obrigatório" }),
});

export const logoutSchema = z.object({
	refreshToken: z.string({ message: "Token de atualização é obrigatório" }),
});

export const verifyTokenSchema = z.object({
	token: z.string({ message: "Token é obrigatório" }),
});
