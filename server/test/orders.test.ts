import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow post requests with valid order", async () => {
	const request = await superoak(app);
	await request
		.post("/orders")
		.set("Content-Type", "application/json")
		.send({
			orderId: "123e4567-e89b-12d3-a456-426614174000",
			customerId: "123e4567-e89b-12d3-a456-426614174000",
			productIds: ["123e4567-e89b-12d3-a456-426614174000"],
			totalAmount: 100.5,
			orderDate: "2024-07-23T10:20:30Z",
			status: "pending",
			shippingAddress: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
				country: "USA",
			},
			billingAddress: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
				country: "USA",
			},
			paymentMethod: "credit_card",
			paymentStatus: "paid",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.message, "Order is valid");
		});
});

Deno.test("it should reject post requests with invalid order", async () => {
	const request = await superoak(app);
	await request
		.post("/orders")
		.set("Content-Type", "application/json")
		.send({
			orderId: 123, // Invalid orderId
			customerId: "123e4567-e89b-12d3-a456-426614174000",
			productIds: ["123e4567-e89b-12d3-a456-426614174000"],
			totalAmount: -10, // Negative amount
			orderDate: "invalid-date",
			status: "pending",
			shippingAddress: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
				country: "USA",
			},
			paymentMethod: "credit_card",
			paymentStatus: "paid",
		})
		.expect(400)
		.expect(({ body }) => {
			assertEquals(body.error.length > 0, true);
		});
});
