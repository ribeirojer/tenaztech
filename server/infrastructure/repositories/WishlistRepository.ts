import { createClient } from 'https://deno.land/x/supabase/mod.ts';
import { Wishlist } from "../../../domain/entities/Wishlist.ts";
import { WishlistRepository } from "../../../domain/interfaces/WishlistRepository.ts";

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseWishlistRepository implements WishlistRepository {
    async add(wishlist: Wishlist): Promise<void> {
        const { error } = await supabase
            .from('wishlists')
            .insert([
                {
                    id: wishlist.id,
                    customerId: wishlist.customerId,
                    items: wishlist.items,
                    createdAt: wishlist.createdAt,
                    updatedAt: wishlist.updatedAt,
                },
            ]);

        if (error) {
            throw new Error(`Failed to add wishlist: ${error.message}`);
        }
    }

    async getByCustomerId(customerId: string): Promise<Wishlist | null> {
        const { data, error } = await supabase
            .from('wishlists')
            .select('*')
            .eq('customerId', customerId)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Failed to get wishlist by customer ID: ${error.message}`);
        }

        return data ? new Wishlist(
            data.id,
            data.customerId,
            data.items,
            new Date(data.createdAt),
            new Date(data.updatedAt),
        ) : null;
    }
}
