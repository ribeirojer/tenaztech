import { supabase } from "../services/supabaseService";

class ReviewRepository {
    static async create(orderId: string, reviewData: any) {
        const { data, error } = await supabase.from('order_reviews').insert({ ...reviewData, order_id: orderId });
        if (error) throw error;
        return data;
    }

    static async getByOrderId(orderId: string) {
        const { data, error } = await supabase.from('order_reviews').select('*').eq('order_id', orderId);
        if (error) throw error;
        return data;
    }
}

export { ReviewRepository };
