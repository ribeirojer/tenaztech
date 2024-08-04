import type { Review } from "../../../domain/entities/Review.ts";
import type { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

export class GetProductReviewsUseCase {
	constructor(private reviewRepository: ReviewRepository) {}

	async execute(slug: string): Promise<Review[]> {
		const reviews: Review[] =
			await this.reviewRepository.getByProductSlug(slug);

		return reviews;
	}
}
