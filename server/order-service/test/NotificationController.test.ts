import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "../src/app";
import { NotificationRepository } from "../src/repositories/NotificationRepository";

vi.mock("../src/repositories/NotificationRepository");

describe("NotificationController", () => {
	describe("GET /notifications", () => {
		it("should fetch all notifications", async () => {
			const notifications = [];
			(NotificationRepository.getOrderNotifications as any).mockResolvedValue(
				notifications,
			);
			const response = await request(app).get("/notifications");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});

		it("should return 500 if fetching notifications fails", async () => {
			(NotificationRepository.getOrderNotifications as any).mockRejectedValue(
				new Error("Failed to fetch notifications"),
			);
			const response = await request(app).get("/notifications");
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to fetch notifications");
		});
	});

	describe("PUT /notifications/:id", () => {
		it("should mark notification as read", async () => {
			const notification = { id: "1", read: true };
			(NotificationRepository.markAsRead as any).mockResolvedValue(
				notification,
			);
			const response = await request(app)
				.put("/notifications/1")
				.send({ read: true });
			expect(response.status).toBe(200);
			expect(response.body).toEqual(notification);
		});

		it("should return 500 if marking notification as read fails", async () => {
			(NotificationRepository.markAsRead as any).mockRejectedValue(
				new Error("Failed to mark notification as read"),
			);
			const response = await request(app)
				.put("/notifications/1")
				.send({ read: true });
			expect(response.status).toBe(500);
			expect(response.body.error).toBe("Failed to mark notification as read");
		});
	});
});
