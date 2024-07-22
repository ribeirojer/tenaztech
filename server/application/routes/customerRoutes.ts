import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const customerUseCases = UseCaseFactory.createCustomerUseCases();
const router = new Router();

router.post("/customers", async (ctx) => {
	try {
		const body = await ctx.request.body({ type: "json" }).value;
		// Aqui você pode adicionar validações personalizadas se necessário
		const result = await customerUseCases.register.execute(body);
		logger.info(`Customer registered: ${result.id}`);
		ctx.response.status = 201;
		ctx.response.body = { data: result };
	} catch (error) {
		logger.error(`Customer registration error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.put("/customers/:id", async (ctx) => {
	try {
		const body = await ctx.request.body({ type: "json" }).value;
		const { id } = ctx.params;
		const errors = validateUpdate(body);
		if (errors.length > 0) {
			logger.warn(`Customer update validation errors: ${errors.join(", ")}`);
			ctx.response.status = 400;
			ctx.response.body = { errors };
			return;
		}
		await customerUseCases.update.execute({ ...body, id });
		logger.info(`Customer updated: ${id}`);
		ctx.response.status = 200;
	} catch (error) {
		logger.error(`Customer update error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.delete("/customers/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		await customerUseCases.remove.execute(id);
		logger.info(`Customer deleted: ${id}`);
		ctx.response.status = 200;
	} catch (error) {
		logger.error(`Customer deletion error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/customers", async (ctx) => {
	try {
		const customers = await customerUseCases.list.execute();
		logger.info("Fetched all customers");
		ctx.response.status = 200;
		ctx.response.body = { data: customers };
	} catch (error) {
		logger.error(`Fetching customers error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

router.get("/customers/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		const customer = await customerUseCases.detail.execute(id);
		if (!customer) {
			logger.warn(`Customer not found: ${id}`);
			ctx.response.status = 404;
			ctx.response.body = { error: "Customer not found" };
			return;
		}
		logger.info(`Fetched customer: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = { data: customer };
	} catch (error) {
		logger.error(`Fetching customer error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;

// Funções de validação (placeholders, devem ser implementadas conforme necessário)
function validateUpdate(body: any): string[] {
	const errors: string[] = [];
	// Adicione suas validações aqui
	return errors;
}
