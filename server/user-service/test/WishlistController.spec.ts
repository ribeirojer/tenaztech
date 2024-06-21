import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { post, put, del, get } from "./utils";

describe("Wishlist Routes", () => {
	describe("GET /api/wishlists", () => {
		it("Should fetch the user's wishlist", async () => {
			const response = await app.handle(get("/api/wishlists"));
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});
	});

	describe("POST /api/wishlists/items", () => {
		it("Should add an item to the wishlist", async () => {
			const newItem = {
				userId: "validUserId",
				productId: "validProductId",
			};
			const response = await app.handle(post("/api/wishlists/items", newItem));
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("userId", newItem.userId);
			expect(response.body).toHaveProperty("productId", newItem.productId);
		});

		it("Should return 400 if the request body is invalid", async () => {
			const invalidItem = {
				userId: "validUserId",
			};
			const response = await app.handle(post("/api/wishlists/items", invalidItem));
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("DELETE /api/wishlists/items/:itemId", () => {
		it("Should remove an item from the wishlist", async () => {
			const itemId = "validItemId"; // Substitua pelo ID de um item válido no seu banco de dados de teste
			const response = await app.handle(del(`/api/wishlists/items/${itemId}`));
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Item removed from wishlist successfully",
			);
		});

		it("Should return 404 if the item is not found", async () => {
			const itemId = "invalidItemId";
			const response = await app.handle(del(`/api/wishlists/items/${itemId}`));
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				"error",
				"Item not found in wishlist",
			);
		});
	});

	describe("PUT /api/wishlists/items/:itemId", () => {
		it("Should update an item in the wishlist", async () => {
			const itemId = "validItemId"; // Substitua pelo ID de um item válido no seu banco de dados de teste
			const updatedItem = {
				notes: "Updated notes",
			};
			const response = await app.handle(put(`/api/wishlists/items/${itemId}`, updatedItem));
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("notes", updatedItem.notes);
		});

		it("Should return 404 if the item is not found", async () => {
			const itemId = "invalidItemId";
			const updatedItem = {
				notes: "Updated notes",
			};
			const response = await app.handle(put(`/api/wishlists/items/${itemId}`, updatedItem));
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				"error",
				"Item not found in wishlist",
			);
		});
	});
});
