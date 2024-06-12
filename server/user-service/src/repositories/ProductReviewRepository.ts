import { supabase } from "../config/supabase";

class ProductReviewRepository {
    static async addReview(productId: any, review: any) {
        const { data, error } = await supabase.from('product_reviews').insert({ product_id: productId, ...review });
        if (error) throw error;
        return data;
    }
}

export { ProductReviewRepository };
