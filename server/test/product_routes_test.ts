import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../main.ts";

Deno.test("POST /orders should not create an order if product is out of stock", async () => {
	const request = await superoak(app);
	await request
		.post("/orders")
		.send({
			customerId: "customer1",
			productIds: ["product1", "product2"],
			totalAmount: 100,
		})
		.expect(400)
		.expect({ error: "Product product2 is out of stock" });
});
