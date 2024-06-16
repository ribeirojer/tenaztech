import { supabase } from "../config/supabase";

type Review = {
    customer_id: string,
    rating: number,
    comment: string,
}

class ProductReviewRepository {
	static async addReview(productId: string, review: Review) {
		const { data, error } = await supabase
			.from("product_reviews")
			.insert({ product_id: productId, ...review });
		if (error) throw error;
		return data;
	}
}

export { ProductReviewRepository };
