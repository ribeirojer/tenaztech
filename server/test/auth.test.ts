import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../main.ts";

Deno.test("it should allow post requests with valid login", async () => {
	const request = await superoak(app);
	await request
		.post("/login")
		.set("Content-Type", "application/json")
		.send({
			email: "user@example.com",
			password: "password123",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.message, "Login successful");
		});
});

Deno.test("it should reject post requests with invalid login", async () => {
	const request = await superoak(app);
	await request
		.post("/login")
		.set("Content-Type", "application/json")
		.send({
			email: "invalid-email",
			password: "123",
		})
		.expect(400)
		.expect(({ body }) => {
			assertEquals(body.error.length > 0, true);
		});
});

Deno.test("it should allow post requests with valid registration", async () => {
	const request = await superoak(app);
	await request
		.post("/register")
		.set("Content-Type", "application/json")
		.send({
			username: "newuser",
			email: "newuser@example.com",
			password: "password123",
			confirmPassword: "password123",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.message, "Registration successful");
		});
});

Deno.test("it should reject post requests with invalid registration", async () => {
	const request = await superoak(app);
	await request
		.post("/register")
		.set("Content-Type", "application/json")
		.send({
			username: "us",
			email: "invalid-email",
			password: "password123",
			confirmPassword: "differentpassword",
		})
		.expect(400)
		.expect(({ body }) => {
			assertEquals(body.error.length > 0, true);
		});
});

Deno.test("it should allow POST requests to recover password with email", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/recover-password")
		.set("Content-Type", "application/json")
		.send({
			email: "user@example.com",
		})
		.expect(200)
		.expect(({ body }) => {
			assertEquals(body.message, "Recovery email sent");
		});
});

Deno.test("it should reject POST requests to recover password without email", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/recover-password")
		.set("Content-Type", "application/json")
		.send({})
		.expect(400)
		.expect(({ body }) => {
			assertEquals(body.message, "Email is required");
		});
});
