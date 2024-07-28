import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { app } from "../../main.ts";

Deno.test("it should reject login requests with invalid email", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/login")
		.set("Content-Type", "application/json")
		.send({
			email: "invalid-email",
			password: "Password123!",
			rememberMe: true,
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const emailIssue = body.error.issues.find(
				(issue: { path: string | string[] }) => issue.path.includes("email"),
			);
			assertEquals(emailIssue.message, "Por favor, insira um email válido");
		});
});

Deno.test("it should reject login requests with short password", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/login")
		.set("Content-Type", "application/json")
		.send({
			email: "valid@example.com",
			password: "short",
			rememberMe: true,
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const passwordIssue = body.error.issues.find(
				(issue: { path: string | string[] }) => issue.path.includes("password"),
			);
			assertEquals(
				passwordIssue.message,
				"A senha deve ter pelo menos 8 caracteres",
			);
		});
});

Deno.test("it should accept valid login requests with remember", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/login")
		.set("Content-Type", "application/json")
		.send({
			email: "valid@example.com",
			password: "Password123!",
			rememberMe: true,
		})
		.expect(200)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			// Verifique a resposta correta para um login bem-sucedido
			assertEquals(!!body.accessToken, true);
		});
});

Deno.test("it should accept valid login requests without remember", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/login")
		.set("Content-Type", "application/json")
		.send({
			email: "valid@example.com",
			password: "Password123!",
		})
		.expect(200)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			// Verifique a resposta correta para um login bem-sucedido
			assertEquals(!!body.accessToken, true);
		});
});

Deno.test("it should reject login requests with non-boolean remember", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/login")
		.set("Content-Type", "application/json")
		.send({
			email: "valid@example.com",
			password: "Password123!",
			rememberMe: "yes",
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const rememberIssue = body.error.issues.find(
				(issue: { path: string | string[] }) =>
					issue.path.includes("rememberMe"),
			);
			assertEquals(rememberIssue.message, "Expected boolean, received string");
		});
});

/** 

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
});*/
