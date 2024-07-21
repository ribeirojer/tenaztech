import { createClient } from "https://deno.land/x/supabase/mod.ts";
import { Review } from "../../../domain/entities/Review.ts";
import { ReviewRepository } from "../../../domain/interfaces/ReviewRepository.ts";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseReviewRepository implements ReviewRepository {
	async add(review: Review): Promise<void> {
		const { error } = await supabase.from("reviews").insert([
			{
				id: review.id,
				productId: review.productId,
				customerId: review.customerId,
				rating: review.rating,
				comment: review.comment,
				createdAt: review.createdAt,
				updatedAt: review.updatedAt,
			},
		]);

		if (error) {
			throw new Error(`Failed to add review: ${error.message}`);
		}
	}

	async getByProductId(productId: string): Promise<Review[]> {
		const { data, error } = await supabase
			.from("reviews")
			.select("*")
			.eq("productId", productId);

		if (error) {
			throw new Error(`Failed to get reviews by product ID: ${error.message}`);
		}

		return data
			? data.map(
					(review) =>
						new Review(
							review.id,
							review.productId,
							review.customerId,
							review.rating,
							review.comment,
							new Date(review.createdAt),
							new Date(review.updatedAt),
						),
				)
			: [];
	}
}
