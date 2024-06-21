import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { post, put, del, get } from "./utils";

describe("Subscription Routes", () => {
	describe("GET /api/subscriptions", () => {
		it("Should fetch all subscriptions", async () => {
			const response = await app.handle(get("/api/subscriptions"));
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});
	});

	describe("POST /api/subscriptions", () => {
		it("Should create a new subscription", async () => {
			const newSubscription = {
				plan: "premium",
				userId: "validUserId",
			};
			const response = await app.handle(post("/api/subscriptions", newSubscription));
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("id");
			const { plan, userId } = JSON.parse(await response.text());

			expect(plan).toBe(newSubscription.plan);
			expect(userId).toBe(newSubscription.userId);
		});

		it("Should return 400 if the request body is invalid", async () => {
			const invalidSubscription = {
				plan: "premium",
			};
			const response = await app.handle(post("/api/subscriptions", invalidSubscription));
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("DELETE /api/subscriptions/:id", () => {
		it("Should delete a subscription", async () => {
			const subscriptionId = "validSubscriptionId"; // Substitua pelo ID de uma assinatura válida no seu banco de dados de teste
			const response = await app.handle(del(`/api/subscriptions/${subscriptionId}`));
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Subscription deleted successfully",
			);
		});

		it("Should return 404 if the subscription is not found", async () => {
			const subscriptionId = "invalidSubscriptionId";
			const response = await app.handle(del(`/api/subscriptions/${subscriptionId}`));
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Subscription not found");
		});
	});
});
