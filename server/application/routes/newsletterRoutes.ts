import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { isValidEmail } from "../../utils/validation.ts"; // Supondo que você tenha uma função de validação

const newsletterUseCases = UseCaseFactory.createNewsletterUseCases();
const router = new Router();

router.post("/newsletters/subscribe", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { email, name } = body;

		// Validar email
		if (!isValidEmail(email)) {
			logger.warn(`Invalid email format: ${email}`);
			ctx.response.status = 400;
			ctx.response.body = { error: "Invalid email format" };
			return;
		}

		await newsletterUseCases.subscribe.execute(email, { name });
		logger.info(`Subscribed to newsletter: ${email}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Subscription successful" };
	} catch (error) {
		logger.error(`Subscription error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/newsletters/unsubscribe", async (ctx) => {
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

router.post("/newsletters/send", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { subject, content } = body;

		// Validar conteúdo da newsletter
		if (!subject || !content) {
			logger.warn(`Missing subject or content`);
			ctx.response.status = 400;
			ctx.response.body = { error: "Subject and content are required" };
			return;
		}

		//const newsletter = { subject, content, sentAt: new Date() };
		//await newsletterUseCases.send.execute(newsletter);
		logger.info(`Newsletter sent: ${subject}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Newsletter sent successfully" };
	} catch (error) {
		logger.error(`Send newsletter error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/newsletters", async (ctx) => {
	try {
		const newsletters = await newsletterUseCases.list.execute();
		logger.info("Listed newsletters");
		ctx.response.status = 200;
		ctx.response.body = newsletters;
	} catch (error) {
		logger.error(`List newsletters error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/newsletters/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		const newsletter = await newsletterUseCases.detail.execute(id);
		logger.info(`Fetched newsletter detail: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = newsletter;
	} catch (error) {
		logger.error(`Get newsletter detail error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
