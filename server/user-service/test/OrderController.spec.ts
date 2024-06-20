import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { post, put, del, get } from "./utils";

describe("Order Routes", () => {
	describe("GET /api/orders", () => {
		it("Should fetch all orders", async () => {
			const response = await request(app).get("/api/orders");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});
	});

	describe("GET /api/orders/:id", () => {
		it("Should fetch a specific order by ID", async () => {
			const orderId = "validOrderId"; // Substitua pelo ID de um pedido válido no seu banco de dados de teste
			const response = await request(app).get(`/api/orders/${orderId}`);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("id", orderId);
		});

		it("Should return 404 if the order is not found", async () => {
			const orderId = "invalidOrderId";
			const response = await request(app).get(`/api/orders/${orderId}`);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Order not found");
		});
	});
});
