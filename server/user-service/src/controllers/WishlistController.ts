import { WishlistRepository } from "../repositories/WishlistRepository";

class WishlistController {
    static async getWishlist({ set }: any) {
        try {
            const wishlist = await WishlistRepository.getAll();
            set.status = 200;
            return wishlist;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async addItemToWishlist({ body, set }: any) {
        try {
            const item = await WishlistRepository.addItem(body);
            set.status = 201;
            return item;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async removeItemFromWishlist({ params, set }: any) {
        try {
            await WishlistRepository.removeItem(params.itemId);
            set.status = 204;
            return { message: "Item removed from wishlist successfully" };
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }

    static async updateItemInWishlist({ params, body, set }: any) {
        try {
            const item = await WishlistRepository.updateItem(params.itemId, body);
            set.status = 200;
            return item;
        } catch (error) {
            set.status = 400;
            return { error };
        }
    }
}

export { WishlistController };
