import { Review } from "../../domain/entities/Review.ts";
import { ReviewRepository } from "../../domain/interfaces/ReviewRepository.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseReviewRepository implements ReviewRepository {
	async save(review: Review): Promise<void> {
		const { error } = await supabase.from("reviews").insert([
			{
				id: review.id,
				productId: review.productId,
				userId: review.customerId,
				rating: review.rating,
				comment: review.comment,
				createdAt: review.createdAt,
				updatedAt: review.updatedAt,
			},
		]);

		if (error) {
			throw new Error(`Failed to save review: ${error.message}`);
		}
	}

	async findById(reviewId: string): Promise<Review | null> {
		const { data, error } = await supabase
			.from("reviews")
			.select("*")
			.eq("id", reviewId)
			.single();

		if (error && error.code !== "PGRST116") {
			throw new Error(`Failed to find review by ID: ${error.message}`);
		}

		return data
			? new Review(
					data.id,
					data.productId,
					data.userId,
					data.rating,
					data.comment,
					new Date(data.createdAt),
					new Date(data.updatedAt),
				)
			: null;
	}

	async findByProductId(productId: string): Promise<Review[]> {
		const { data, error } = await supabase
			.from("reviews")
			.select("*")
			.eq("productId", productId);

		if (error) {
			throw new Error(`Failed to find reviews by product ID: ${error.message}`);
		}

		return data.map(
			(item: any) =>
				new Review(
					item.id,
					item.productId,
					item.userId,
					item.rating,
					item.comment,
					new Date(item.createdAt),
					new Date(item.updatedAt),
				),
		);
	}

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

	async update(review: Review): Promise<void> {
		const { error } = await supabase
			.from("reviews")
			.update({
				rating: review.rating,
				comment: review.comment,
				updatedAt: review.updatedAt,
			})
			.eq("id", review.id);

		if (error) {
			throw new Error(`Failed to update review: ${error.message}`);
		}
	}

	async remove(reviewId: string): Promise<void> {
		const { error } = await supabase
			.from("reviews")
			.delete()
			.eq("id", reviewId);

		if (error) {
			throw new Error(`Failed to remove review: ${error.message}`);
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

		return data.map(
			(review: any) =>
				new Review(
					review.id,
					review.productId,
					review.customerId,
					review.rating,
					review.comment,
					new Date(review.createdAt),
					new Date(review.updatedAt),
				),
		);
	}

	async getByCustomerId(customerId: string): Promise<Review[]> {
		const { data, error } = await supabase
			.from("reviews")
			.select("*")
			.eq("customerId", customerId);

		if (error) {
			throw new Error(`Failed to get reviews by customer ID: ${error.message}`);
		}

		return data.map(
			(review: any) =>
				new Review(
					review.id,
					review.productId,
					review.customerId,
					review.rating,
					review.comment,
					new Date(review.createdAt),
					new Date(review.updatedAt),
				),
		);
	}
}
