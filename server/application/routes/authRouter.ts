import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import {
	validateLogin,
	validateRegister,
	validateRecoverPassword,
	validateLogout,
} from "../validators/authValidators.ts";
import { logger } from "../../infrastructure/config/logger.ts";

const authUseCases = UseCaseFactory.createAuthUseCases();
const router = new Router();

export default router;

router.post("/auth/login", async (ctx)=>{
		try {
			const body = await ctx.request.body().value;
			const errors = validateLogin(body);
			if (errors.length > 0) {
				logger.warn(`Login validation errors: ${errors.join(", ")}`);
				ctx.response.status = 400;
				ctx.response.body = { errors };
				return;
			}
			const result = await authUseCases.login.execute(body);
			logger.info(`User logged in: ${body.username}`);
			ctx.response.status = 200;
			ctx.response.body = { data: result };
		} catch (error) {
			logger.error(`Login error: ${error.message}`);
			ctx.response.status = 500;
			ctx.response.body = { error: error.message };
		}
	})

router.post("/auth/logout", async (ctx)=>{
		try {
			const body = await ctx.request.body().value;
			const errors = validateLogout(body);
			if (errors.length > 0) {
				logger.warn(`Logout validation errors: ${errors.join(", ")}`);
				ctx.response.status = 400;
				ctx.response.body = { errors };
				return;
			}
			await authUseCases.logout.execute(body);
			logger.info(`User logged out: ${body.token}`);
			ctx.response.status = 200;
			ctx.response.body = { message: "Logout successful" };
		} catch (error) {
			logger.error(`Logout error: ${error.message}`);
			ctx.response.status = 500;
			ctx.response.body = { error: error.message };
		}
});
router.post("/auth/register", async (ctx)=>{
		try {
			const body = await ctx.request.body().value;
			const errors = validateRegister(body);
			if (errors.length > 0) {
				logger.warn(`Register validation errors: ${errors.join(", ")}`);
				ctx.response.status = 400;
				ctx.response.body = { errors };
				return;
			}
			await authUseCases.register.execute(body);
			logger.info(`New user registered: ${body.username}`);
			ctx.response.status = 201;
			ctx.response.body = { message: "Registration successful" };
		} catch (error) {
			logger.error(`Register error: ${error.message}`);
			ctx.response.status = 500;
			ctx.response.body = { error: error.message };
		}
});

router.post("/auth/recover-password", async (ctx)=>{
		try {
			const body = await ctx.request.body().value;
			const errors = validateRecoverPassword(body);
			if (errors.length > 0) {
				logger.warn(
					`RecoverPassword validation errors: ${errors.join(", ")}`,
				);
				ctx.response.status = 400;
				ctx.response.body = { errors };
				return;
			}
			const result = await authUseCases.recoverPassword.execute(body);
			logger.info(`Password recovery initiated for: ${body.email}`);
			ctx.response.status = 200;
			ctx.response.body = { data: result };
		} catch (error) {
			logger.error(`RecoverPassword error: ${error.message}`);
			ctx.response.status = 500;
			ctx.response.body = { error: error.message };
		}
});
