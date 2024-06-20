import { app } from "../src";
import { describe, expect, it } from "bun:test";
import { post, put, del, get } from "./utils";

describe("Role Routes", () => {
	describe("GET /api/roles", () => {
		it("Should fetch all roles", async () => {
			const response = await request(app).get("/api/roles");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});
	});

	describe("GET /api/roles/:id", () => {
		it("Should fetch a specific role by ID", async () => {
			const roleId = "validRoleId"; // Substitua pelo ID de um papel válido no seu banco de dados de teste
			const response = await request(app).get(`/api/roles/${roleId}`);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("id", roleId);
		});

		it("Should return 404 if the role is not found", async () => {
			const roleId = "invalidRoleId";
			const response = await request(app).get(`/api/roles/${roleId}`);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Role not found");
		});
	});

	describe("POST /api/roles", () => {
		it("Should create a new role", async () => {
			const newRole = {
				name: "Admin",
				description: "Administrator role",
			};
			const response = await request(app).post("/api/roles").send(newRole);
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("id");
			expect(response.body.name).toBe(newRole.name);
			expect(response.body.description).toBe(newRole.description);
		});

		it("Should return 400 if the request body is invalid", async () => {
			const invalidRole = {
				description: "Role without a name",
			};
			const response = await request(app).post("/api/roles").send(invalidRole);
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("PUT /api/roles/:id", () => {
		it("Should update an existing role", async () => {
			const roleId = "validRoleId"; // Substitua pelo ID de um papel válido no seu banco de dados de teste
			const updatedData = {
				name: "Super Admin",
				description: "Super Administrator role",
			};
			const response = await request(app)
				.put(`/api/roles/${roleId}`)
				.send(updatedData);
			expect(response.status).toBe(200);
			expect(response.body.name).toBe(updatedData.name);
			expect(response.body.description).toBe(updatedData.description);
		});

		it("Should return 404 if the role is not found", async () => {
			const roleId = "invalidRoleId";
			const updatedData = {
				name: "Super Admin",
				description: "Super Administrator role",
			};
			const response = await request(app)
				.put(`/api/roles/${roleId}`)
				.send(updatedData);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Role not found");
		});
	});

	describe("DELETE /api/roles/:id", () => {
		it("Should delete a role", async () => {
			const roleId = "validRoleId"; // Substitua pelo ID de um papel válido no seu banco de dados de teste
			const response = await request(app).delete(`/api/roles/${roleId}`);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Role deleted successfully",
			);
		});

		it("Should return 404 if the role is not found", async () => {
			const roleId = "invalidRoleId";
			const response = await request(app).delete(`/api/roles/${roleId}`);
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error", "Role not found");
		});
	});
});
