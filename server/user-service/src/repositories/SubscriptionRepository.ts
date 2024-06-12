import { supabase } from "../config/supabase";

class SubscriptionRepository {
    static async getAll() {
        const { data, error } = await supabase.from('subscriptions').select('*');
        if (error) throw error;
        return data;
    }

    static async create(subscription: any) {
        const { data, error } = await supabase.from('subscriptions').insert(subscription);
        if (error) throw error;
        return data;
    }

    static async delete(id: any) {
        const { error } = await supabase.from('subscriptions').delete().eq('id', id);
        if (error) throw error;
    }
}

export { SubscriptionRepository };
