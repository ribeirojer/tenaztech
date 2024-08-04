import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow GET requests to list products", async () => {
	const request = await superoak(app);
	await request
		.get("/products")
		.expect(200)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.length > 0, true);
		});
});

Deno.test("it should allow GET requests to get product details", async () => {
	const request = await superoak(app);
	await request
		.get(`/products/lenovo-gm2-pro-fone-sem-fio`)
		.expect(200)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.id, "lenovo-gm2-pro-001");
		});
});

Deno.test("it should return 404 for GET requests to a non-existing product", async () => {
	const request = await superoak(app);
	await request
		.get(`/products/ggg`)
		.expect(404)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.message, "Product not found");
		});
});

/**
Deno.test("it should allow POST requests to add a product", async () => {
	const request = await superoak(app);
	await request
		.post("/products")
		.set("Content-Type", "application/json")
		.send({
			name: "Product 1",
			description: "A sample product",
			price: 99.99,
		})
		.expect(201)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.name, "Product 1");
			assertEquals(body.description, "A sample product");
			assertEquals(body.price, 99.99);
			productId = body.id;
		});
});

Deno.test("it should allow PUT requests to update a product", async () => {
	const request = await superoak(app);
	await request
		.put(`/products/${productId}`)
		.set("Content-Type", "application/json")
		.send({
			name: "Updated Product",
			description: "Updated description",
			price: 149.99,
		})
		.expect(200)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.name, "Updated Product");
			assertEquals(body.description, "Updated description");
			assertEquals(body.price, 149.99);
		});
});

Deno.test("it should allow DELETE requests to remove a product", async () => {
	const request = await superoak(app);
	await request.delete(`/products/${productId}`).expect(204);
});

 */
