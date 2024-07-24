import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow POST requests to subscribe to newsletter with email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletters/subscribe")
		.set("Content-Type", "application/json")
		.send({
			email: "user@example.com",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.message, "Subscribed successfully");
		});
});

Deno.test("it should reject POST requests to subscribe to newsletter without email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletters/subscribe")
		.set("Content-Type", "application/json")
		.send({})
		.expect(400)
		.expect(({ body }) => {
			assertEquals(body.message, "Email is required");
		});
});

Deno.test("it should allow POST requests to unsubscribe from newsletter with email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletters/unsubscribe")
		.set("Content-Type", "application/json")
		.send({
			email: "user@example.com",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.message, "Unsubscribed successfully");
		});
});

Deno.test("it should reject POST requests to unsubscribe from newsletter without email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletters/unsubscribe")
		.set("Content-Type", "application/json")
		.send({})
		.expect(400)
		.expect(({ body }) => {
			assertEquals(body.message, "Email is required");
		});
});
