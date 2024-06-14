import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { req, post } from "./utils";

describe("User Routes", () => {
    describe("GET /api/users", () => {
        it("Should fetch all users", async () => {
            const response = await request(app).get("/api/users");
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("GET /api/users/:id", () => {
        it("Should fetch a specific user by ID", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const response = await request(app).get(`/api/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', userId);
        });

        it("Should return 404 if the user is not found", async () => {
            const userId = "invalidUserId";
            const response = await request(app).get(`/api/users/${userId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe("POST /api/users", () => {
        it("Should create a new user", async () => {
            const newUser = {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "Password123"
            };
            const response = await request(app).post("/api/users").send(newUser);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newUser.name);
            expect(response.body.email).toBe(newUser.email);
        });

        it("Should return 400 if the request body is invalid", async () => {
            const invalidUser = {
                email: "invalidEmail",
                password: "short"
            };
            const response = await request(app).post("/api/users").send(invalidUser);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe("PUT /api/users/:id", () => {
        it("Should update an existing user", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const updatedData = {
                name: "Jane Doe",
                email: "janedoe@example.com"
            };
            const response = await request(app).put(`/api/users/${userId}`).send(updatedData);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updatedData.name);
            expect(response.body.email).toBe(updatedData.email);
        });

        it("Should return 404 if the user is not found", async () => {
            const userId = "invalidUserId";
            const updatedData = {
                name: "Jane Doe",
                email: "janedoe@example.com"
            };
            const response = await request(app).put(`/api/users/${userId}`).send(updatedData);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe("DELETE /api/users/:id", () => {
        it("Should delete a user", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const response = await request(app).delete(`/api/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'User deleted successfully');
        });

        it("Should return 404 if the user is not found", async () => {
            const userId = "invalidUserId";
            const response = await request(app).delete(`/api/users/${userId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe("GET /api/users/profile", () => {
        it("Should fetch the current user's profile", async () => {
            const response = await request(app).get("/api/users/profile").set('Authorization', `Bearer validToken`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('email');
        });

        it("Should return 401 if the user is not authenticated", async () => {
            const response = await request(app).get("/api/users/profile");
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Unauthorized');
        });
    });

    describe("PUT /api/users/profile", () => {
        it("Should update the current user's profile", async () => {
            const updatedProfile = {
                name: "John Updated",
                email: "johnupdated@example.com"
            };
            const response = await request(app).put("/api/users/profile").set('Authorization', `Bearer validToken`).send(updatedProfile);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updatedProfile.name);
            expect(response.body.email).toBe(updatedProfile.email);
        });

        it("Should return 401 if the user is not authenticated", async () => {
            const updatedProfile = {
                name: "John Updated",
                email: "johnupdated@example.com"
            };
            const response = await request(app).put("/api/users/profile").send(updatedProfile);
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Unauthorized');
        });
    });
});

describe("User Permission Routes", () => {
    describe("GET /api/user-permissions/:userId", () => {
        it("Should fetch user permissions", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const response = await request(app).get(`/api/user-permissions/${userId}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it("Should return 404 if the user is not found", async () => {
            const userId = "invalidUserId";
            const response = await request(app).get(`/api/user-permissions/${userId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe("POST /api/user-permissions/:userId", () => {
        it("Should set user permissions", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const newPermissions = {
                roles: ["roleId1", "roleId2"]
            };
            const response = await request(app).post(`/api/user-permissions/${userId}`).send(newPermissions);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it("Should return 400 if the request body is invalid", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const invalidPermissions = {
                roles: "invalidRoleId" // Deve ser um array
            };
            const response = await request(app).post(`/api/user-permissions/${userId}`).send(invalidPermissions);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe("DELETE /api/user-permissions/:userId/:roleId", () => {
        it("Should remove a user's permission", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const roleId = "roleId"; // Substitua pelo ID de um papel válido no seu banco de dados de teste
            const response = await request(app).delete(`/api/user-permissions/${userId}/${roleId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Permission removed successfully');
        });

        it("Should return 404 if the user or role is not found", async () => {
            const userId = "invalidUserId";
            const roleId = "invalidRoleId";
            const response = await request(app).delete(`/api/user-permissions/${userId}/${roleId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User or role not found');
        });
    });
});

describe("Search and Gamification Routes", () => {
    describe("GET /api/search", () => {
        it("Should search users by query", async () => {
            const query = "testUser";
            const response = await request(app).get(`/api/search`).query({ query });
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it("Should return 400 if query parameter is missing", async () => {
            const response = await request(app).get(`/api/search`);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe("GET /api/user-points", () => {
        it("Should fetch user points by userId", async () => {
            const userId = "validUserId"; // Substitua pelo ID de um usuário válido no seu banco de dados de teste
            const response = await request(app).get(`/api/user-points`).query({ userId });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('userId', userId);
            expect(response.body).toHaveProperty('points');
        });

        it("Should return 400 if userId query parameter is missing", async () => {
            const response = await request(app).get(`/api/user-points`);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe("POST /api/user-points/add", () => {
        it("Should add points to a user", async () => {
            const pointsData = {
                userId: "validUserId",
                points: 100
            };
            const response = await request(app).post(`/api/user-points/add`).send(pointsData);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('userId', pointsData.userId);
            expect(response.body.points).toBe(pointsData.points);
        });

        it("Should return 400 if the request body is invalid", async () => {
            const invalidPointsData = {
                userId: "validUserId"
            };
            const response = await request(app).post(`/api/user-points/add`).send(invalidPointsData);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe("GET /api/leaderboard", () => {
        it("Should fetch the leaderboard", async () => {
            const response = await request(app).get(`/api/leaderboard`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});
