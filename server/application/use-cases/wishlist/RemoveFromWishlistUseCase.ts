import { WishlistRepository } from "../../../domain/interfaces/WishlistRepository.ts";

export class RemoveFromWishlistUseCase {
    constructor(private wishlistRepository: WishlistRepository) {}

    async execute(wishlistId: string, productId: any): Promise<void> {
        const wishlist = await this.wishlistRepository.getById(wishlistId);
        if (!wishlist) {
            throw new Error("Wishlist not found");
        }
        wishlist.removeProduct(productId);
        await this.wishlistRepository.update(wishlist);
    }
}
