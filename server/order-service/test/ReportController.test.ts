import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "../src/app";
import { ReportRepository } from "../src/repositories/ReportRepository";

vi.mock("../src/repositories/ReportRepository");

describe("ReportController", () => {
	describe("GET /reports/orders", () => {
		it("should fetch order reports", async () => {
			const reports = [];
			(ReportRepository.getOrderReports as any).mockResolvedValue(reports);
			const response = await request(app).get("/reports/orders");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});

		it("should return 500 if fetching order reports fails", async () => {
			(ReportRepository.getOrderReports as any).mockRejectedValue(
				new Error("Failed to fetch order reports"),
			);
			const response = await request(app).get("/reports/orders");
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to fetch order reports");
		});
	});

	describe("GET /reports/payments", () => {
		it("should fetch payment reports", async () => {
			const reports = [];
			(ReportRepository.getPaymentReports as any).mockResolvedValue(reports);
			const response = await request(app).get("/reports/payments");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});

		it("should return 500 if fetching payment reports fails", async () => {
			(ReportRepository.getPaymentReports as any).mockRejectedValue(
				new Error("Failed to fetch payment reports"),
			);
			const response = await request(app).get("/reports/payments");
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to fetch payment reports");
		});
	});
});
