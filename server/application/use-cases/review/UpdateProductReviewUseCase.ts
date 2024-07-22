import type { Review } from "../../../domain/entities/Review.ts";
import type { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

export class UpdateProductReviewUseCase {
	constructor(private reviewRepository: ReviewRepository) {}

	async execute(review: Review): Promise<void> {
		const existingReview = await this.reviewRepository.getByCustomerId(
			review.id,
		);
		if (!existingReview) {
			throw new Error("Review not found");
		}
		await this.reviewRepository.update(review);
	}
}
