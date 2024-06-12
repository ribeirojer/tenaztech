import { supabase } from "../config/supabase";

class WishlistRepository {
    static async getAll() {
        const { data, error } = await supabase.from('wishlists').select('*');
        if (error) throw error;
        return data;
    }

    static async addItem(item: any) {
        const { data, error } = await supabase.from('wishlist_items').insert(item);
        if (error) throw error;
        return data;
    }

    static async removeItem(itemId: any) {
        const { error } = await supabase.from('wishlist_items').delete().eq('id', itemId);
        if (error) throw error;
    }

    static async updateItem(itemId: any, updates: any) {
        const { data, error } = await supabase.from('wishlist_items').update(updates).eq('id', itemId).single();
        if (error) throw error;
        return data;
    }
}

export { WishlistRepository };
