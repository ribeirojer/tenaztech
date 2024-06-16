import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "../src/app";
import { CouponRepository } from "../src/repositories/CouponRepository";

vi.mock("../src/repositories/CouponRepository");

describe("CouponController", () => {
	describe("POST /coupons", () => {
		it("should create a new coupon", async () => {
			const newCoupon = { id: "1", code: "DISCOUNT10", discount: 10 };
			(CouponRepository.create as any).mockResolvedValue(newCoupon);
			const response = await request(app).post("/coupons").send(newCoupon);
			expect(response.status).toBe(201);
			expect(response.body).toEqual(newCoupon);
		});

		it("should return 500 if coupon creation fails", async () => {
			(CouponRepository.create as any).mockRejectedValue(
				new Error("Failed to create coupon"),
			);
			const response = await request(app)
				.post("/coupons")
				.send({ code: "DISCOUNT10", discount: 10 });
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to create coupon");
		});
	});

	describe("GET /coupons/:id", () => {
		it("should fetch a coupon by id", async () => {
			const coupon = { id: "1", code: "DISCOUNT10", discount: 10 };
			(CouponRepository.getById as any).mockResolvedValue(coupon);
			const response = await request(app).get("/coupons/1");
			expect(response.status).toBe(200);
			expect(response.body).toEqual(coupon);
		});

		it("should return 404 if coupon not found", async () => {
			(CouponRepository.getById as any).mockResolvedValue(null);
			const response = await request(app).get("/coupons/1");
			expect(response.status).toBe(404);
			expect(response.body.error).toBe("Coupon not found");
		});

		it("should return 500 if fetching coupon by id fails", async () => {
			(CouponRepository.getById as any).mockRejectedValue(
				new Error("Failed to fetch coupon"),
			);
			const response = await request(app).get("/coupons/1");
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to fetch coupon");
		});
	});
});
