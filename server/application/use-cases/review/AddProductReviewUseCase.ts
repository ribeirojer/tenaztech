import type { Review } from "../../../domain/entities/Review.ts";
import type { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

export class AddProductReviewUseCase {
	constructor(private reviewRepository: ReviewRepository) {}

	async execute(review: Review): Promise<void> {
		await this.reviewRepository.add(review);
	}
}
