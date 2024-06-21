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

/**
it("Should add a review to a product", async () => {
	it("Should return 400 if the request body is invalid", async () => {
		it("Should return 404 if the product is not found", async () => {
			describe("POST /api/products/:productId/reviews", () => {
				import { app } from "../src";
				import { describe, expect, it } from "bun:test";
				import { post, put, del, get } from "./utils";
				
				describe("Product Review Routes", () => {
					describe("POST /api/products/:productId/reviews", () => {
						it("Should add a review to a product", async () => {
							const productId = "validProductId"; // Substitua pelo ID de um produto válido no seu banco de dados de teste
							const newReview = {
								userId: "validUserId",
								rating: 5,
								comment: "Great product!",
							};
							const response = await request(app)
								.post(`/api/products/${productId}/reviews`)
								.send(newReview);
							expect(response.status).toBe(201);
							expect(response.body).toHaveProperty("userId", newReview.userId);
							expect(response.body).toHaveProperty("rating", newReview.rating);
							expect(response.body).toHaveProperty("comment", newReview.comment);
						});
				
						it("Should return 400 if the request body is invalid", async () => {
							const productId = "validProductId"; // Substitua pelo ID de um produto válido no seu banco de dados de teste
							const invalidReview = {
								userId: "validUserId",
								rating: 6, // Invalid rating, should be between 1 and 5
							};
							const response = await request(app)
								.post(`/api/products/${productId}/reviews`)
								.send(invalidReview);
							expect(response.status).toBe(400);
							expect(response.body).toHaveProperty("error");
						});
				
						it("Should return 404 if the product is not found", async () => {
							const productId = "invalidProductId";
							const newReview = {
								userId: "validUserId",
								rating: 5,
								comment: "Great product!",
							};
							const response = await request(app)
								.post(`/api/products/${productId}/reviews`)
								.send(newReview);
							expect(response.status).toBe(404);
							expect(response.body).toHaveProperty("error", "Product not found");
						});
					});
				});
				 */