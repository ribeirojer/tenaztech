import type { Review } from "../../../domain/entities/Review.ts";
import type { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

type AddProductReviewUseCaseProps = {
	slug: string;
	name: string;
	email: string;
	rating: number;
	review: string;
};

export class AddProductReviewUseCase {
	constructor(private reviewRepository: ReviewRepository) {}

	async execute(input: AddProductReviewUseCaseProps): Promise<void> {
		const review: Review = {
			id: crypto.randomUUID(),
			productSlug: input.slug,
			name: input.name,
			email: input.email,
			rating: input.rating,
			review: input.review,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await this.reviewRepository.add(review);
	}
}
