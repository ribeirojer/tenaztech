import { Review } from "../../domain/entities/Review.ts";
import type { ReviewRepository } from "../../domain/interfaces/ReviewRepository.ts";
import { supabase } from "../config/DatabaseConnection.ts";

export class SupabaseReviewRepository implements ReviewRepository {
	async save(review: Review): Promise<void> {
		const { error } = await supabase.from("reviews").insert([
			{
				id: review.id,
				product_slug: review.productSlug,
				name: review.name,
				email: review.email,
				rating: review.rating,
				review: review.review,
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
					data.productSlug,
					data.name,
					data.email,
					data.rating,
					data.review,
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
			(item) =>
				new Review(
					item.id,
					item.productSlug,
					item.name,
					item.email,
					item.rating,
					item.review,
					new Date(item.createdAt),
					new Date(item.updatedAt),
				),
		);
	}

	async add(review: Review): Promise<void> {
		const { error } = await supabase.from("reviews").insert([
			{
				id: review.id,
				product_slug: review.productSlug,
				name: review.name,
				email: review.email,
				rating: review.rating,
				review: review.review,
				created_at: review.createdAt,
				updated_at: review.updatedAt,
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
				review: review.review,
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

	async getByProductSlug(slug: string) {
		const { data, error } = await supabase
			.from("reviews")
			.select("name, rating, review")
			.eq("product_slug", slug);

		if (error) {
			throw new Error(`Failed to get reviews by product ID: ${error.message}`);
		}

		return data;
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
			(review) =>
				new Review(
					review.id,
					review.productSlug,
					review.name,
					review.email,
					review.rating,
					review.review,
					new Date(review.createdAt),
					new Date(review.updatedAt),
				),
		);
	}
}
