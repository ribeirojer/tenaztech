import type { Context } from "../interfaces/ElysiaContext";
import { ProductReviewRepository } from "../repositories/ProductReviewRepository";

class ProductReviewController {
	static async addReview({ params, body, set }: Context) {
		const { productId } = params;
		try {
			const review = await ProductReviewRepository.addReview(productId, body);
			set.status = 201;
			return review;
		} catch (error) {
			set.status = 400;
			return { error };
		}
	}
}

export { ProductReviewController };
