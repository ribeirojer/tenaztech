import {
	assert,
	assertEquals,
	assertExists,
} from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8000/api";

// Teste para adicionar uma avaliação de produto
Deno.test("POST /api/products/:productId/reviews", async () => {
	const productId = "example-product-id"; // Substitua pelo ID de um produto existente para um teste real
	const review = {
		userId: "example-user-id",
		rating: 5,
		comment: "This is a great product!",
	};
	const res = await fetch(`${baseUrl}/products/${productId}/reviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 201);
	assertExists(resBody.id);
	assertEquals(resBody.rating, 5);
});

// Teste para obter avaliações de um produto
Deno.test("GET /api/products/:productId/reviews", async () => {
	const productId = "example-product-id"; // Substitua pelo ID de um produto existente para um teste real
	const res = await fetch(`${baseUrl}/products/${productId}/reviews`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});
