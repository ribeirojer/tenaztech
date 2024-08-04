import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow POST requests to subscribe to newsletter with email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletter/subscribe")
		.set("Content-Type", "application/json")
		.send({
			email: "user@example.com",
		})
		.expect(201)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.message, "Subscription successful");
		});
});

Deno.test("it should reject POST requests to subscribe to newsletter without email", async () => {
	const request = await superoak(app);
	await request
	.post("/newsletter/subscribe")
	.set("Content-Type", "application/json")
	.send({})
	.expect(400)
	.expect((ctx) => {
		const body = JSON.parse(ctx.text);
		assertEquals(body.error, "Invalid email format");
	});
});

Deno.test("it should allow POST requests to unsubscribe from newsletter with email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletter/unsubscribe")
		.set("Content-Type", "application/json")
		.send({
			email: "user@example.com",
		})
		.expect(200)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.message, "Unsubscription successful");
		});
});

Deno.test("it should reject POST requests to unsubscribe from newsletter without email", async () => {
	const request = await superoak(app);
	await request
		.post("/newsletter/unsubscribe")
		.set("Content-Type", "application/json")
		.send({})
		.expect(400)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.error, "Invalid email format");
		});
});