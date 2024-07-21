import { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

export class RemoveProductReviewUseCase {
    constructor(private reviewRepository: ReviewRepository) {}

    async execute(reviewId: string): Promise<void> {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) {
            throw new Error("Review not found");
        }
        await this.reviewRepository.remove(reviewId);
    }
}
