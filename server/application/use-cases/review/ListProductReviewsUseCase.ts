import { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";
import { Review } from "../../../domain/entities/Review.ts";

export class ListProductReviewsUseCase {
    constructor(private reviewRepository: ReviewRepository) {}

    async execute(productId: string): Promise<Review[]> {
        return await this.reviewRepository.getByProductId(productId);
    }
}
