/*import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { post, get } from "./utils";

describe("Social Auth Routes", () => {
	describe("POST /api/auth/social/:provider", () => {
		it("Should initiate social auth for a provider", async () => {
			const provider = "google"; // Assumindo "google" como um provedor válido
			const response = await app.handle(post(`/api/auth/social/${provider}`, {}));
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("url"); // URL para redirecionamento
		});

		it("Should return 400 for an invalid provider", async () => {
			const provider = "invalidProvider";
			const response = await app.handle(post(`/api/auth/social/${provider}`, {}));
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error", "Invalid provider");
		});
	});

	describe("GET /api/auth/social/callback/:provider", () => {
		it("Should handle social auth callback for a provider", async () => {
			const provider = "google"; // Assumindo "google" como um provedor válido
			const response = await app.handle(get(`/api/auth/social/callback/${provider}`));
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("user");
		});

		it("Should return 400 for an invalid provider", async () => {
			const provider = "invalidProvider";
			const response = await app.handle(get(`/api/auth/social/callback/${provider}`));
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error", "Invalid provider");
		});
	});
});
*/