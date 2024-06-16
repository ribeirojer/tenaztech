import {
	assert,
	assertEquals,
	assertExists,
} from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8000/api";

// Teste para obter níveis de estoque
Deno.test("GET /api/inventory/stock-levels", async () => {
	const res = await fetch(`${baseUrl}/inventory/stock-levels`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
});

// Teste para atualizar nível de estoque
Deno.test("PUT /api/inventory/stock/:id", async () => {
	const productId = "example-id"; // Substitua pelo ID de um produto existente para um teste real
	const newStockLevel = { stockLevel: 75 };
	const res = await fetch(`${baseUrl}/inventory/stock/${productId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newStockLevel),
	});
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody.productId);
	assertEquals(resBody.stockLevel, 75);
});

// Teste para obter disponibilidade de produto
Deno.test("GET /api/inventory/availability/:id", async () => {
	const productId = "example-id"; // Substitua pelo ID de um produto existente para um teste real
	const res = await fetch(`${baseUrl}/inventory/availability/${productId}`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody.productId);
	assert(typeof resBody.available === "boolean");
});
