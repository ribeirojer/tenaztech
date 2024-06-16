import request from "supertest";
import app from "../app"; // Assumindo que 'app' é a instância do seu aplicativo Express

describe("Cart Routes", () => {
	describe("GET /api/carts/:userId", () => {
		it("Should fetch the user's cart", async () => {
			const userId = "validUserId";
			const response = await request(app).get(`/api/carts/${userId}`);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("items");
		});
	});

	describe("POST /api/carts/:userId/items", () => {
		it("Should add an item to the cart", async () => {
			const userId = "validUserId";
			const newItem = {
				productId: "validProductId",
				quantity: 1,
			};
			const response = await request(app)
				.post(`/api/carts/${userId}/items`)
				.send(newItem);
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("items");
		});

		it("Should return 400 if the request body is invalid", async () => {
			const userId = "validUserId";
			const invalidItem = {
				productId: "validProductId",
			};
			const response = await request(app)
				.post(`/api/carts/${userId}/items`)
				.send(invalidItem);
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("PUT /api/carts/:userId/items/:itemId", () => {
		it("Should update an item in the cart", async () => {
			const userId = "validUserId";
			const itemId = "validItemId";
			const updatedItem = {
				quantity: 2,
			};
			const response = await request(app)
				.put(`/api/carts/${userId}/items/${itemId}`)
				.send(updatedItem);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("items");
		});

		it("Should return 404 if the item is not found", async () => {
			const userId = "validUserId";
			const itemId = "invalidItemId";
			const updatedItem = {
				quantity: 2,
			};
			const response = await request(app)
				.put(`/api/carts/${userId}/items/${itemId}`)
				.send(updatedItem);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("DELETE /api/carts/:userId/items/:itemId", () => {
		it("Should remove an item from the cart", async () => {
			const userId = "validUserId";
			const itemId = "validItemId";
			const response = await request(app).delete(
				`/api/carts/${userId}/items/${itemId}`,
			);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("items");
		});

		it("Should return 404 if the item is not found", async () => {
			const userId = "validUserId";
			const itemId = "invalidItemId";
			const response = await request(app).delete(
				`/api/carts/${userId}/items/${itemId}`,
			);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("POST /api/carts/:userId/checkout", () => {
		it("Should checkout the cart", async () => {
			const userId = "validUserId";
			const checkoutData = {
				paymentMethod: "validPaymentMethod",
				addressId: "validAddressId",
			};
			const response = await request(app)
				.post(`/api/carts/${userId}/checkout`)
				.send(checkoutData);
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("orderId");
		});

		it("Should return 400 if the request body is invalid", async () => {
			const userId = "validUserId";
			const invalidCheckoutData = {
				paymentMethod: "validPaymentMethod",
			};
			const response = await request(app)
				.post(`/api/carts/${userId}/checkout`)
				.send(invalidCheckoutData);
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
		});
	});
});
