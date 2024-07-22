import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const deliveryUseCases = UseCaseFactory.createDeliveryUseCases();
const router = new Router();

router.post("/deliveries", async (ctx) => {
	try {
		const body = await ctx.request.body({ type: "json" }).value;
		const errors = validateSchedule(body);
		if (errors.length > 0) {
			logger.warn(`Delivery schedule validation errors: ${errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { errors };
			return;
		}
		const result = await deliveryUseCases.schedule.execute(body);
		logger.info(`Delivery scheduled: ${result}`);
		ctx.response.status = 201;
		ctx.response.body = { data: result };
	} catch (error) {
		logger.error(`Delivery scheduling error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.put("/deliveries/:id/date", async (ctx) => {
	try {
		const body = await ctx.request.body({ type: "json" }).value;
		const { id } = ctx.params;
		const errors = validateUpdateDate(body);
		if (errors.length > 0) {
			logger.warn(`Update date validation errors: ${errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { errors };
			return;
		}
		await deliveryUseCases.updateDate.execute({ ...body, id });
		logger.info(`Delivery date updated: ${id}`);
		ctx.response.status = 200;
	} catch (error) {
		logger.error(`Update date error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.post("/deliveries/:id/notify-delay", async (ctx) => {
	try {
		const body = await ctx.request.body({ type: "json" }).value;
		const { id } = ctx.params;
		const errors = validateNotifyDelay(body);
		if (errors.length > 0) {
			logger.warn(`Notify delay validation errors: ${errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { errors };
			return;
		}
		await deliveryUseCases.notifyDelay.execute({ ...body, id });
		logger.info(`Delay notified for delivery: ${id}`);
		ctx.response.status = 200;
	} catch (error) {
		logger.error(`Notify delay error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;

// Funções de validação (placeholders, devem ser implementadas conforme necessário)
function validateSchedule(body: any): string[] {
	const errors: string[] = [];
	// Adicione suas validações aqui
	if (!body.date) errors.push("Date is required");
	if (!body.address) errors.push("Address is required");
	return errors;
}

function validateUpdateDate(body: any): string[] {
	const errors: string[] = [];
	// Adicione suas validações aqui
	if (!body.newDate) errors.push("New date is required");
	return errors;
}

function validateNotifyDelay(body: any): string[] {
	const errors: string[] = [];
	// Adicione suas validações aqui
	if (!body.delayReason) errors.push("Delay reason is required");
	return errors;
}
