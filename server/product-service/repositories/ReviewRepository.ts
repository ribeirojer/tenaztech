import { supabase } from "../config/supabase.ts";
import { IReview } from "../interfaces/Review.ts"

export class ReviewRepository {
	async addReview(productId: string, reviewData: IReview) {
		const { data, error } = await supabase
			.from("reviews")
			.insert({ ...reviewData, product_id: productId })
			.single();
		if (error) throw error;
		return data;
	}

	async getReviews(productId: string) {
		const { data, error } = await supabase
			.from("reviews")
			.select("*")
			.eq("product_id", productId);
		if (error) throw error;
		return data;
	}

	async updateReview(productId: string, reviewId: string, reviewData: IReview) {
		const { data, error } = await supabase
			.from("reviews")
			.update(reviewData)
			.eq("id", reviewId)
			.eq("product_id", productId)
			.single();
		if (error) throw error;
		return data;
	}

	async deleteReview(productId: string, reviewId: string) {
		const { data, error } = await supabase
			.from("reviews")
			.delete()
			.eq("id", reviewId)
			.eq("product_id", productId)
			.single();
		if (error) throw error;
		return data;
	}
}
