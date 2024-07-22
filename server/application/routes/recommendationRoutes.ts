import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { logger } from "../../infrastructure/config/logger.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const recommendationUseCases = UseCaseFactory.createRecommendationUseCases();
const router = new Router();

// Get recommendations
router.get("/recommendations", async (ctx) => {
	try {
		//const recommendations = await recommendationUseCases.recommend.execute();
		logger.info("Fetched recommendations");
		ctx.response.status = 200;
		//ctx.response.body = recommendations;
	} catch (error) {
		logger.error(`Get recommendations error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

// Get related products
router.get("/related-products", async (ctx) => {
	try {
		//const relatedProducts = await recommendationUseCases.listRelated.execute();
		logger.info("Fetched related products");
		ctx.response.status = 200;
		//ctx.response.body = relatedProducts;
	} catch (error) {
		logger.error(`Get related products error: ${error.message}`);
		ctx.response.status = 500;
		ctx.response.body = { error: error.message };
	}
});

export default router;
