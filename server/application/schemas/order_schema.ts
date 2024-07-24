import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const addressSchema = z.object({
	street: z.string().min(1).max(100),
	city: z.string().min(1).max(50),
	state: z.string().min(2).max(50),
	zipCode: z.string().min(5).max(10),
	country: z.string().min(2).max(50),
});

export const orderSchema = z.object({
	orderId: z.string().uuid(),
	customerId: z.string().uuid(),
	productIds: z.array(z.string().uuid()),
	totalAmount: z.number().positive(),
	orderDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Invalid date",
	}),
	status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
	shippingAddress: addressSchema,
	billingAddress: addressSchema.optional(),
	paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"]),
	paymentStatus: z.enum(["paid", "unpaid"]),
});
