import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import {
	loginSchema,
	logoutSchema,
	refreshTokenSchema,
	registerSchema,
	resetPasswordSchema,
} from "../schemas/authSchemas.ts";
import { recoverPasswordSchema } from "../schemas/authSchemas.ts";

const authUseCases = UseCaseFactory.createAuthUseCases();
const router = new Router();

router.post("/auth/login", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { success, data, error } = loginSchema.safeParse(body);
		if (!success) {
			logger.warn(`Login validation errors: ${error.errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { error };
			return;
		}
		const { accessToken, refreshToken } =
			await authUseCases.login.execute(data);
		logger.info(`User logged in: ${data.email}`);
		ctx.response.status = 200;
		ctx.response.body = { accessToken, refreshToken };
	} catch (error) {
		logger.error(`Login error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/auth/logout", async (ctx) => {
	try {
		const body = await ctx.request.body().value;

		const { success, data, error } = logoutSchema.safeParse(body);

		if (!success) {
			logger.warn(`Logout validation errors: ${error.errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { error };
			return;
		}
		await authUseCases.logout.execute(data);
		logger.info(`User logged out: ${body.token}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Logout successful" };
	} catch (error) {
		logger.error(`Logout error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/auth/register", async (ctx) => {
	try {
		const body = await ctx.request.body().value;

		const { success, data, error } = registerSchema.safeParse(body);

		if (!success) {
			logger.warn(`Register validation errors: ${error.errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { error };
			return;
		}
		await authUseCases.register.execute(data);
		logger.info(`New user registered: ${body.name}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Registro realizado com sucesso!" };
	} catch (error) {
		logger.error(`Register error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/auth/recover-password", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { success, data, error } = recoverPasswordSchema.safeParse(body);

		if (!success) {
			logger.warn(
				`RecoverPassword validation errors: ${error.errors.join(", ")}`,
			);
			ctx.response.status = 400;
			ctx.response.body = { error };
			return;
		}
		const result = await authUseCases.recoverPassword.execute(data);
		logger.info(`Password recovery initiated for: ${body.email}`);
		ctx.response.status = 200;
		ctx.response.body = { data: result };
	} catch (error) {
		logger.error(`RecoverPassword error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/auth/verify-email/:token", async (ctx) => {
	try {
		const token = ctx.params.token;
		const result = await authUseCases.verifyEmail.execute({
			verificationToken: token,
		});
		logger.info(`Email verified: ${token}`);
		ctx.response.status = 200;
		ctx.response.body = { data: result };
	} catch (error) {
		logger.error(`Email verification error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/auth/reset-password/:token", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const token = ctx.params.token;
		const { success, data, error } = resetPasswordSchema.safeParse(body);

		if (!success) {
			logger.warn(
				`PasswordReset validation errors: ${error.errors.join(", ")}`,
			);
			ctx.response.status = 400;
			ctx.response.body = { error };
			return;
		}
		const result = await authUseCases.resetPassword.execute({
			newPassword: data.password,
			resetToken: token,
		});
		logger.info(`Password reset initiated: ${token}`);
		ctx.response.status = 200;
		ctx.response.body = { data: result };
	} catch (error) {
		logger.error(`Password reset error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/auth/refresh-token/:token", async (ctx) => {
	try {
		const token = ctx.params.token;
		const body = await ctx.request.body().value;
		const { success, data, error } = refreshTokenSchema.safeParse(body);
		if (!success) {
			logger.warn(`RefreshToken validation errors: ${error.errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { error };
			return;
		}
		const result = await authUseCases.refreshToken.execute(data);
		logger.info(`Token refreshed: ${token}`);
		ctx.response.status = 200;
		ctx.response.body = { data: result };
	} catch (error) {
		logger.error(`RefreshToken error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
