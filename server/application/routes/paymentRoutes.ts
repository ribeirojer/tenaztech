import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const paymentUseCases = UseCaseFactory.createPaymentUseCases();
const router = new Router();

router.post("/payments", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { orderId, amount, paymentMethod, email } = body;
		await paymentUseCases.process.execute(
			orderId,
			amount,
			paymentMethod,
			email,
		);
		logger.info(`Payment processed: ${JSON.stringify(body)}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Payment processed successfully" };
	} catch (error) {
		logger.error(`Payment processing error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/payments/refund", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		await paymentUseCases.refund.execute(body);
		logger.info(`Payment refund requested: ${JSON.stringify(body)}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Payment refund requested successfully" };
	} catch (error) {
		logger.error(`Payment refund error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/payments/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		const payment = await paymentUseCases.detail.execute(id);
		logger.info(`Fetched payment detail: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = payment;
	} catch (error) {
		logger.error(`Get payment detail error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
