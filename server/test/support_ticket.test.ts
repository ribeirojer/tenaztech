import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow POST requests to create a support ticket", async () => {
	const request = await superoak(app);
	await request
		.post("/support-tickets")
		.set("Content-Type", "application/json")
		.send({
			name: "user",
			email: "user@example.com",
			message: "I can't log in to my account",
		})
		.expect(201)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.message, "Support ticket created successfully");
		});
});
/** 
Deno.test("it should allow PUT requests to update a support ticket", async () => {
	const request = await superoak(app);
	await request
		.put(`/support-tickets/${ticketId}`)
		.set("Content-Type", "application/json")
		.send({
			subject: "Updated issue with login",
			description: "Updated description",
			priority: "medium",
			status: "in_progress",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.subject, "Updated issue with login");
			assertEquals(body.description, "Updated description");
			assertEquals(body.priority, "medium");
			assertEquals(body.status, "in_progress");
		});
});

Deno.test("it should allow GET requests to list support tickets", async () => {
	const request = await superoak(app);
	await request
		.get("/support-tickets")
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.length > 0, true);
		});
});

Deno.test("it should allow DELETE requests to close a support ticket", async () => {
	const request = await superoak(app);
	await request.delete(`/support-tickets/${ticketId}`).expect(204);
});

Deno.test("it should return 404 for PUT requests to a non-existing support ticket", async () => {
	const request = await superoak(app);
	await request
		.put("/support-tickets/non-existing-id")
		.set("Content-Type", "application/json")
		.send({
			subject: "Non-existing issue",
		})
		.expect(404)
		.expect(({ body }) => {
			assertEquals(body.message, "Support ticket not found");
		});
});
*/