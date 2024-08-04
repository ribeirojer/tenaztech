import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow POST requests to add a review", async () => {
	const request = await superoak(app);
	await request
		.post("/reviews/a6s-tws-wireless-bluetooth-headset")
		.set("Content-Type", "application/json")
		.send({
			name: "user123",
			email: "product123",
			rating: 5,
			review: "Great product!",
		})
		.expect(201)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.message, "Review added successfully");
		});
});

Deno.test("it should allow GET requests to list reviews for a product", async () => {
	const request = await superoak(app);
	await request
		.get("/reviews/a6s-tws-wireless-bluetooth-headset")
		.expect(200)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.length > 0, true);
		});
});

/** 
Deno.test("it should allow GET requests to get review details", async () => {
	const request = await superoak(app);
	await request
		.get(`/reviews/${reviewId}`)
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.id, reviewId);
		});
});

Deno.test("it should allow PUT requests to update a review", async () => {
	const request = await superoak(app);
	await request
		.put(`/reviews/${reviewId}`)
		.set("Content-Type", "application/json")
		.send({
			rating: 4,
			comment: "Updated review comment",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.rating, 4);
			assertEquals(body.comment, "Updated review comment");
		});
});

Deno.test("it should allow DELETE requests to remove a review", async () => {
	const request = await superoak(app);
	await request.delete(`/reviews/${reviewId}`).expect(204);
});

Deno.test("it should return 404 for GET requests to a non-existing review", async () => {
	const request = await superoak(app);
	await request
		.get("/reviews/non-existing-id")
		.expect(404)
		.expect(({ body }) => {
			assertEquals(body.message, "Review not found");
		});
});
*/
