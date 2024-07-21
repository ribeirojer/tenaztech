import { Review } from "../entities/Review.ts";

export interface ReviewRepository {
    findById(reviewId: string): unknown;
    add(review: Review): Promise<void>;
    update(review: Review): Promise<void>;
    remove(reviewId: string): Promise<void>;
    getByProductId(productId: string): Promise<Review[]>;
    getByCustomerId(customerId: string): Promise<Review[]>;
}
