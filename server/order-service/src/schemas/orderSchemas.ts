import { z } from "zod";

const addressSchema = z.object({
	street: z.string(),
	city: z.string(),
	state: z.string(),
	zip: z.string(),
	country: z.string(),
});

const itemSchema = z.object({
	title: z.string(),
	quantity: z.number().positive(),
	price: z.number().positive(),
});

const validStatuses = [
	"pending",
	"processing",
	"shipped",
	"in_transit",
	"delivered",
] as const;

export const orderSchema = z.object({
	customer_name: z.string(),
	customer_email: z.string().email(),
	customer_phone: z.string().optional(),
	address: addressSchema,
	items: z.array(itemSchema),
	total_amount: z.number().positive(),
	currency: z.string().default("BRL"),
	payment_method: z.string(),
	shipping: z.object({
		service: z.string(),
		price: z.number().positive(),
		estimated_days: z.string(),
	}),
});

export const updateOrderSchema = z.object({
	customer_name: z.string().optional(),
	customer_email: z.string().email().optional(),
	customer_phone: z.string().optional(),
	address: addressSchema.optional(),
	items: z.array(itemSchema).optional(),
	total_amount: z.number().positive().optional(),
	currency: z.string().optional(),
	payment_method: z.string().optional(),
	status: z.enum(validStatuses).optional(),
});

export const statusUpdateSchema = z.object({
	status: z.enum(validStatuses),
});
