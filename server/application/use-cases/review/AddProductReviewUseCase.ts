import { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";
import { Review } from "../../../domain/entities/Review.ts";

export class AddProductReviewUseCase {
	constructor(private reviewRepository: ReviewRepository) {}

	async execute(review: Review): Promise<void> {
		await this.reviewRepository.add(review);
	}
}
