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

// Teste para obter um produto por slug
Deno.test("GET /api/products/:slug", async () => {
	const slug = "example-slug";
	const res = await fetch(`${baseUrl}/products/${slug}`);
	const resBody = await res.json();
	assert(res.ok === true);
	assert(res.status === 200);
	assertExists(resBody);
});

// Teste para adicionar um novo produto
Deno.test("POST /api/products", async () => {
	const product = {
		name: "Test Product",
		slug: "test-product",
		category: "test-category",
		price: 100,
		discount: 10,
		stock: 50,
		description: "A product for testing",
	};
	const res = await fetch(`${baseUrl}/products`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	});
	const resBody = await res.json();
	assert(res.ok === true);
	assert(res.status === 201);
	assertExists(resBody.id);
});

// Teste para atualizar um produto
Deno.test("PUT /api/products/:id", async () => {
	const productId = "example-id";
	const updatedProduct = {
		name: "Updated Product",
		price: 120,
	};
	const res = await fetch(`${baseUrl}/products/${productId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedProduct),
	});
	const resBody = await res.json();
	assert(res.ok === true);
	assert(res.status === 200);
	assertExists(resBody.id);
	assert(resBody.name === "Updated Product");
});

// Teste para deletar um produto
Deno.test("DELETE /api/products/:id", async () => {
	const productId = "example-id";
	const res = await fetch(`${baseUrl}/products/${productId}`, {
		method: "DELETE",
	});
	assert(res.ok === true);
	assert(res.status === 204);
});

// Teste para obter todos os produtos
Deno.test("GET /api/products", async () => {
	const res = await fetch(`${baseUrl}/products`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});

// Teste para obter um produto por slug
Deno.test("GET /api/products/:slug", async () => {
	const slug = "example-slug"; // Substitua pelo slug de um produto existente para um teste real
	const res = await fetch(`${baseUrl}/products/${slug}`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(resBody.slug === slug);
});

// Teste para adicionar um novo produto
Deno.test("POST /api/products", async () => {
	const product = {
		name: "Test Product",
		slug: "test-product",
		category: "test-category",
		price: 100,
		discount: 10,
		stock: 50,
		description: "A product for testing",
	};
	const res = await fetch(`${baseUrl}/products`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	});
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 201);
	assertExists(resBody.id);
});

// Teste para atualizar um produto
Deno.test("PUT /api/products/:id", async () => {
	const productId = "example-id"; // Substitua pelo ID de um produto existente para um teste real
	const updatedProduct = {
		name: "Updated Product",
		price: 120,
	};
	const res = await fetch(`${baseUrl}/products/${productId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedProduct),
	});
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody.id);
	assert(resBody.name === "Updated Product");
});

// Teste para deletar um produto
Deno.test("DELETE /api/products/:id", async () => {
	const productId = "example-id"; // Substitua pelo ID de um produto existente para um teste real
	const res = await fetch(`${baseUrl}/products/${productId}`, {
		method: "DELETE",
	});
	assert(res.ok);
	assertEquals(res.status, 204);
});

// Teste para buscar produtos por nome
Deno.test("GET /api/products/search?name=Test", async () => {
	const res = await fetch(`${baseUrl}/products/search?name=Test`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});

// Teste para obter produtos por categoria
Deno.test("GET /api/products/category/:category", async () => {
	const category = "test-category"; // Substitua por uma categoria existente para um teste real
	const res = await fetch(`${baseUrl}/products/category/${category}`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});

// Teste para obter produtos com desconto
Deno.test("GET /api/products/discounts", async () => {
	const res = await fetch(`${baseUrl}/products/discounts`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});

// Teste para obter todas as categorias de produtos
Deno.test("GET /api/products/categories", async () => {
	const res = await fetch(`${baseUrl}/products/categories`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});

// Teste para obter os mais vendidos
Deno.test("GET /api/best-sellers", async () => {
	const res = await fetch(`${baseUrl}/best-sellers`);
	const resBody = await res.json();
	assert(res.ok);
	assertEquals(res.status, 200);
	assertExists(resBody);
	assert(Array.isArray(resBody));
});
