import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";
import { logger } from "../../infrastructure/config/logger.ts";

const productUseCases = UseCaseFactory.createProductUseCases();
const router = new Router();

// List all products
router.get("/products", async (ctx) => {
	try {
		const products = await productUseCases.list.execute();
		logger.info("Listed products");
		ctx.response.status = 200;
		ctx.response.body = products;
	} catch (error) {
		logger.error(`List products error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Get product details
router.get("/products/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		const product = await productUseCases.detail.execute(id);
		logger.info(`Fetched product detail: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = product;
	} catch (error) {
		logger.error(`Get product detail error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Add a new product
router.post("/products", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		//await productUseCases.add.execute(body);
		logger.info(`Product added: ${JSON.stringify(body)}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Product added successfully" };
	} catch (error) {
		logger.error(`Add product error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Update an existing product
router.put("/products/:id", async (ctx) => {
	try {
		const _body = await ctx.request.body().value;
		const { id } = ctx.params;
		//await productUseCases.update.execute({ ...body, id });
		logger.info(`Product updated: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Product updated successfully" };
	} catch (error) {
		logger.error(`Update product error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Remove a product
router.delete("/products/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		await productUseCases.remove.execute(id);
		logger.info(`Product removed: ${id}`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Product removed successfully" };
	} catch (error) {
		logger.error(`Remove product error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
