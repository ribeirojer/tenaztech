import type { Review } from "../../../domain/entities/Review.ts";
import type { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

export class ListProductReviewsUseCase {
	constructor(private reviewRepository: ReviewRepository) {}

	async execute(productId: string): Promise<Review[]> {
		return await this.reviewRepository.getByProductId(productId);
	}
}
