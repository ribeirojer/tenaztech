import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
// wishlist_server.test.ts
import { app } from "../main.ts";

let wishlistId: string;
let itemId: string;

Deno.test("it should allow POST requests to create a wishlist", async () => {
	const request = await superoak(app);
	await request
		.post("/wishlists")
		.set("Content-Type", "application/json")
		.send({
			name: "My Wishlist",
			description: "This is my wishlist",
		})
		.expect(201)
		.expect(({ body }) => {
			assertEquals(body.name, "My Wishlist");
			assertEquals(body.description, "This is my wishlist");
			wishlistId = body.id;
		});
});

Deno.test("it should allow POST requests to add an item to a wishlist", async () => {
	const request = await superoak(app);
	await request
		.post(`/wishlists/${wishlistId}/items`)
		.set("Content-Type", "application/json")
		.send({
			name: "Item 1",
			description: "This is item 1",
			link: "http://example.com/item1",
		})
		.expect(201)
		.expect(({ body }) => {
			assertEquals(body.name, "Item 1");
			assertEquals(body.description, "This is item 1");
			assertEquals(body.link, "http://example.com/item1");
			itemId = body.id;
		});
});

Deno.test("it should allow GET requests to list wishlists", async () => {
	const request = await superoak(app);
	await request
		.get("/wishlists")
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.length > 0, true);
		});
});

Deno.test("it should allow DELETE requests to remove an item from a wishlist", async () => {
	const request = await superoak(app);
	await request.delete(`/wishlists/${wishlistId}/items/${itemId}`).expect(204);
});

Deno.test("it should return 404 for POST requests to add an item to a non-existing wishlist", async () => {
	const request = await superoak(app);
	await request
		.post("/wishlists/non-existing-id/items")
		.set("Content-Type", "application/json")
		.send({
			name: "Non-existing item",
		})
		.expect(404)
		.expect(({ body }) => {
			assertEquals(body.message, "Wishlist not found");
		});
});
