import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const addressSchema = z.object({
	street: z
		.string()
		.min(1, { message: "A rua não pode estar vazia" })
		.max(100, { message: "A rua não pode exceder 100 caracteres" }),
	city: z
		.string()
		.min(1, { message: "A cidade não pode estar vazia" })
		.max(50, { message: "A cidade não pode exceder 50 caracteres" }),
	state: z
		.string()
		.min(2, { message: "O estado deve ter pelo menos 2 caracteres" })
		.max(50, { message: "O estado não pode exceder 50 caracteres" }),
	zipCode: z
		.string()
		.min(5, { message: "O CEP deve ter pelo menos 5 caracteres" })
		.max(10, { message: "O CEP não pode exceder 10 caracteres" }),
	country: z
		.string()
		.min(2, { message: "O país deve ter pelo menos 2 caracteres" })
		.max(50, { message: "O país não pode exceder 50 caracteres" }),
});

export const orderSchema = z.object({
	orderId: z
		.string()
		.uuid({ message: "O ID do pedido deve ser um UUID válido" }),
	customerId: z
		.string()
		.uuid({ message: "O ID do cliente deve ser um UUID válido" }),
	productIds: z.array(
		z.string().uuid({ message: "O ID do produto deve ser um UUID válido" }),
		{
			message: "Os IDs dos produtos devem ser um array de UUIDs válidos",
		},
	),
	totalAmount: z
		.number()
		.positive({ message: "O valor total deve ser um número positivo" }),
	orderDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "A data do pedido deve ser uma data válida",
	}),
	status: z.enum(["pending", "shipped", "delivered", "cancelled"], {
		message:
			"O status do pedido deve ser um dos seguintes valores: pending, shipped, delivered, cancelled",
	}),
	shippingAddress: addressSchema,
	billingAddress: addressSchema.optional(),
	paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"], {
		message:
			"O método de pagamento deve ser um dos seguintes valores: credit_card, paypal, bank_transfer",
	}),
	paymentStatus: z.enum(["paid", "unpaid"], {
		message:
			"O status do pagamento deve ser um dos seguintes valores: paid, unpaid",
	}),
});
