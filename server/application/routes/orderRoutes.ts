import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import { orderSchema } from "../schemas/orderSchema.ts";

const orderUseCases = UseCaseFactory.createOrderUseCases();
const router = new Router();

// Order routes
router.post("/orders", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		orderSchema.parse(body);
		await orderUseCases.create.execute(body);
		logger.info(`Order created: ${JSON.stringify(body)}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Order created successfully" };
	} catch (error) {
		logger.error(`Order creation error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.put("/orders/:id", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await orderUseCases.update.execute(id, { ...body });
		logger.info(`Order updated: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Order updated successfully" };
	} catch (error) {
		logger.error(`Order update error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.delete("/orders/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		await orderUseCases.cancel.execute(id);
		logger.info(`Order canceled: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Order canceled successfully" };
	} catch (error) {
		logger.error(`Order cancellation error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/orders", async (ctx) => {
	try {
		const orders = await orderUseCases.list.execute();
		logger.info("Listed orders");
		ctx.response.status = 200;
		ctx.response.body = orders;
	} catch (error) {
		logger.error(`List orders error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/orders/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		const order = await orderUseCases.detail.execute(id);
		logger.info(`Fetched order detail: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = order;
	} catch (error) {
		logger.error(`Get order detail error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
