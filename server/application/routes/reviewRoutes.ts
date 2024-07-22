import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const reviewUseCases = UseCaseFactory.createReviewUseCases();
const router = new Router();

// Add a review
router.post("/reviews", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		await reviewUseCases.add.execute(body);
		logger.info(`Review added: ${JSON.stringify(body)}`);
		ctx.response.status = 201;
		ctx.response.body = { message: "Review added successfully" };
	} catch (error) {
		logger.error(`Add review error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// List all reviews
router.get("/reviews", async (ctx) => {
	try {
		//const reviews = await reviewUseCases.list.execute();
		logger.info("Fetched all reviews");
		ctx.response.status = 200;
		//ctx.response.body = reviews;
	} catch (error) {
		logger.error(`List reviews error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Get a specific review by ID
router.get("/reviews/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		/*const review = await reviewUseCases.getById.execute(id);
		if (review) {
			logger.info(`Fetched review with ID: ${id}`);
			ctx.response.status = 200;
			ctx.response.body = review;
		} else {
			ctx.response.status = 404;
			ctx.response.body = { error: "Review not found" };
		}*/
	} catch (error) {
		logger.error(`Get review by ID error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Update a review by ID
router.put("/reviews/:id", async (ctx) => {
	try {
		const body = await ctx.request.body().value;
		const { id } = ctx.params;
		await reviewUseCases.update.execute({ ...body, id });
		logger.info(`Review with ID: ${id} updated`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Review updated successfully" };
	} catch (error) {
		logger.error(`Update review error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Remove a review by ID
router.delete("/reviews/:id", async (ctx) => {
	try {
		const { id } = ctx.params;
		await reviewUseCases.remove.execute(id);
		logger.info(`Review with ID: ${id} removed`);
		ctx.response.status = 200;
		ctx.response.body = { message: "Review removed successfully" };
	} catch (error) {
		logger.error(`Remove review error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
