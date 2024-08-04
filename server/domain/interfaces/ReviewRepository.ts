import type { Review } from "../entities/Review.ts";

export interface ReviewRepository {
	findById(reviewId: string): unknown;
	add(review: Review): Promise<void>;
	update(review: Review): Promise<void>;
	remove(reviewId: string): Promise<void>;
	getByProductSlug(slug: string): Promise<any>;
	getByCustomerId(customerId: string): Promise<Review[]>;
}
