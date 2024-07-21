import {
	assert,
	assertEquals,
	assertExists,
} from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8000/api";

// Teste para obter todos os produtos
Deno.test("GET /api/products", async () => {
	const res = await fetch(`${baseUrl}/products`);
	const resBody = await res.json();
	assert(res.ok === true);
	assert(res.status === 200);
	assertExists(resBody);
});
