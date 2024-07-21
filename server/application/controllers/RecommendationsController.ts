import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UseCaseFactory } from "../../infrastructure/factories/UseCaseFactory.ts";

const recommendationUseCases = UseCaseFactory.createRecommendationUseCases();

export class RecommendationsController {
	static async getRecommendations(ctx: RouterContext) {
		const recommendations = await recommendationUseCases.recommend.execute();
		ctx.response.body = recommendations;
	}
	static async getRelatedProducts(ctx: RouterContext) {
		const relatedProducts = await recommendationUseCases.listRelated.execute();
		ctx.response.body = relatedProducts;
	}
}
