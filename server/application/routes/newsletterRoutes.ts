import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import { isValidEmail } from "../schemas/validation.ts"; // Supondo que você tenha uma função de validação

const newsletterUseCases = UseCaseFactory.createNewsletterUseCases();
const router = new Router();

router.post("/newsletter/subscribe", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { email } = body;

		// Validar email
		if (!isValidEmail(email)) {
			logger.warn(`Invalid email format: ${email}`);
			ctx.response.status = 400;
			ctx.response.body = { error: "Invalid email format" };
			return;
		}

		await newsletterUseCases.subscribe.execute(email);
		logger.info(`Subscribed to newsletter: ${email}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Subscription successful" };
	} catch (error) {
		logger.error(`Subscription error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/newsletter/unsubscribe", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { email } = body;

		if (!isValidEmail(email)) {
			logger.warn(`Invalid email format: ${email}`);
			ctx.response.status = 400;
			ctx.response.body = { error: "Invalid email format" };
			return;
		}

		await newsletterUseCases.unsubscribe.execute(email);
		logger.info(`Unsubscribed from newsletter: ${email}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Unsubscription successful" };
	} catch (error) {
		logger.error(`Unsubscription error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
