import { ProductReviewRepository } from "../repositories/ProductReviewRepository";

class ProductReviewController {
    static async addReview({ params, body, set }: any) {
        try {
            const review = await ProductReviewRepository.addReview(params.productId, body);
            set.status = 201;
            return review;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }
}

export { ProductReviewController }
