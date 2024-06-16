import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "../src/app";
import { PaymentRepository } from "../src/repositories/PaymentRepository";

vi.mock("../src/repositories/PaymentRepository");

describe("PaymentController", () => {
	describe("POST /payments", () => {
		it("should process a payment", async () => {
			const payment = { id: "1", amount: 100, status: "Processed" };
			(PaymentRepository.process as any).mockResolvedValue(payment);
			const response = await request(app).post("/payments").send(payment);
			expect(response.status).toBe(201);
			expect(response.body).toEqual(payment);
		});

		it("should return 500 if payment processing fails", async () => {
			(PaymentRepository.process as any).mockRejectedValue(
				new Error("Failed to process payment"),
			);
			const response = await request(app)
				.post("/payments")
				.send({ id: "1", amount: 100 });
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to process payment");
		});
	});

	describe("POST /payments/provider", () => {
		it("should configure a payment provider", async () => {
			const provider = { id: "1", name: "Stripe" };
			(PaymentRepository.configureProvider as any).mockResolvedValue(provider);
			const response = await request(app)
				.post("/payments/provider")
				.send(provider);
			expect(response.status).toBe(201);
			expect(response.body).toEqual(provider);
		});

		it("should return 500 if configuring provider fails", async () => {
			(PaymentRepository.configureProvider as any).mockRejectedValue(
				new Error("Failed to configure provider"),
			);
			const response = await request(app)
				.post("/payments/provider")
				.send({ id: "1", name: "Stripe" });
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to configure provider");
		});
	});
});
