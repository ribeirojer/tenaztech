describe("Notification Routes", () => {
    describe("GET /api/notifications", () => {
        it("Should fetch all notifications", async () => {
            const response = await request(app).get("/api/notifications");
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("PUT /api/notifications/:id", () => {
        it("Should mark a notification as read", async () => {
            const notificationId = "validNotificationId"; // Substitua pelo ID de uma notificação válida no seu banco de dados de teste
            const response = await request(app).put(`/api/notifications/${notificationId}`).send({ read: true });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', notificationId);
            expect(response.body.read).toBe(true);
        });

        it("Should return 404 if the notification is not found", async () => {
            const notificationId = "invalidNotificationId";
            const response = await request(app).put(`/api/notifications/${notificationId}`).send({ read: true });
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Notification not found');
        });
    });

    describe("DELETE /api/notifications/:id", () => {
        it("Should delete a notification", async () => {
            const notificationId = "validNotificationId"; // Substitua pelo ID de uma notificação válida no seu banco de dados de teste
            const response = await request(app).delete(`/api/notifications/${notificationId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Notification deleted successfully');
        });

        it("Should return 404 if the notification is not found", async () => {
            const notificationId = "invalidNotificationId";
            const response = await request(app).delete(`/api/notifications/${notificationId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Notification not found');
        });
    });
});
