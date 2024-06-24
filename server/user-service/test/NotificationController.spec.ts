/*import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { put, del, get } from "./utils";

describe("Notification Routes", () => {
	describe("GET /api/notifications", () => {
		it("Should fetch all notifications", async () => {
			const response = await app.handle(get("/api/notifications"));
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});
	});

	describe("PUT /api/notifications/:id", () => {
		it("Should mark a notification as read", async () => {
			const notificationId = "validNotificationId"; // Substitua pelo ID de uma notificação válida no seu banco de dados de teste
			const response = await app.handle(put(`/api/notifications/${notificationId}`, { read: true }));
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("id", notificationId);
			const { read } = JSON.parse(await response.text());

			expect(read).toBe(true);
		});

		it("Should return 404 if the notification is not found", async () => {
			const notificationId = "invalidNotificationId";
			const response = await app.handle(put(`/api/notifications/${notificationId}`, { read: true }));
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Notification not found");
		});
	});

	describe("DELETE /api/notifications/:id", () => {
		it("Should delete a notification", async () => {
			const notificationId = "validNotificationId"; // Substitua pelo ID de uma notificação válida no seu banco de dados de teste
			const response = await app.handle(del(`/api/notifications/${notificationId}`))
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Notification deleted successfully",
			);
		});

		it("Should return 404 if the notification is not found", async () => {
			const notificationId = "invalidNotificationId";
			const response = await app.handle(del(`/api/notifications/${notificationId}`));
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Notification not found");
		});
	});
});
*/