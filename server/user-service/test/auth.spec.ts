import { describe, expect, it } from "bun:test";
import { app } from "../src";
import { AuthController } from "../src/controllers/AuthController";
import { UserService } from "../src/services/UserService";
import { post } from "./utils";

describe("POST /auth/register", () => {
	it.skip("should create a new user and return a success response", async () => {
		const date = new Date();
		const userEmail = `user${date.getTime()}@example.com`;

		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "John",
				lastName: "Doe",
				email: userEmail,
				password: "PasswordStrong123",
			}),
		);

		expect(response.status).toBe(201);
		const { user, token } = JSON.parse(await response.text());
		expect(user).toBeTruthy();
		expect(token).toBeTruthy();
	});

	it("should return an error when registration data is invalid", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			}),
		);

		expect(response.status).toBe(400);

		const { error } = JSON.parse(await response.text());
		expect(error).toBe("All fields are required");
	});

	it("should return an error when the email is already in use", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "Jane",
				lastName: "Smith",
				email: "user@example.com",
				password: "Password123",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Email already in use");
	});

	it("should return an error when the password is too weak (must be at least 8 characters long)", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "Alice",
				lastName: "Johnson",
				email: "user7@example.com",
				password: "12345",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe(
			"Password is too weak (must be at least 8 characters long)",
		);
	});

	it("should return an error when the password is too weak (must contain at least one uppercase letter)", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "Alice",
				lastName: "Johnson",
				email: "user7@example.com",
				password: "password123",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe(
			"Password is too weak (must contain at least one uppercase letter)",
		);
	});

	it("should return an error when the password is too weak (must contain at least one lowercase letter)", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "Alice",
				lastName: "Johnson",
				email: "user7@example.com",
				password: "PASSWORD123",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe(
			"Password is too weak (must contain at least one lowercase letter)",
		);
	});

	it("should return an error when the password is too weak (must contain at least one  number)", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "Alice",
				lastName: "Johnson",
				email: "user7@example.com",
				password: "PASSWORd",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe(
			"Password is too weak (must contain at least one number)",
		);
	});

	it("should return an error when the email is invalid", async () => {
		const response = await app.handle(
			post("/api/auth/register", {
				firstName: "Bob",
				lastName: "Brown",
				email: "invalid_email",
				password: "password123",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Invalid email format");
	});

	it("Should return a 500 error and error message", async () => {
		const body = {};
		const set = {
			status: (statusCode: number) => {
				expect(statusCode).toBe(500);
				return {
					json: (responseJson: { error: string }) => {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await AuthController.register({ body, set } as any as any);
	});
});

describe("POST /auth/login", () => {
	it("Should successfully authenticate the user", async () => {
		const userData = {
			email: "user@example.com",
			password: "Password123",
		};

		const response = await app.handle(post("/api/auth/login", userData));

		expect(response.status).toBe(200);
		const { success, message, user, token } = JSON.parse(await response.text());

		expect(success).toBe(true);
		expect(message).toBe("Authentication successful");
		expect(token).toBeTruthy();
		expect(user).toBeTruthy();
	});

	it("Should return a 400 error if the email is invalid", async () => {
		const userData = {
			email: "invalidEmail@example",
			password: "PasswordStrong123",
		};
		const response = await app.handle(post("/api/auth/login", userData));

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Invalid email format");
	});

	it("Should return a 400 error if password is missing", async () => {
		const userData = {
			email: "user@example.com",
			password: "",
		};

		const response = await app.handle(post("/api/auth/login", userData));

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Email and password are required");
	});

	it("Should return a 404 error if the user does not exist", async () => {
		const userData = {
			email: "nonexistentUser@example.com",
			password: "password123",
		};

		const response = await app.handle(post("/api/auth/login", userData));

		expect(response.status).toBe(404);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("User not found");
	});

	it("Should return a 401 error if the password is invalid", async () => {
		const userData = {
			email: "user@example.com",
			password: "incorrectPassword",
		};

		const response = await app.handle(post("/api/auth/login", userData));

		expect(response.status).toBe(401);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Invalid password");
	});

	it("Should return a 500 error and error message", async () => {
		const body = {};
		const set = {
			status: (statusCode: number) => {
				expect(statusCode).toBe(500);
				return {
					json: (responseJson: { error: string }) => {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await AuthController.login({ body, set } as any);
	});
});

describe("POST /auth/forgot-password", () => {
	it("should send a password reset email", async () => {
		const response = await app.handle(
			post("/api/auth/forgot-password", { email: "user@example.com" }),
		);

		expect(response.status).toBe(200);
		const { message } = JSON.parse(await response.text());

		expect(message).toEqual("Password reset email sent");
	});

	it("should return 400 if email is missing", async () => {
		const response = await app.handle(
			post("/api/auth/forgot-password", { email: "" }),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toEqual("Email is required");
	});

	it("should return 400 if email is invalid", async () => {
		const response = await app.handle(
			post("/api/auth/forgot-password", { email: "invalidEmail" }),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toEqual("Invalid email format");
	});

	it("should return 400 if email is not registred", async () => {
		const response = await app.handle(
			post("/api/auth/forgot-password", { email: "notRegistred@email.com" }),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toEqual(
			"If a user with this email exists, you will receive an email with instructions.",
		);
	});
});

describe("POST /auth/change-password", () => {
	it("Should successfully change the password", async () => {
		const user: any = await UserService.getUserByEmail("maria@example.com");
		if (user) {
			user.passwordresettoken = "validToken";
			const onehour = new Date(Date.now() + 3600000)
			user.passwordresetexpiresat = onehour.toISOString()
		}

		await UserService.updateUser(user.id, user);

		const newPassword = "NewPassword123";

		const response = await app.handle(
			post("/api/auth/change-password", {
				password: newPassword,
				confirmPassword: newPassword,
				token: "validToken",
			}),
		);

		expect(response.status).toBe(200);

		const { message } = JSON.parse(await response.text());

		expect(message).toBe("Password changed successfully.");

		const updatedUser = await UserService.getUserById(user?._id);

		if (updatedUser) {
			expect(updatedUser.passwordResetToken).toBeNull();
			expect(updatedUser.passwordResetExpiresAt).toBeNull();
		}
	});

	it("Should return a 400 error if the token is invalid or expired", async () => {
		const newPassword = "NewPassword123";

		const response = await app.handle(
			post("/api/auth/change-password", {
				password: newPassword,
				confirmPassword: newPassword,
				token: "invalidToken",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Invalid or expired token.");
	});

	it("Should return a 400 error if the password is too weak", async () => {
		const newPassword = "weak";

		const response = await app.handle(
			post("/api/auth/change-password", {
				password: newPassword,
				confirmPassword: newPassword,
				token: "validToken",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe(
			"Password is too weak. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
		);
	});

	it("Should return a 400 error if the confirmPassword does not match the password", async () => {
		const newPassword = "NewPassword123";
		const confirmPassword = "MismatchedPassword123";

		const response = await app.handle(
			post("/api/auth/change-password", {
				password: newPassword,
				confirmPassword: confirmPassword,
				token: "validToken", // Valid token associated with the user
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Passwords do not match.");
	});

	it("Should return a 400 error if the password field is missing", async () => {
		const response = await app.handle(
			post("/api/auth/change-password", {
				password: "",
				confirmPassword: "NewPassword123", // Valid confirmation
				token: "validToken", // Valid token associated with the user
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Password is required.");
	});

	it("Should return a 400 error if the confirmPassword field is missing", async () => {
		const response = await app.handle(
			post("/api/auth/change-password", {
				password: "NewPassword123", // Valid password
				confirmPassword: "",
				token: "validToken", // Valid token associated with the user
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Confirm password is required.");
	});

	it("Should return a 400 error if the Password reset token has expired.", async () => {
		const user: any = await UserService.getUserByEmail("joao@example.com");

		if (user) {
			user.passwordresettoken = "ValidToken";
			const onehourpast = new Date(Date.now() - 3600000)
			user.passwordresetexpiresat = onehourpast.toISOString()
		}

		await UserService.updateUser(user.id , user);

		const newPassword = "NewPassword123";

		const response = await app.handle(
			post("/api/auth/change-password", {
				password: newPassword,
				confirmPassword: newPassword,
				token: "ValidToken", // Valid token associated with the user
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());

		expect(error).toBe("Password reset token has expired.");
	});

	it("Should return a 500 error and error message", async () => {
		const body = {};
		const set = {
			status: (statusCode: number) => {
				expect(statusCode).toBe(500);
				return {
					json: (responseJson: { error: string }) => {
						expect(responseJson.error).toBe("Internal server error.");
					},
				};
			},
		};

		await AuthController.changePassword({ body, set } as any);
	});
});

describe("POST /auth/confirm-email", () => {
	it("Should successfully confirm the e-mail", async () => {
		const userData = {
			userId: "3",
			token: "valid_token",
		};

		const user = await UserService.getUserById(userData.userId);

		if (user) {
			user.confirmationtoken = userData.token;
		}

		await UserService.updateUser(userData.userId, user);

		const response = await app.handle(
			post("/api/auth/confirm-email", userData),
		);

		expect(response.status).toBe(200);
		const { success, message } = JSON.parse(await response.text());

		expect(success).toBe(true);
		expect(message).toBe("Email confirmed successfully!");

		const updatedUser = await UserService.getUserById(userData.userId);
		expect(updatedUser?.emailverified).toBe(true);
	});

	it("Should return a 400 error if the userId is missing.", async () => {
		const userData = { userId: "", token: "invalid_token" };

		const response = await app.handle(
			post("/api/auth/confirm-email", userData),
		);

		expect(response.status).toBe(400);
		const { success, message } = JSON.parse(await response.text());

		expect(success).toBe(false);
		expect(message).toBe("UserId and token are required.");
	});

	it("Should return a 400 error if the token is missing.", async () => {
		const userData = { userId: "64fe609360e4878462aefea6" };

		const response = await app.handle(
			post("/api/auth/confirm-email", userData),
		);

		expect(response.status).toBe(400);
		const { success, message } = JSON.parse(await response.text());

		expect(success).toBe(false);
		expect(message).toBe("UserId and token are required.");
	});

	it("Should return a 400 error if the token is invalid.", async () => {
		const userData = {
			userId: 3,
			token: "invalid_token",
		};

		const response = await app.handle(
			post("/api/auth/confirm-email", userData),
		);

		expect(response.status).toBe(400);
		const { success, message } = JSON.parse(await response.text());

		expect(success).toBe(false);
		expect(message).toBe("Invalid or expired confirmation token.");
	});

	it("Should return a 500 error and error message", async () => {
		const body = {};
		const set = {
			status: (statusCode: number) => {
				expect(statusCode).toBe(500);
				return {
					json: (responseJson: { message: string; success: boolean }) => {
						expect(responseJson.message).toBe(
							"Error confirming the email. Please try again.",
						);
						expect(responseJson.success).toBe(false);
					},
				};
			},
		};

		await AuthController.confirmEmail({ body, set } as any);
	});
});
