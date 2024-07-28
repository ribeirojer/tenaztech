import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.0.0/mod.ts";
import { SupabaseCustomerRepository } from "../../infrastructure/repositories/SupabaseCustomerRepository.ts";
import { app } from "../../main.ts";

Deno.test("it should allow post requests with valid registration", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/register")
		.set("Content-Type", "application/json")
		.send({
			name: "newuser",
			email: "eduardojerbr@gmail.com",
			password: "Senha!23",
			confirmPassword: "Senha!23",
		})
		.expect(201)
		.expect((ctx) => {
			const body = JSON.parse(ctx.text);
			assertEquals(body.message, "Registro realizado com sucesso!");
		});

	const supabaseCustomerRepository = new SupabaseCustomerRepository();
	// Clean up the test data after the test
	await supabaseCustomerRepository.deleteByEmail("eduardojerbr@gmail.com");
});

Deno.test("it should reject post requests with too short name", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/register")
		.set("Content-Type", "application/json")
		.send({
			name: "us",
			email: "valid@example.com",
			password: "Password123!",
			confirmPassword: "Password123!",
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const nameIssue = body.error.issues.find(
				(issue: { path: string | string[] }) => issue.path.includes("name"),
			);
			assertEquals(
				nameIssue.message,
				"O nome deve ter pelo menos 3 caracteres",
			);
		});
});

Deno.test("it should reject post requests with invalid email", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/register")
		.set("Content-Type", "application/json")
		.send({
			name: "User",
			email: "invalid-email",
			password: "Password123!",
			confirmPassword: "Password123!",
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

Deno.test("it should reject post requests with password missing uppercase letter", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/register")
		.set("Content-Type", "application/json")
		.send({
			name: "User",
			email: "valid@example.com",
			password: "password123!",
			confirmPassword: "password123!",
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const passwordIssue = body.error.issues.find(
				(issue: { path: string | string[] }) => issue.path.includes("password"),
			);
			assertEquals(
				passwordIssue.message,
				"A senha deve conter pelo menos uma letra maiúscula",
			);
		});
});

Deno.test("it should reject post requests with password missing special character", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/register")
		.set("Content-Type", "application/json")
		.send({
			name: "User",
			email: "valid@example.com",
			password: "Password123",
			confirmPassword: "Password123",
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const passwordIssue = body.error.issues.find(
				(issue: { path: string | string[] }) => issue.path.includes("password"),
			);
			assertEquals(
				passwordIssue.message,
				"A senha deve conter pelo menos um caractere especial",
			);
		});
});

Deno.test("it should reject post requests with mismatched passwords", async () => {
	const request = await superoak(app);
	await request
		.post("/auth/register")
		.set("Content-Type", "application/json")
		.send({
			name: "User",
			email: "valid@example.com",
			password: "Password123!",
			confirmPassword: "DifferentPassword123!",
		})
		.expect(400)
		.expect(({ text }) => {
			const body = JSON.parse(text);
			const confirmPasswordIssue = body.error.issues.find(
				(issue: { path: string | string[] }) =>
					issue.path.includes("confirmPassword"),
			);
			assertEquals(confirmPasswordIssue.message, "As senhas não coincidem");
		});
});
